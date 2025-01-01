import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import type { User, UserRole } from '../../types/auth';

interface UserFormData {
  username: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const INITIAL_FORM_DATA: UserFormData = {
  username: '',
  name: '',
  email: '',
  password: '',
  role: 'user',
};

export const UserManagement: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, setUserRole, setUserActive } = useUserStore();
  const { user: currentUser } = useAuthStore();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  if (currentUser?.role !== 'superadmin') {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Berechtigung</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sie haben keine Berechtigung, die Benutzerverwaltung zu verwenden.
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.name || !formData.email || (!editingUser && !formData.password)) {
      setError('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    try {
      if (editingUser) {
        updateUser(editingUser.id, {
          username: formData.username,
          name: formData.name,
          email: formData.email,
        });
        setEditingUser(null);
      } else {
        addUser({
          username: formData.username,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          active: true,
        });
        setShowAddDialog(false);
      }
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      setError('Fehler beim Speichern des Benutzers');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Benutzerverwaltung</h2>
        <button
          type="button"
          onClick={() => setShowAddDialog(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Neuer Benutzer
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benutzer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rolle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => setUserRole(user.id, e.target.value as UserRole)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    disabled={user.role === 'superadmin'}
                  >
                    <option value="user">Benutzer</option>
                    <option value="admin">Administrator</option>
                    <option value="superadmin">Super Administrator</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setUserActive(user.id, !user.active)}
                    className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                      user.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                    disabled={user.role === 'superadmin'}
                  >
                    {user.active ? 'Aktiv' : 'Inaktiv'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {user.role !== 'superadmin' && (
                    <>
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setFormData({
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            password: '',
                            role: user.role,
                          });
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Dialog */}
      {(showAddDialog || editingUser) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingUser ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Benutzername
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {!editingUser && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Passwort
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Rolle
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="user">Benutzer</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </>
              )}
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDialog(false);
                    setEditingUser(null);
                    setFormData(INITIAL_FORM_DATA);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingUser ? 'Speichern' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};