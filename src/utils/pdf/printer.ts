import { PDFError } from './errors';

export async function openPrintWindow(pdfBytes: Uint8Array): Promise<void> {
  let printWindow: Window | null = null;
  let objectUrl: string | null = null;

  try {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    objectUrl = URL.createObjectURL(blob);
    
    printWindow = window.open(objectUrl);
    if (!printWindow) {
      throw new PDFError('Druckfenster konnte nicht geöffnet werden. Bitte erlauben Sie Pop-ups für diese Seite.');
    }

    return new Promise((resolve, reject) => {
      if (!printWindow || !objectUrl) {
        reject(new PDFError('Druckfenster wurde unerwartet geschlossen'));
        return;
      }

      const cleanup = () => {
        if (printWindow) {
          printWindow.close();
        }
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };

      printWindow.onload = () => {
        try {
          printWindow?.print();
          printWindow.onafterprint = () => {
            cleanup();
            resolve();
          };
        } catch (error) {
          cleanup();
          reject(PDFError.fromError(error));
        }
      };

      printWindow.onerror = (error) => {
        cleanup();
        reject(PDFError.fromError(error));
      };

      // Fallback timeout in case print dialog is cancelled
      setTimeout(() => {
        cleanup();
        resolve();
      }, 60000); // 1 minute timeout
    });
  } catch (error) {
    if (printWindow) {
      printWindow.close();
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    throw PDFError.fromError(error);
  }
}