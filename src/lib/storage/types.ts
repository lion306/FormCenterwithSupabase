export interface StorageError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface StorageResult<T> {
  data: T | null;
  error: StorageError | null;
}

export interface StorageFile {
  fileName: string;
  contentType: string;
  size: number;
}