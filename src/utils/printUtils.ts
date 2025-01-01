import { PDFError } from './pdfUtils';

export async function openPrintWindow(pdfBytes: Uint8Array): Promise<void> {
  try {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const printWindow = window.open(url);
    if (!printWindow) {
      throw new PDFError('Druckfenster konnte nicht geöffnet werden. Bitte erlauben Sie Pop-ups für diese Seite.');
    }

    return new Promise((resolve, reject) => {
      printWindow.onload = () => {
        try {
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
            URL.revokeObjectURL(url);
            resolve();
          };
        } catch (error) {
          printWindow.close();
          URL.revokeObjectURL(url);
          reject(new PDFError('Fehler beim Drucken des PDFs. Bitte versuchen Sie es erneut.', error));
        }
      };

      printWindow.onerror = (error) => {
        printWindow.close();
        URL.revokeObjectURL(url);
        reject(new PDFError('Fehler beim Laden des PDFs', error));
      };
    });
  } catch (error) {
    throw new PDFError('Fehler beim Öffnen des Druckfensters', error);
  }
}