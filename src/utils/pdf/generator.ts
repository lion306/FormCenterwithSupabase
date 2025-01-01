import { PDFDocument } from 'pdf-lib';
import { FormData } from '../../types';
import { PDFError } from './errors';
import { fillCompanyFields, fillCustomerFields, fillServiceFields, fillVerificationDocuments, fillWorkOrders } from './formFields';

export async function generatePDF(formData: FormData, templateFile: File): Promise<Uint8Array> {
  if (!templateFile) {
    throw new PDFError('Keine PDF-Vorlage ausgewählt');
  }

  try {
    const templateBytes = await templateFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    fillCompanyFields(form, formData);
    fillCustomerFields(form, formData);
    fillVerificationDocuments(form, formData);
    fillWorkOrders(form, formData);
    fillServiceFields(form, formData);

    return await pdfDoc.save();
  } catch (error) {
    throw PDFError.fromError(error);
  }
}

export async function mergePDFs(pdfs: Uint8Array[]): Promise<Uint8Array> {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const pdfBytes of pdfs) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    return await mergedPdf.save();
  } catch (error) {
    throw PDFError.fromError(error);
  }
}