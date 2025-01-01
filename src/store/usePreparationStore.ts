import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PreparationService, PreparationStore } from '../types/preparation';

export const usePreparationStore = create<PreparationStore>()(
  persist(
    (set, get) => ({
      services: [],
      
      addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: crypto.randomUUID() }],
      })),
      
      updateService: (id, updatedService) => set((state) => ({
        services: state.services.map((service) =>
          service.id === id ? { ...service, ...updatedService } : service
        ),
      })),
      
      deleteService: (id) => set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      })),
      
      getServicesByLocation: (locationId) => {
        return get().services.filter((service) => service.locationId === locationId);
      },
    }),
    {
      name: 'preparation-services',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { services: [] };
        }
        return persistedState;
      },
    }
  )
);