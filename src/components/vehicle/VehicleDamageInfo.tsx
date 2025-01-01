import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormData } from '../../types';

export const VehicleDamageInfo: React.FC = () => {
  const { register, formState: { errors }, control } = useFormContext<FormData>();
  const customerType = useWatch({
    control,
    name: 'customer.type',
  });

  if (customerType === 'business') {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Vorvertragliche Informationen</h2>
      <div>
        <label htmlFor="damageInfo" className="block text-sm font-medium text-gray-700">
          Unfallschäden/Allgemeine Infos
        </label>
        <textarea
          id="damageInfo"
          rows={3}
          {...register('vehicle.damageInfo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.damageInfo && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.damageInfo.message}</p>
        )}
      </div>
    </div>
  );
};