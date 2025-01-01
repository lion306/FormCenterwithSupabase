import { supabase } from '../../supabase';
import { StorageError } from '../errors';
import { BUCKET_CONFIG } from '../bucket/config';
import { initializeBucket } from '../bucket/initialize';

export async function deleteFile(fileName: string): Promise<void> {
  try {
    await initializeBucket();

    const { error } = await supabase.storage
      .from(BUCKET_CONFIG.id)
      .remove([fileName]);

    if (error) {
      throw new StorageError('Failed to delete file', 'DELETE_ERROR', error);
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw StorageError.fromError(error);
  }
}