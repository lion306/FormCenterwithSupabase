import { z } from 'zod';

export const companySchema = z.object({
  locationId: z.string().min(1, 'Bitte wählen Sie einen Standort aus'),
});