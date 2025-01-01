import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormData } from '../types';

export const CustomerForm: React.FC = () => {
  const { register, formState: { errors }, control } = useFormContext<FormData>();
  const customerType = useWatch({
    control,
    name: 'customer.type',
  });
  const isforeign = useWatch({
    control,
    name: 'customer.isforeign',
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Kundendaten</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kundentyp
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('customer.type')}
                  value="private"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Privatkunde</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('customer.type')}
                  value="business"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Firmenkunde</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auslandsgeschäft
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('customer.isforeign')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Ausland</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customerType === 'private' ? (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Vorname
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('customer.firstName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.customer?.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.customer.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nachname
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('customer.lastName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.customer?.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.customer.lastName.message}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Firmenname
                </label>
                <input
                  type="text"
                  id="companyName"
                  {...register('customer.companyName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.customer?.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.customer.companyName.message}</p>
                )}
              </div>
              {isforeign && (
                <>
                  <div className="md:col-span-2">
                    <label htmlFor="vatId" className="block text-sm font-medium text-gray-700">
                      USt-IdNr.
                    </label>
                    <input
                      type="text"
                      id="vatId"
                      {...register('customer.vatId')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.customer?.vatId && (
                      <p className="mt-1 text-sm text-red-600">{errors.customer.vatId.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="contractNumber" className="block text-sm font-medium text-gray-700">
                      Kaufvertrag Nr.
                    </label>
                    <input
                      type="text"
                      id="contractNumber"
                      {...register('customer.contractNumber')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.customer?.contractNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.customer.contractNumber.message}</p>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          
          <div className="md:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Straße
            </label>
            <input
              type="text"
              id="street"
              {...register('customer.street')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.customer?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.customer.street.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Postleitzahl
            </label>
            <input
              type="text"
              id="zipCode"
              {...register('customer.zipCode')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.customer?.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.customer.zipCode.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Stadt
            </label>
            <input
              type="text"
              id="city"
              {...register('customer.city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.customer?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.customer.city.message}</p>
            )}
          </div>
          {isforeign && (
            <div className="md:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Land
              </label>
              <input
                type="text"
                id="country"
                {...register('customer.country')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.customer?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.customer.country.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};