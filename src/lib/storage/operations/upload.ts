import { supabase } from '../../supabase';
import { StorageError } from '../errors';
import { BUCKET_CONFIG } from '../bucket/config';
import { initializeBucket } from '../bucket/initialize';
import { validateFile } from '../validation';

export async function uploadFile(file: File): Promise<string> {
  try {
    validateFile(file);
    await initializeBucket();

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_CONFIG.id)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new StorageError('Failed to upload file', 'UPLOAD_ERROR', uploadError);
    }

    return fileName;
  } catch (error) {
    console.error('Upload error:', error);
    throw StorageError.fromError(error);
  }
}