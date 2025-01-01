import React from 'react';
import { ServiceDateSection } from './ServiceDateSection';

export const DueDates: React.FC = () => {
  return (
    <div className="space-y-6">
      <ServiceDateSection
        title="Service-Fälligkeit"
        dateFieldName="service.serviceDate"
        kmFieldName="service.serviceKm"
        checkboxName="service.isNewService"
        checkboxLabel="Neuer Service erforderlich"
        workOrderField="inspection"
      />

      <ServiceDateSection
        title="Ölwechsel-Fälligkeit"
        dateFieldName="service.oilChangeDate"
        kmFieldName="service.oilChangeKm"
        checkboxName="service.isNewOilChange"
        checkboxLabel="Neuer Ölwechsel erforderlich"
        workOrderField="oilChange"
      />

      <ServiceDateSection
        title="HU/AU-Fälligkeit"
        dateFieldName="service.inspectionDate"
        checkboxName="service.isNewInspection"
        checkboxLabel="Neue HU/AU erforderlich"
        workOrderField="vehicleInspection"
        showKmField={false}
      />
    </div>
  );
};