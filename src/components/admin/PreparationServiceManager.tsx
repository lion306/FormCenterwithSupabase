import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { usePreparationStore } from '../../store/usePreparationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { COMPANY_LOCATIONS } from '../../types/company';

interface ServiceFormData {
  name: string;
  price: string;
  locationId: string;
}

interface PreparationServiceManagerProps {
  selectedLocation: string;
}

export const PreparationServiceManager: React.FC<PreparationServiceManagerProps> = ({
  selectedLocation
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: '',
    locationId: '',
  });
  const [error, setError] = useState<string | null>(null);

  const { services, addService, updateService, deleteService } = usePreparationStore();
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  const locationServices = services.filter(service => 
    !selectedLocation || service.locationId === selectedLocation
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.price || !formData.locationId) {
      setError('Bitte füllen Sie alle Felder aus');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Bitte geben Sie einen gültigen Preis ein');
      return;
    }

    try {
      if (editingId) {
        updateService(editingId, {
          name: formData.name,
          price,
          locationId: formData.locationId,
        });
        setEditingId(null);
      } else {
        addService({
          name: formData.name,
          price,
          locationId: formData.locationId,
        });
        setIsAdding(false);
      }
      setFormData({ name: '', price: '', locationId: '' });
    } catch (error) {
      setError('Fehler beim Speichern des Services');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Neuer Service
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label htmlFor="locationId" className="block text-sm font-medium text-gray-700">
                Standort
              </label>
              <select
                id="locationId"
                value={formData.locationId}
                onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Bitte wählen...</option>
                {COMPANY_LOCATIONS.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} - {location.city}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Bezeichnung
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Preis (€)
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ name: '', price: '', locationId: '' });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="h-4 w-4 inline mr-2" />
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                <Check className="h-4 w-4 inline mr-2" />
                {editingId ? 'Speichern' : 'Hinzufügen'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Standort
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bezeichnung
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preis
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locationServices.map((service) => {
              const location = COMPANY_LOCATIONS.find(loc => loc.id === service.locationId);
              return (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {location ? `${location.name} - ${location.city}` : 'Unbekannt'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(service.id);
                        setFormData({
                          name: service.name,
                          price: service.price.toString(),
                          locationId: service.locationId,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteService(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {locationServices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Keine Services verfügbar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};