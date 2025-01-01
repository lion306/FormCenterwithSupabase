import { z } from 'zod';

const customerTypeSchema = z.enum(['private', 'business']);

const verificationDocumentsSchema = z.object({
  entryReceipt: z.boolean(),
  transferConfirmation: z.boolean(),
  destinationRegistration: z.boolean(),
  signedCMR: z.boolean(),
  taxationProof: z.boolean(),
  buyerRegistration: z.boolean(),
});

export const customerSchema = z.object({
  type: customerTypeSchema,
  isforeign: z.boolean(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  street: z.string().min(1, 'Straße ist erforderlich'),
  zipCode: z.string().min(1, 'PLZ ist erforderlich'),
  city: z.string().min(1, 'Stadt ist erforderlich'),
  country: z.string().optional(),
  vatId: z.string().optional(),
  contractNumber: z.string().optional(),
  verificationDocuments: verificationDocumentsSchema,
}).refine((data) => {
  if (data.type === 'private') {
    return data.firstName && data.lastName;
  } else {
    return data.companyName;
  }
}, {
  message: 'Bitte füllen Sie alle erforderlichen Felder aus',
  path: ['type'],
}).refine((data) => {
  if (data.isforeign) {
    return data.country;
  }
  return true;
}, {
  message: 'Bitte geben Sie das Land ein',
  path: ['country'],
}).refine((data) => {
  if (data.type === 'business' && data.isforeign) {
    return data.vatId && data.vatId.length > 0;
  }
  return true;
}, {
  message: 'USt-IdNr. ist für ausländische Firmenkunden erforderlich',
  path: ['vatId'],
}).refine((data) => {
  if (data.type === 'business' && data.isforeign) {
    return data.contractNumber && data.contractNumber.length > 0;
  }
  return true;
}, {
  message: 'Kaufvertrag Nr. ist für ausländische Firmenkunden erforderlich',
  path: ['contractNumber'],
});