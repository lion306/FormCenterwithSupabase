/*
  # Create PDF templates storage bucket
  
  1. New Storage
    - Creates pdf-templates bucket
    - Configures size limits and MIME types
    - Sets up proper security policies
  
  2. Security
    - Bucket is private by default
    - Only authenticated users can read
    - Only admins can upload/modify/delete
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pdf-templates',
  'pdf-templates',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for the storage bucket
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow authenticated users to read PDF templates" ON storage.objects;
    DROP POLICY IF EXISTS "Allow admins to upload PDF templates" ON storage.objects;
    DROP POLICY IF EXISTS "Allow admins to delete PDF templates" ON storage.objects;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Policy for reading PDFs (all authenticated users)
CREATE POLICY "Allow authenticated users to read PDF templates"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'pdf-templates');

-- Policy for uploading PDFs (admin/superadmin only)
CREATE POLICY "Allow admins to upload PDF templates"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pdf-templates' AND
  (SELECT role IN ('admin', 'superadmin') FROM auth.users WHERE id = auth.uid())
);

-- Policy for deleting PDFs (admin/superadmin only)
CREATE POLICY "Allow admins to delete PDF templates"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'pdf-templates' AND
  (SELECT role IN ('admin', 'superadmin') FROM auth.users WHERE id = auth.uid())
);