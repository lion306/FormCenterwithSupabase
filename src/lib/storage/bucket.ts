import { supabase } from '../supabase';
import { StorageError } from './errors';
import { STORAGE_CONFIG } from './config';

export async function initializeBucket() {
  try {
    // First try to get the bucket
    const { data: bucket, error: getBucketError } = await supabase
      .storage
      .getBucket(STORAGE_CONFIG.BUCKET_NAME);

    if (getBucketError) {
      // Try to create the bucket if it doesn't exist
      const { data: newBucket, error: createError } = await supabase
        .storage
        .createBucket(STORAGE_CONFIG.BUCKET_NAME, {
          public: false,
          fileSizeLimit: STORAGE_CONFIG.MAX_FILE_SIZE,
          allowedMimeTypes: STORAGE_CONFIG.ALLOWED_TYPES
        });

      if (createError) {
        throw new StorageError('Failed to initialize storage bucket', 'BUCKET_INIT_ERROR', createError);
      }

      return newBucket;
    }

    return bucket;
  } catch (error) {
    console.error('Bucket initialization error:', error);
    throw StorageError.fromError(error);
  }
}