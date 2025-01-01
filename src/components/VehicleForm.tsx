import React from 'react';
import { VehicleBasicInfo } from './vehicle/VehicleBasicInfo';
import { VehicleEngineInfo } from './vehicle/VehicleEngineInfo';
import { VehicleDamageInfo } from './vehicle/VehicleDamageInfo';

export const VehicleForm: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Fahrzeugdaten</h2>
        <VehicleBasicInfo />
        <VehicleEngineInfo />
      </div>
      <VehicleDamageInfo />
    </div>
  );
};