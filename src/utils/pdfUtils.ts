import { FormData } from '../types';
import { generatePDF, mergePDFs } from './pdf/generator';
import { openPrintWindow } from './pdf/printer';
import { PDFError } from './pdf/errors';
import { downloadFile } from '../lib/storage';

export { PDFError } from './pdf/errors';

export async function printPDF(formData: FormData, templateFileName: string): Promise<void> {
  try {
    const templateFile = await downloadFile(templateFileName);
    const pdfBytes = await generatePDF(formData, templateFile);
    await openPrintWindow(pdfBytes);
  } catch (error) {
    throw PDFError.fromError(error);
  }
}

export async function printMultiplePDFs(formData: FormData, templateFileNames: string[]): Promise<void> {
  if (!templateFileNames.length) {
    throw new PDFError('Keine PDF-Vorlagen zum Drucken ausgewählt');
  }

  try {
    const templateFiles = await Promise.all(
      templateFileNames.map(fileName => downloadFile(fileName))
    );
    
    const generatedPDFs = await Promise.all(
      templateFiles.map(template => generatePDF(formData, template))
    );

    const mergedPdfBytes = await mergePDFs(generatedPDFs);
    await openPrintWindow(mergedPdfBytes);
  } catch (error) {
    console.error('Print error:', error);
    throw PDFError.fromError(error);
  }
}