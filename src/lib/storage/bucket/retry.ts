export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  shouldRetry: (error: any) => boolean;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  shouldRetry: (error) => error?.message?.includes('not found'),
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let lastError: any;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!config.shouldRetry(error) || attempt === config.maxAttempts) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, config.delayMs));
    }
  }

  throw lastError;
}