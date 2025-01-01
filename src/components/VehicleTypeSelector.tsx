import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';

export const VehicleTypeSelector: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-semibold text-gray-900">Fahrzeugart</h2>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            {...register('vehicle.type')}
            value="new"
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Neuwagen</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            {...register('vehicle.type')}
            value="used"
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Gebrauchtwagen</span>
        </label>
      </div>
      {errors.vehicle?.type && (
        <p className="mt-1 text-sm text-red-600">{errors.vehicle.type.message}</p>
      )}
    </div>
  );
};