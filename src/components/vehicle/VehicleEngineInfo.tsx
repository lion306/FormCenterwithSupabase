import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormData } from '../../types';

export const VehicleEngineInfo: React.FC = () => {
  const { register, formState: { errors }, control } = useFormContext<FormData>();
  const isDiesel = useWatch({
    control,
    name: 'vehicle.isDiesel',
  });

  if (!isDiesel) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div>
        <label htmlFor="engine" className="block text-sm font-medium text-gray-700">
          Motor
        </label>
        <input
          type="text"
          id="engine"
          {...register('vehicle.engine')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.engine && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.engine.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Baujahr
        </label>
        <input
          type="number"
          id="year"
          {...register('vehicle.year', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.year && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.year.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="emissionStandard" className="block text-sm font-medium text-gray-700">
          Abgasnorm
        </label>
        <input
          type="text"
          id="emissionStandard"
          {...register('vehicle.emissionStandard')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.emissionStandard && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.emissionStandard.message}</p>
        )}
      </div>
    </div>
  );
};