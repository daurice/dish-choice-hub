-- Create storage policies for gallery images in website-images bucket
-- Allow admins to upload images
CREATE POLICY "Admins can upload gallery images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'website-images' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND is_admin(auth.uid())
);

-- Allow admins to update gallery images
CREATE POLICY "Admins can update gallery images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'website-images' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND is_admin(auth.uid())
);

-- Allow admins to delete gallery images
CREATE POLICY "Admins can delete gallery images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'website-images' 
  AND (storage.foldername(name))[1] = 'gallery'
  AND is_admin(auth.uid())
);

-- Allow public to view gallery images
CREATE POLICY "Public can view gallery images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'website-images' 
  AND (storage.foldername(name))[1] = 'gallery'
);