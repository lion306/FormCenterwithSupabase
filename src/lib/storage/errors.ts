export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'StorageError';
  }

  static fromError(error: unknown): StorageError {
    if (error instanceof StorageError) {
      return error;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const message = String(error.message);
      
      // Handle specific error cases
      if (message.includes('Bucket not found')) {
        return new StorageError(
          'Storage system is initializing. Please try again in a moment.',
          'BUCKET_NOT_FOUND'
        );
      }
      if (message.includes('new row violates row-level security policy')) {
        return new StorageError(
          'Permission denied. Please log in again.',
          'PERMISSION_DENIED'
        );
      }
    }

    return new StorageError(
      'An unexpected storage error occurred. Please try again.',
      'UNKNOWN_ERROR',
      error
    );
  }

  static getUserMessage(error: StorageError): string {
    switch (error.code) {
      case 'BUCKET_NOT_FOUND':
        return 'Storage system is initializing. Please wait a moment and try again.';
      case 'PERMISSION_DENIED':
        return 'You do not have permission to perform this action. Please log in again.';
      case 'INVALID_FILE_TYPE':
        return 'Please select a PDF file.';
      case 'FILE_TOO_LARGE':
        return 'File is too large. Maximum size is 10MB.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}