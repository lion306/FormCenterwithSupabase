import { supabase } from '../../supabase';
import { BUCKET_CONFIG } from './config';

export async function checkBucketExists(): Promise<boolean> {
  const { data, error } = await supabase.storage.getBucket(BUCKET_CONFIG.id);
  if (error?.message?.includes('not found')) {
    return false;
  }
  if (error) {
    throw error;
  }
  return !!data;
}