export interface BucketConfig {
  id: string;
  name: string;
  public: boolean;
  fileSizeLimit: number;
  allowedMimeTypes: string[];
}

export interface BucketOperationResult<T> {
  data: T | null;
  error: Error | null;
}