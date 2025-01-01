import { z } from 'zod';
import { companySchema } from './companySchema';
import { customerSchema } from './customerSchema';
import { vehicleSchema } from './vehicleSchema';
import { serviceSchema } from './serviceSchema';

export const formSchema = z.object({
  company: companySchema,
  customer: customerSchema,
  vehicle: vehicleSchema,
  service: serviceSchema,
});