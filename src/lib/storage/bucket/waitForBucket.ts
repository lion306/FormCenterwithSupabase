import { supabase } from '../../supabase';
import { BUCKET_CONFIG } from './config';
import { withRetry } from './retry';

export async function waitForBucket(): Promise<void> {
  const checkBucket = async () => {
    const { data, error } = await supabase.storage.getBucket(BUCKET_CONFIG.id);
    if (error) throw error;
    return data;
  };

  await withRetry(checkBucket, {
    maxAttempts: 5,
    delayMs: 2000,
    shouldRetry: (error) => error?.message?.includes('not found')
  });
}