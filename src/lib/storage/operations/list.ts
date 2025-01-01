import { supabase } from '../../supabase';
import { StorageError } from '../errors';
import { BUCKET_CONFIG } from '../bucket/config';
import { initializeBucket } from '../bucket/initialize';

export async function listFiles(): Promise<string[]> {
  try {
    await initializeBucket();

    const { data, error } = await supabase.storage
      .from(BUCKET_CONFIG.id)
      .list();

    if (error) throw error;
    if (!data) return [];

    return data
      .filter(file => file.name.endsWith('.pdf'))
      .map(file => file.name);
  } catch (error) {
    console.error('List files error:', error);
    throw StorageError.fromError(error);
  }
}