/**
 * Image Service
 * Handles image uploads to Supabase Storage
 */

import { supabase } from '../lib/supabase';

/**
 * ImageService class
 * Provides image upload and management functionality
 */
class ImageService {
  /**
   * Uploads an image to Supabase Storage
   */
  async uploadImage(
    file: File,
    bucket: 'business-images' | 'review-images' | 'avatars',
    path: string
  ): Promise<{ url: string | null; error: Error | null }> {
    try {
      // Compress image if it's too large
      const processedFile = await this.processImage(file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${path}-${Date.now()}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, processedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { url: urlData.publicUrl, error: null };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { url: null, error: error as Error };
    }
  }

  /**
   * Processes image (compression, resizing)
   */
  private async processImage(file: File, maxSize: number = 1024 * 1024): Promise<File> {
    // If file is already small enough, return as-is
    if (file.size <= maxSize) {
      return file;
    }

    // Create image element
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          const ratio = Math.sqrt(maxSize / file.size);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(new File([blob], file.name, { type: file.type }));
                } else {
                  resolve(file);
                }
              },
              file.type,
              0.8
            );
          } else {
            resolve(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Deletes an image from Supabase Storage
   */
  async deleteImage(
    bucket: 'business-images' | 'review-images' | 'avatars',
    path: string
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { error: error as Error };
    }
  }
}

// Export singleton instance
export const imageService = new ImageService();

