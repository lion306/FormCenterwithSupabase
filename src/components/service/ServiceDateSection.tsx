import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateField } from './DateField';
import { KilometerField } from './KilometerField';
import type { FormData } from '../../types';

interface ServiceDateSectionProps {
  title: string;
  dateFieldName: `service.${string}`;
  kmFieldName?: `service.${string}`;
  checkboxName: `service.${string}`;
  checkboxLabel: string;
  workOrderField?: keyof FormData['service']['workOrder'];
  showKmField?: boolean;
}

export const ServiceDateSection: React.FC<ServiceDateSectionProps> = ({
  title,
  dateFieldName,
  kmFieldName,
  checkboxName,
  checkboxLabel,
  workOrderField,
  showKmField = true,
}) => {
  const { register, watch, setValue } = useFormContext<FormData>();
  const isNew = watch(checkboxName);

  // Update work order when "Neu" is checked
  React.useEffect(() => {
    if (workOrderField && isNew) {
      setValue(`service.workOrder.${workOrderField}.selected`, true);
      setValue(`service.workOrder.${workOrderField}.billingType`, 'internal');
    }
  }, [isNew, workOrderField, setValue]);

  return (
    <div className="space-y-4">
      <div className={`grid grid-cols-1 ${showKmField ? 'md:grid-cols-2' : ''} gap-4`}>
        <DateField
          id={dateFieldName}
          label={`${title} (Datum/Tage)`}
          name={dateFieldName}
          disabled={isNew}
        />
        {showKmField && kmFieldName && (
          <KilometerField
            id={kmFieldName}
            label={`${title} (Kilometer)`}
            name={kmFieldName}
            disabled={isNew}
          />
        )}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={checkboxName}
          {...register(checkboxName)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={checkboxName} className="ml-2 block text-sm text-gray-700">
          {checkboxLabel}
        </label>
      </div>
    </div>
  );
};