export interface CompanyLocation {
  id: string;
  name: string;
  street: string;
  zipCode: string;
  city: string;
  vatId?: string;
}

export const COMPANY_LOCATIONS: CompanyLocation[] = [
  {
    id: 'pfaffenhofen-1',
    name: 'Michael Stiglmayr GmbH',
    street: 'Joseph-Fraunhofer-Straße 46-48',
    zipCode: '85276',
    city: 'Pfaffenhofen',
    vatId: 'DE 811 302 607'
  },
  {
    id: 'pfaffenhofen-2',
    name: 'Michael Stiglmayr GmbH',
    street: 'Krankenhausstraße 1',
    zipCode: '85276',
    city: 'Pfaffenhofen',
    vatId: 'DE 811 302 607'
  },
  {
    id: 'schrobenhausen',
    name: 'Stiglmayr GmbH',
    street: 'Augsburger Straße 47',
    zipCode: '86529',
    city: 'Schrobenhausen',
    vatId: 'DE 814 761 720'
  },
  {
    id: 'hilpoltstein',
    name: 'Rothsee GmbH',
    street: 'Heidecker Straße 41',
    zipCode: '91161',
    city: 'Hilpoltstein',
    vatId: 'DE 163 467 574'
  }
];