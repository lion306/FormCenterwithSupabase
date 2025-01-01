import React, { useRef, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { createPDFTemplate } from '../utils/fileUtils';
import { StorageError } from '../lib/storage';
import type { PDFTemplate } from '../types/pdf';

interface PDFUploaderProps {
  onUpload: (templates: PDFTemplate[]) => void;
  onError: (error: string) => void;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({ onUpload, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { checkPermission } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const canUpload = checkPermission('upload');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkPermission('upload')) {
      onError('Sie haben keine Berechtigung, PDF-Vorlagen hochzuladen.');
      return;
    }

    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const templates = await Promise.all(
        files.map(file => createPDFTemplate(file))
      );
      onUpload(templates);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof StorageError) {
        onError(StorageError.getUserMessage(error));
      } else {
        onError('Fehler beim Hochladen der Dateien. Bitte versuchen Sie es erneut.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  if (!canUpload) return null;

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <span className="animate-spin h-4 w-4 mr-2 border-2 border-gray-500 border-t-transparent rounded-full" />
            Wird hochgeladen...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            PDF Vorlagen hochladen
          </>
        )}
      </button>
    </>
  );
};