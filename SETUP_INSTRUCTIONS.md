# Supabase Setup Instructions

## ✅ What's Already Done

1. **Database Schema** - All tables, indexes, and RLS policies created
2. **Environment Variables** - `.env.local` file created with your Supabase credentials
3. **Project Configuration** - Connected to active Supabase project

## ⚠️ Manual Step Required: Storage Buckets

You need to create 3 storage buckets in your Supabase dashboard:

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/ymdqhekrvylknkgawpot/storage/buckets

2. **Create Bucket 1: `business-images`**
   - Click "New bucket"
   - Name: `business-images`
   - Public bucket: ✅ Yes
   - File size limit: 5MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

3. **Create Bucket 2: `review-images`**
   - Click "New bucket"
   - Name: `review-images`
   - Public bucket: ✅ Yes
   - File size limit: 5MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

4. **Create Bucket 3: `avatars`**
   - Click "New bucket"
   - Name: `avatars`
   - Public bucket: ✅ Yes
   - File size limit: 2MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

5. **Set Up Storage Policies** (for each bucket):

   Go to Storage > Policies for each bucket and add:

   **Policy 1: Public Read**
   - Policy name: "Public read access"
   - Allowed operation: SELECT
   - Target roles: anon, authenticated
   - USING expression: `true`

   **Policy 2: Authenticated Upload**
   - Policy name: "Authenticated upload"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - WITH CHECK expression: `true`

   **Policy 3: Owner Delete**
   - Policy name: "Owner delete"
   - Allowed operation: DELETE
   - Target roles: authenticated
   - USING expression: `bucket_id = 'bucket-name' AND auth.uid()::text = (storage.foldername(name))[1]`

## 🚀 Your App is Ready!

Once you create the storage buckets, your app will be fully functional with:

- ✅ User authentication (sign up, sign in, profile management)
- ✅ Business management (create, view, update)
- ✅ Reviews and ratings
- ✅ Favorites system
- ✅ Search functionality
- ✅ Image uploads (after buckets are created)
- ✅ Real-time updates
- ✅ Analytics dashboard

## Testing

1. Start the dev server: `npm run dev`
2. Open http://localhost:5173
3. Try signing up a new user
4. Create a business
5. Add reviews
6. Test search functionality

## Project Details

- **Project ID:** ymdqhekrvylknkgawpot
- **Project URL:** https://ymdqhekrvylknkgawpot.supabase.co
- **Database:** PostgreSQL (all tables created)
- **Authentication:** Supabase Auth (ready to use)
- **Storage:** Needs 3 buckets created (see above)

Everything else is automated and ready! 🎉

