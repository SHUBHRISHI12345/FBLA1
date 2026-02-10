/**
 * ImageUpload Component
 * Component for uploading images
 */

import { useState, useRef } from 'react';
import { imageService } from '../services/imageService';
import { Button, LoadingSpinner } from './ui';
import { toast } from 'react-hot-toast';
import styles from './ImageUpload.module.css';

export interface ImageUploadProps {
  bucket: 'business-images' | 'review-images' | 'avatars';
  path: string;
  onUploadComplete: (url: string) => void;
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean;
}

/**
 * ImageUpload component
 */
export default function ImageUpload({
  bucket,
  path,
  onUploadComplete,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = 'image/*',
  multiple = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    const { url, error } = await imageService.uploadImage(file, bucket, path);

    if (error) {
      toast.error('Failed to upload image');
      setPreview(null);
    } else if (url) {
      toast.success('Image uploaded successfully!');
      onUploadComplete(url);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.imageUpload}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className={styles.fileInput}
        id={`image-upload-${path}`}
        disabled={isUploading}
      />
      <label htmlFor={`image-upload-${path}`} className={styles.uploadLabel}>
        {preview ? (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
            {isUploading && (
              <div className={styles.uploadingOverlay}>
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.uploadPlaceholder}>
            {isUploading ? (
              <LoadingSpinner size="lg" />
            ) : (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8L12 3L7 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Click to upload image</span>
                <span className={styles.hint}>
                  Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                </span>
              </>
            )}
          </div>
        )}
      </label>
    </div>
  );
}

