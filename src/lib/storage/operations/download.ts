import { supabase } from '../../supabase';
import { StorageError } from '../errors';
import { BUCKET_CONFIG } from '../bucket/config';
import { initializeBucket } from '../bucket/initialize';

export async function downloadFile(fileName: string): Promise<File> {
  try {
    await initializeBucket();

    const { data, error } = await supabase.storage
      .from(BUCKET_CONFIG.id)
      .download(fileName);

    if (error) {
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