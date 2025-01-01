import React from 'react';
import { PreparationServiceManager } from './PreparationServiceManager';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Aufbereitungs-Services</h2>
        <PreparationServiceManager />
      </div>
    </div>
  );
};