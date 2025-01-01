import { z } from 'zod';
import type { formSchema } from '../schemas/formSchema';

export type FormData = z.infer<typeof formSchema>;

export type BillingType = 'internal' | 'customer';

export interface WorkOrderItem {
  selected: boolean;
  billingType: BillingType;
}

export interface WorkOrderData {
  seller: string;
  internalVehicleNumber: string;
  vehicleLocation: string;
  workshopCompletionDate: string;
  customerDeliveryDate: string;
  customerDeliveryTime: string;
  deliveryInspection: WorkOrderItem;
  inspection: WorkOrderItem;
  oilChange: WorkOrderItem;
  vehicleInspection: WorkOrderItem;
  accessories: WorkOrderItem & { description?: string };
  miscellaneous: WorkOrderItem & { description?: string };
  painting: WorkOrderItem & { description?: string };
  dentRepair: WorkOrderItem & { description?: string };
  paintRepair: WorkOrderItem & { description?: string };
  preparation?: {
    selected: boolean;
    serviceId: string;
    billingType: BillingType;
  };
}