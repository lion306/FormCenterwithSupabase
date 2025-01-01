import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { PreparationServiceManager } from '../admin/PreparationServiceManager';
import { COMPANY_LOCATIONS } from '../../types/company';

export const PreparationServiceSection: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Aufbereitungs-Services</h2>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Alle Standorte</option>
            {COMPANY_LOCATIONS.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.city}
              </option>
            ))}
          </select>
        </div>
        <PreparationServiceManager selectedLocation={selectedLocation} />
      </div>
    </div>
  );
};