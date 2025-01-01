import React from 'react';
import { DueDates } from './service/DueDates';
import { WorkOrder } from './service/WorkOrder';

export const ServiceForm: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Fälligkeiten</h2>
        <DueDates />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Arbeitsauftrag</h2>
        <WorkOrder />
      </div>
    </div>
  );
};