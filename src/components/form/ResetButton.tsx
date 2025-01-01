import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useFormReset } from '../../hooks/useFormReset';

export const ResetButton: React.FC = () => {
  const { handleReset } = useFormReset();

  return (
    <button
      type="button"
      onClick={handleReset}
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <RotateCcw className="h-4 w-4 mr-2" />
      Formular zurücksetzen
    </button>
  );
};