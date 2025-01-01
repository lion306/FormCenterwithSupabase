import React, { useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import type { FormData } from '../../types';

interface WorkOrderItemProps {
  id: string;
  label: string;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  hasDescription?: boolean;
}

export const WorkOrderItem: React.FC<WorkOrderItemProps> = ({
  id,
  label,
  register,
  watch,
  setValue,
  hasDescription = false,
}) => {
  const isSelected = watch(`service.workOrder.${id}.selected`);

  useEffect(() => {
    if (isSelected) {
      setValue(`service.workOrder.${id}.billingType`, 'internal');
    }
  }, [isSelected, setValue, id]);

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          {...register(`service.workOrder.${id}.selected`)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
      
      {isSelected && (
        <>
          <div className="ml-6 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register(`service.workOrder.${id}.billingType`)}
                value="internal"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Intern</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register(`service.workOrder.${id}.billingType`)}
                value="customer"
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Kunde</span>
            </label>
          </div>

          {hasDescription && (
            <div className="ml-6">
              <input
                type="text"
                {...register(`service.workOrder.${id}.description`)}
                placeholder="Wo oder was soll gemacht werden?"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};