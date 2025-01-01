/*
  # Improve PDF templates storage configuration
  
  1. Changes
    - Sets bucket to private
    - Configures file size limit and allowed MIME types
    - Adds cache control settings
    - Adds update policy for admins
  
  2. Security
    - Ensures bucket is private
    - Adds update policy for admins
    - Maintains existing security policies
*/

-- Update bucket configuration with supported columns
UPDATE storage.buckets
SET 
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf']
WHERE id = 'pdf-templates';

-- Add update policy for admins
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow admins to update PDF templates" ON storage.objects;
  
  CREATE POLICY "Allow admins to update PDF templates"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'pdf-templates' AND
      (SELECT role IN ('admin', 'superadmin') FROM auth.users WHERE id = auth.uid())
    )
    WITH CHECK (
      bucket_id = 'pdf-templates' AND
      (SELECT role IN ('admin', 'superadmin') FROM auth.users WHERE id = auth.uid())
    );
END $$;

-- Add cache control column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'storage' 
    AND table_name = 'objects' 
    AND column_name = 'cache_control'
  ) THEN
    ALTER TABLE storage.objects 
    ADD COLUMN cache_control text DEFAULT 'max-age=3600';
  END IF;
END $$;