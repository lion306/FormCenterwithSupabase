import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { File, GripVertical, Lock, Tag, Trash2 } from 'lucide-react';
import type { PDFTemplate } from '../types/pdf';
import { useAuthStore } from '../store/useAuthStore';

interface PDFTemplateItemProps {
  template: PDFTemplate;
  isRelevant: boolean;
  onToggleSelection: (id: string) => void;
  onCategoryToggle: (id: string, category: string) => void;
  onDelete: (id: string) => void;
}

export const PDFTemplateItem: React.FC<PDFTemplateItemProps> = ({
  template,
  isRelevant,
  onToggleSelection,
  onCategoryToggle,
  onDelete,
}) => {
  const { checkPermission } = useAuthStore();
  const canManageTemplates = checkPermission('upload');
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: template.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`transition-colors duration-200 ${isRelevant ? '' : 'opacity-50'} ${
        isDragging ? 'bg-gray-50' : ''
      }`}
    >
      <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
        {canManageTemplates && (
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-gray-700 mr-2"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex-shrink-0">
            <File className="h-8 w-8 text-gray-400" />
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={template.id}
                checked={template.selected}
                onChange={() => onToggleSelection(template.id)}
                disabled={!isRelevant}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label
                htmlFor={template.id}
                className={`block text-sm font-medium ${
                  isRelevant ? 'text-gray-900' : 'text-gray-500'
                } truncate`}
              >
                {template.name}
              </label>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              {canManageTemplates ? (
                <>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'diesel')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('diesel')
                        ? 'bg-red-100 text-red-800 ring-1 ring-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Diesel
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'private')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('private')
                        ? 'bg-green-100 text-green-800 ring-1 ring-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Privat
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'business')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('business')
                        ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Firma
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'foreign')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('foreign')
                        ? 'bg-purple-100 text-purple-800 ring-1 ring-purple-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Ausland
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'new')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('new')
                        ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Neuwagen
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryToggle(template.id, 'used')}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.categories?.includes('used')
                        ? 'bg-orange-100 text-orange-800 ring-1 ring-orange-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                    }`}
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    Gebrauchtwagen
                  </button>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {template.categories?.map((category) => (
                    <span
                      key={category}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        {
                          diesel: 'bg-red-100 text-red-800',
                          private: 'bg-green-100 text-green-800',
                          business: 'bg-blue-100 text-blue-800',
                          foreign: 'bg-purple-100 text-purple-800',
                          new: 'bg-yellow-100 text-yellow-800',
                          used: 'bg-orange-100 text-orange-800',
                        }[category]
                      }`}
                    >
                      <Tag className="h-3 w-3 inline mr-1" />
                      {
                        {
                          diesel: 'Diesel',
                          private: 'Privat',
                          business: 'Firma',
                          foreign: 'Ausland',
                          new: 'Neuwagen',
                          used: 'Gebrauchtwagen',
                        }[category]
                      }
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          {canManageTemplates ? (
            <button
              type="button"
              onClick={() => onDelete(template.id)}
              className="inline-flex items-center p-1.5 border border-transparent rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
    </li>
  );
};