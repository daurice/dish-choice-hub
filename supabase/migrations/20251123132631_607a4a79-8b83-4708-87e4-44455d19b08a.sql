-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for service images
CREATE POLICY "Anyone can view service images"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'service-images' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'service-images' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'service-images' 
  AND is_admin(auth.uid())
);