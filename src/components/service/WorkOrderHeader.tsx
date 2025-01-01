import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import type { FormData } from '../../types';

export const WorkOrderHeader: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext<FormData>();
  const workshopCompletionDate = useWatch({ name: 'service.workOrder.workshopCompletionDate' });
  const customerDeliveryDate = watch('service.workOrder.customerDeliveryDate');
  const customerDeliveryTime = watch('service.workOrder.customerDeliveryTime');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="seller" className="block text-sm font-medium text-gray-700">
            Verkäufer
          </label>
          <input
            type="text"
            id="seller"
            {...register('service.workOrder.seller')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="internalVehicleNumber" className="block text-sm font-medium text-gray-700">
            Interne FZG Nr.
          </label>
          <input
            type="text"
            id="internalVehicleNumber"
            {...register('service.workOrder.internalVehicleNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="vehicleLocation" className="block text-sm font-medium text-gray-700">
            Abstellort
          </label>
          <input
            type="text"
            id="vehicleLocation"
            {...register('service.workOrder.vehicleLocation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Workshop completion date - Separate section */}
      <div className="border-t pt-4">
        <div>
          <label htmlFor="workshopCompletionDate" className="block text-sm font-medium text-gray-700">
            Werkstatt Fertigstellung
          </label>
          <input
            type="date"
            id="workshopCompletionDate"
            {...register('service.workOrder.workshopCompletionDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Customer delivery date - Separate section */}
      <div className="border-t pt-4">
        <div>
          <label htmlFor="customerDeliveryDate" className="block text-sm font-medium text-gray-700">
            Auslieferungstermin Kunde
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              id="customerDeliveryDate"
              {...register('service.workOrder.customerDeliveryDate')}
              disabled={!workshopCompletionDate}
              min={workshopCompletionDate}
              className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                !workshopCompletionDate ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
              }`}
            />
            <input
              type="time"
              {...register('service.workOrder.customerDeliveryTime', {
                required: customerDeliveryDate ? 'Bitte Uhrzeit angeben' : false
              })}
              disabled={!workshopCompletionDate || !customerDeliveryDate}
              className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                !workshopCompletionDate || !customerDeliveryDate ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
              } ${customerDeliveryDate && !customerDeliveryTime ? 'border-red-300' : ''}`}
            />
          </div>
          {!workshopCompletionDate && (
            <div className="flex items-start mt-2">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Bitte zuerst den Werkstatt-Fertigstellungstermin planen
                </p>
              </div>
            </div>
          )}
          {customerDeliveryDate && !customerDeliveryTime && (
            <div className="flex items-start mt-2">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">
                  Bitte geben Sie eine Uhrzeit für den Auslieferungstermin an
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};