import { StorageError } from '../errors';
import { waitForBucket } from './waitForBucket';

let bucketInitialized = false;

export async function initializeBucket(): Promise<void> {
  if (bucketInitialized) return;

  try {
    await waitForBucket();
    bucketInitialized = true;
  } catch (error) {
    console.error('Bucket initialization error:', error);
    throw StorageError.fromError(error);
  }
}