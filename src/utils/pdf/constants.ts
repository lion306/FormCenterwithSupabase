import { BillingType } from '../../types';

export const MANUFACTURER_MAPPING = {
  'Volkswagen': 'Volkswagen PKW',
  'Volkswagen Nfz': 'Volkswagen NFZ',
  'Audi': 'Audi AG',
  'Skoda': 'Škoda Auto a.s.',
  'Seat': 'SEAT S.A.',
  'Cupra': 'SEAT S.A.',
  'Sonstige': ''
} as const;

export const WORK_ORDER_MAPPING = {
  deliveryInspection: 'Auslieferungsdurchsicht',
  inspection: 'Inspektion',
  oilChange: 'Öl wechsel',
  vehicleInspection: 'HU/AU',
  accessories: 'Zubehör',
  miscellaneous: 'Sonstiges', // Added back
  painting: 'Lackieren',
  dentRepair: 'Dellen drücken',
  paintRepair: 'Lackstellen ausbessern',
  preparation: 'Aufbereitung'
} as const;

export const BILLING_TYPE_MAPPING: Record<BillingType, string> = {
  internal: 'Intern',
  customer: 'Kunde'
} as const;

export const MAX_WORK_ORDER_ITEMS = 10;