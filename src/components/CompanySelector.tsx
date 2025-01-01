import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { COMPANY_LOCATIONS } from '../types/company';
import type { FormData } from '../types';

export const CompanySelector: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-semibold text-gray-900">Standort</h2>
      <div className="space-y-2">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Der ausgewählte Standort muss mit dem Standort auf dem Kaufvertrag übereinstimmen.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="companyLocation" className="block text-sm font-medium text-gray-700">
            Standort auswählen
          </label>
          <select
            id="companyLocation"
            {...register('company.locationId')}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm cursor-pointer"
          >
            <option value="">Bitte wählen Sie einen Standort</option>
            {COMPANY_LOCATIONS.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.street}, {location.zipCode} {location.city}
              </option>
            ))}
          </select>
          {errors.company?.locationId && (
            <p className="mt-1 text-sm text-red-600">{errors.company.locationId.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};