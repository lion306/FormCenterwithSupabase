import { z } from 'zod';
import { workOrderSchema } from './workOrderSchema';

const datePattern = /^(0[1-9]|1[0-2])\.[0-9]{2}$|^\d+$/;
const numberPattern = /^\d*$/;

export const serviceSchema = z.object({
  serviceDate: z.string()
    .regex(datePattern, 'Format: MM.JJ oder Tage')
    .optional()
    .or(z.literal('')),
  serviceKm: z.string()
    .regex(numberPattern, 'Nur Zahlen erlaubt')
    .optional()
    .or(z.literal('')),
  isNewService: z.boolean(),
  
  oilChangeDate: z.string()
    .regex(datePattern, 'Format: MM.JJ oder Tage')
    .optional()
    .or(z.literal('')),
  oilChangeKm: z.string()
    .regex(numberPattern, 'Nur Zahlen erlaubt')
    .optional()
    .or(z.literal('')),
  isNewOilChange: z.boolean(),
  
  inspectionDate: z.string()
    .regex(datePattern, 'Format: MM.JJ oder Tage')
    .optional()
    .or(z.literal('')),
  inspectionKm: z.string()
    .regex(numberPattern, 'Nur Zahlen erlaubt')
    .optional()
    .or(z.literal('')),
  isNewInspection: z.boolean(),
  
  workOrder: workOrderSchema,
});