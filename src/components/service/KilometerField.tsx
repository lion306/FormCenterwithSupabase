import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../../types';

interface KilometerFieldProps {
  id: string;
  label: string;
  disabled?: boolean;
  name: `service.${string}`; // Ensure name starts with 'service.'
}

export const KilometerField: React.FC<KilometerFieldProps> = ({ id, label, disabled, name }) => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  const fieldError = errors.service?.[name.replace('service.', '') as keyof typeof errors.service];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        {...register(name)}
        disabled={disabled}
        placeholder="Kilometer"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      />
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError.message}</p>
      )}
    </div>
  );
};