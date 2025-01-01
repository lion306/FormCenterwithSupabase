export interface PreparationService {
  id: string;
  name: string;
  price: number;
  locationId: string;
}

export interface PreparationStore {
  services: PreparationService[];
  addService: (service: Omit<PreparationService, 'id'>) => void;
  updateService: (id: string, service: Partial<PreparationService>) => void;
  deleteService: (id: string) => void;
  getServicesByLocation: (locationId: string) => PreparationService[];
}