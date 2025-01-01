import { BucketConfig } from './types';

export const BUCKET_CONFIG: BucketConfig = {
  id: 'pdf-templates',
  name: 'pdf-templates',
  public: false,
  fileSizeLimit: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ['application/pdf']
};