import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WorkOrderHeader } from './WorkOrderHeader';
import { WorkOrderItem } from './WorkOrderItem';
import { PreparationSelect } from './PreparationSelect';
import type { FormData } from '../../types';

export const WorkOrder: React.FC = () => {
  const { register, watch, setValue } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <WorkOrderHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <WorkOrderItem
            id="deliveryInspection"
            label="Auslieferungsdurchsicht"
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <WorkOrderItem
            id="inspection"
            label="Inspektion"
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <WorkOrderItem
            id="oilChange"
            label="Öl wechsel"
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <WorkOrderItem
            id="vehicleInspection"
            label="HU/AU"
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <PreparationSelect />
        </div>

        <div className="space-y-4">
          <WorkOrderItem
            id="accessories"
            label="Zubehör"
            register={register}
            watch={watch}
            setValue={setValue}
            hasDescription
          />
          <WorkOrderItem
            id="miscellaneous"
            label="Sonstiges"
            register={register}
            watch={watch}
            setValue={setValue}
            hasDescription
          />
          <WorkOrderItem
            id="painting"
            label="Lackieren"
            register={register}
            watch={watch}
            setValue={setValue}
            hasDescription
          />
          <WorkOrderItem
            id="dentRepair"
            label="Dellen drücken"
            register={register}
            watch={watch}
            setValue={setValue}
            hasDescription
          />
          <WorkOrderItem
            id="paintRepair"
            label="Lackstellen ausbessern"
            register={register}
            watch={watch}
            setValue={setValue}
            hasDescription
          />
        </div>
      </div>
    </div>
  );
};