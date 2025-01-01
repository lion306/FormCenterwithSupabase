import { supabase } from '../supabase';
import { StorageError } from './errors';
import { validateFile } from './validation';
import { STORAGE_CONFIG } from './config';
import { initializeBucket } from './bucket';

export async function uploadFile(file: File): Promise<string> {
  try {
    validateFile(file);
    await initializeBucket();

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new StorageError('Failed to upload file', 'UPLOAD_ERROR', uploadError);
    }

    return fileName;
  } catch (error) {
    console.error('Upload error:', error);
    throw StorageError.fromError(error);
  }
}

export async function downloadFile(fileName: string): Promise<File> {
  try {
    await initializeBucket();

    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .download(fileName);

    if (error) {
      console.error('Download error:', error);
      throw new StorageError('Failed to download file', 'DOWNLOAD_ERROR', error);
    }

    if (!data) {
      throw new StorageError('No data received', 'NO_DATA');
    }

    return new File([data], fileName, { type: 'application/pdf' });
  } catch (error) {
    console.error('Download error:', error);
    throw StorageError.fromError(error);
  }
}

export async function deleteFile(fileName: string): Promise<void> {
  try {
    await initializeBucket();

    const { error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      throw new StorageError('Failed to delete file', 'DELETE_ERROR', error);
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw StorageError.fromError(error);
  }
}