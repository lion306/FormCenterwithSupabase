import { useEffect, useState } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { StorageError } from '../lib/storage';

export function useTemplates() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { loadTemplates } = usePDFStore();

  useEffect(() => {
    const initializeTemplates = async () => {
      try {
        await loadTemplates();
      } catch (err) {
        if (err instanceof StorageError && err.code === 'BUCKET_NOT_FOUND') {
          // Retry once after delay if bucket not found
          setTimeout(async () => {
            try {
              await loadTemplates();
            } catch (retryErr) {
              setError(StorageError.getUserMessage(retryErr as StorageError));
            } finally {
              setIsLoading(false);
            }
          }, 2000);
          return;
        }
        setError(err instanceof StorageError ? StorageError.getUserMessage(err) : 'Failed to load templates');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTemplates();
  }, [loadTemplates]);

  return { error, isLoading };
}