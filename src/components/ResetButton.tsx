import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';

export const ResetButton: React.FC = () => {
  const { reset } = useFormContext<FormData>();

  const handleReset = () => {
    if (window.confirm('Möchten Sie wirklich alle Eingaben zurücksetzen?')) {
      reset({
        company: {
          locationId: '',
        },
        customer: {
          type: 'private',
          isforeign: false,
          firstName: '',
          lastName: '',
          companyName: '',
          street: '',
          zipCode: '',
          city: '',
          country: '',
          vatId: '',
          contractNumber: '',
          verificationDocuments: {
            entryReceipt: false,
            transferConfirmation: false,
            destinationRegistration: false,
            signedCMR: false,
            taxationProof: false,
            buyerRegistration: false,
          },
        },
        vehicle: {
          type: 'used',
          brand: 'Volkswagen',
          model: '',
          vin: '',
          isDiesel: false,
          damageInfo: '',
          year: new Date().getFullYear(),
          engine: '',
          emissionStandard: '',
        },
        service: {
          serviceDate: '',
          serviceKm: '',
          isNewService: false,
          oilChangeDate: '',
          oilChangeKm: '',
          isNewOilChange: false,
          inspectionDate: '',
          isNewInspection: false,
          workOrder: {
            seller: '',
            internalVehicleNumber: '',
            vehicleLocation: '',
            workshopCompletionDate: '',
            customerDeliveryDate: '',
            customerDeliveryTime: '',
            deliveryInspection: { selected: false, billingType: 'internal' },
            inspection: { selected: false, billingType: 'internal' },
            oilChange: { selected: false, billingType: 'internal' },
            vehicleInspection: { selected: false, billingType: 'internal' },
            accessories: { selected: false, billingType: 'internal', description: '' },
            painting: { selected: false, billingType: 'internal', description: '' },
            dentRepair: { selected: false, billingType: 'internal', description: '' },
            paintRepair: { selected: false, billingType: 'internal', description: '' },
            preparation: { selected: false, serviceId: '', billingType: 'internal' },
          },
        },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <RotateCcw className="h-4 w-4 mr-2" />
      Formular zurücksetzen
    </button>
  );
};