import { create } from 'zustand';
import { FormData } from '../types';

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const initialState: FormData = {
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
};

export const useFormStore = create<FormStore>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () => set({ formData: initialState }),
}));