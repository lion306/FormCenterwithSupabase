import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { PDFTemplateItem } from './pdf/PDFTemplateItem';
import { PDFUploader } from './PDFUploader';
import { usePDFStore } from '../store/usePDFStore';
import { useTemplates } from '../hooks/useTemplates';
import type { FormData } from '../types';

export const PDFTemplateManager: React.FC = () => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { error: loadError, isLoading } = useTemplates();
  const { templates, addTemplate, removeTemplate, reorderTemplates, toggleTemplateSelection, updateTemplateCategories } = usePDFStore();
  const { control } = useFormContext<FormData>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading templates...</div>;
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = templates.findIndex((t) => t.id === active.id);
      const newIndex = templates.findIndex((t) => t.id === over.id);
      reorderTemplates(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">PDF Vorlagen</h2>
        <PDFUploader onUpload={addTemplate} onError={setUploadError} />
      </div>

      {(uploadError || loadError) && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{uploadError || loadError}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {templates.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={templates.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="divide-y divide-gray-200">
                {templates.map((template) => (
                  <PDFTemplateItem
                    key={template.id}
                    template={template}
                    isRelevant={true}
                    onToggleSelection={toggleTemplateSelection}
                    onCategoryToggle={updateTemplateCategories}
                    onDelete={removeTemplate}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Keine PDF Vorlagen verfügbar
          </div>
        )}
      </div>
    </div>
  );
};