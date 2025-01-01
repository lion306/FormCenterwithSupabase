export class PDFError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'PDFError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PDFError);
    }
  }

  static fromError(error: unknown): PDFError {
    if (error instanceof PDFError) {
      return error;
    }
    return new PDFError(
      error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten',
      error
    );
  }
}