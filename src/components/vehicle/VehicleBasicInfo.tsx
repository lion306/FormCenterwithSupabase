import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormData, VehicleBrand } from '../../types';

const VEHICLE_BRANDS: VehicleBrand[] = [
  'Volkswagen',
  'Volkswagen Nfz',
  'Audi',
  'Seat',
  'Cupra',
  'Skoda',
  'Sonstige'
];

export const VehicleBasicInfo: React.FC = () => {
  const { register, formState: { errors }, control } = useFormContext<FormData>();
  const selectedBrand = useWatch({
    control,
    name: 'vehicle.brand'
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Marke
        </label>
        <select
          id="brand"
          {...register('vehicle.brand')}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          {VEHICLE_BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {errors.vehicle?.brand && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.brand.message}</p>
        )}
      </div>

      {selectedBrand === 'Sonstige' && (
        <div>
          <label htmlFor="customBrand" className="block text-sm font-medium text-gray-700">
            Andere Marke
          </label>
          <input
            type="text"
            id="customBrand"
            {...register('vehicle.customBrand')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Bitte Marke eingeben"
          />
          {errors.vehicle?.customBrand && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.customBrand.message}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Fahrzeugmodell
        </label>
        <input
          type="text"
          id="model"
          {...register('vehicle.model')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.model && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.model.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
          VIN (Fahrgestellnummer)
        </label>
        <input
          type="text"
          id="vin"
          {...register('vehicle.vin')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.vehicle?.vin && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.vin.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dieselfahrzeug
        </label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('vehicle.isDiesel')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">Ja</span>
          </label>
        </div>
      </div>
    </div>
  );
};