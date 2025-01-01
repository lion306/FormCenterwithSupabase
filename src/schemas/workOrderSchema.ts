import { z } from 'zod';

const billingTypeSchema = z.enum(['internal', 'customer']);

const workOrderItemSchema = z.object({
  selected: z.boolean(),
  billingType: billingTypeSchema,
});

const workOrderItemWithDescriptionSchema = workOrderItemSchema.extend({
  description: z.string().optional(),
});

const preparationSchema = z.object({
  selected: z.boolean(),
  serviceId: z.string(),
  billingType: billingTypeSchema,
});

export const workOrderSchema = z.object({
  seller: z.string(),
  internalVehicleNumber: z.string(),
  vehicleLocation: z.string(),
  workshopCompletionDate: z.string(),
  customerDeliveryDate: z.string(),
  customerDeliveryTime: z.string(),
  deliveryInspection: workOrderItemSchema,
  inspection: workOrderItemSchema,
  oilChange: workOrderItemSchema,
  vehicleInspection: workOrderItemSchema,
  accessories: workOrderItemWithDescriptionSchema,
  miscellaneous: workOrderItemWithDescriptionSchema,
  painting: workOrderItemWithDescriptionSchema,
  dentRepair: workOrderItemWithDescriptionSchema,
  paintRepair: workOrderItemWithDescriptionSchema,
  preparation: preparationSchema.optional(),
});