import { z } from 'zod';

const vehicleTypeSchema = z.enum(['new', 'used']);

const vehicleBrandSchema = z.enum([
  'Volkswagen',
  'Volkswagen Nfz',
  'Audi',
  'Seat',
  'Cupra',
  'Skoda',
  'Sonstige'
]);

export const vehicleSchema = z.object({
  type: vehicleTypeSchema,
  brand: vehicleBrandSchema,
  customBrand: z.string().optional(),
  model: z.string().min(1, 'Fahrzeugmodell ist erforderlich'),
  vin: z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN muss 17 Zeichen lang sein'),
  isDiesel: z.boolean(),
  damageInfo: z.string(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  engine: z.string(),
  emissionStandard: z.string(),
}).refine((data) => {
  if (data.isDiesel) {
    return data.engine.length > 0 && data.emissionStandard.length > 0;
  }
  return true;
}, {
  message: 'Bei Dieselfahrzeugen sind Motor und Abgasnorm erforderlich',
  path: ['engine'],
}).refine((data) => {
  if (data.brand === 'Sonstige') {
    return data.customBrand && data.customBrand.length > 0;
  }
  return true;
}, {
  message: 'Bitte geben Sie die Marke ein',
  path: ['customBrand'],
});