import { StorageError } from './errors';
import { STORAGE_CONFIG } from './config';

export function validateFile(file: File): void {
  if (!STORAGE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    throw new StorageError(
      'Invalid file type. Please select a PDF file.',
      'INVALID_FILE_TYPE'
    );
  }

  if (file.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
    throw new StorageError(
      'File size too large. Maximum size is 10MB.',
      'FILE_TOO_LARGE'
    );
  }
}