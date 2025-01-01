import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';
import { getDefaultFormValues } from '../utils/formUtils';

export const useFormReset = () => {
  const { reset } = useFormContext<FormData>();

  const handleReset = () => {
    if (window.confirm('Möchten Sie wirklich alle Eingaben zurücksetzen?')) {
      reset(getDefaultFormValues());
    }
  };

  return { handleReset };
};