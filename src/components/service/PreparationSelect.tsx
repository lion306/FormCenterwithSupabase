import React from 'react';
import { useFormContext } from 'react-hook-form';
import { usePreparationStore } from '../../store/usePreparationStore';
import type { FormData } from '../../types';

export const PreparationSelect: React.FC = () => {
  const { register, watch } = useFormContext<FormData>();
  const locationId = watch('company.locationId');
  const { getServicesByLocation } = usePreparationStore();
  
  const services = getServicesByLocation(locationId);
  const isSelected = watch('service.workOrder.preparation.selected');

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="preparation"
          {...register('service.workOrder.preparation.selected')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="preparation" className="ml-2 block text-sm text-gray-700">
          Aufbereitung
        </label>
      </div>
      
      {isSelected && (
        <div className="ml-6 space-y-4">
          <div>
            <select
              {...register('service.workOrder.preparation.serviceId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Bitte wählen...</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.price.toFixed(2)} €
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('service.workOrder.preparation.billingType')}
                value="internal"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Intern</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('service.workOrder.preparation.billingType')}
                value="customer"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Kunde</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};