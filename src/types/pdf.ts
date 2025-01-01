export type PDFCategory = 'private' | 'business' | 'foreign' | 'new' | 'used' | 'diesel';

export interface PDFTemplate {
  id: string;
  name: string;
  fileName: string;
  selected?: boolean;
  categories: PDFCategory[];
}

export interface PDFStore {
  templates: PDFTemplate[];
  selectedTemplateId: string | null;
  loadTemplates: () => Promise<void>;
  addTemplate: (template: PDFTemplate) => void;
  removeTemplate: (id: string) => Promise<void>;
  setSelectedTemplate: (id: string) => void;
  toggleTemplateSelection: (id: string) => void;
  updateTemplateCategories: (id: string, categories: PDFCategory[]) => void;
  reorderTemplates: (startIndex: number, endIndex: number) => void;
  getSelectedTemplates: () => PDFTemplate[];
  getVisibleTemplates: (customerType: 'private' | 'business', isforeign: boolean, vehicleType: 'new' | 'used', isDiesel: boolean) => PDFTemplate[];
}