export const STORAGE_CONFIG = {
  BUCKET_NAME: 'pdf-templates',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf'],
} as const;