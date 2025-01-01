import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PDFStore, PDFTemplate } from '../types/pdf';
import { downloadFile, deleteFile, listFiles } from '../lib/storage';

export const usePDFStore = create<PDFStore>()(
  persist(
    (set, get) => ({
      templates: [],
      selectedTemplateId: null,
      
      loadTemplates: async () => {
        try {
          const fileNames = await listFiles();
          const templates = fileNames.map(fileName => ({
            id: fileName,
            name: fileName.split('.').slice(0, -1).join('.'),
            fileName,
            categories: [],
            selected: false
          }));
          set({ templates });
        } catch (error) {
          console.error('Failed to load templates:', error);
          throw error;
        }
      },

      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),
      
      removeTemplate: async (id) => {
        const template = get().templates.find(t => t.id === id);
        if (template) {
          try {
            await deleteFile(template.fileName);
            set((state) => ({
              templates: state.templates.filter((t) => t.id !== id),
              selectedTemplateId: state.selectedTemplateId === id ? null : state.selectedTemplateId,
            }));
          } catch (error) {
            console.error('Failed to delete template:', error);
            throw error;
          }
        }
      },

      setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
      
      toggleTemplateSelection: (id) => 
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, selected: !t.selected } : t
          ),
        })),

      updateTemplateCategories: (id, categories) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, categories } : t
          ),
        })),

      reorderTemplates: (startIndex, endIndex) =>
        set((state) => {
          const newTemplates = [...state.templates];
          const [removed] = newTemplates.splice(startIndex, 1);
          newTemplates.splice(endIndex, 0, removed);
          return { templates: newTemplates };
        }),

      getSelectedTemplates: () => get().templates.filter((t) => t.selected),

      getVisibleTemplates: (customerType, isforeign, vehicleType, isDiesel) =>
        get().templates.filter((template) => {
          const hasRequiredCategories = [];
          
          if (customerType === 'private') {
            hasRequiredCategories.push(template.categories.includes('private'));
          } else {
            hasRequiredCategories.push(template.categories.includes('business'));
          }
          
          if (customerType === 'business' && isforeign) {
            hasRequiredCategories.push(template.categories.includes('foreign'));
          }
          
          if (vehicleType === 'new') {
            hasRequiredCategories.push(template.categories.includes('new'));
          } else {
            hasRequiredCategories.push(template.categories.includes('used'));
          }
          
          if (isDiesel) {
            hasRequiredCategories.push(template.categories.includes('diesel'));
          }
          
          return hasRequiredCategories.every(Boolean) || template.categories.length === 0;
        }),
    }),
    {
      name: 'pdf-templates',
      version: 1,
    }
  )
);