import { PDFTemplate } from '../types/pdf';
import { uploadFile, StorageError } from '../lib/storage';

export async function createPDFTemplate(file: File): Promise<PDFTemplate> {
  try {
    const fileName = await uploadFile(file);
    
    return {
      id: crypto.randomUUID(),
      name: file.name,
      fileName,
      selected: false,
      categories: [],
    };
  } catch (error) {
    console.error('Storage error:', error);
    if (error instanceof StorageError) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
    throw error;
  }
}