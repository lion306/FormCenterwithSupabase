import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types/auth';

// Initial superadmin user
const INITIAL_SUPERADMIN: User = {
  id: 'superadmin-1',
  username: 'superadmin',
  name: 'Super Administrator',
  role: 'superadmin',
  email: 'admin@example.com',
  active: true,
  createdAt: new Date().toISOString(),
};

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<Omit<User, 'id' | 'role'>>) => void;
  deleteUser: (id: string) => void;
  setUserRole: (id: string, role: UserRole) => void;
  setUserActive: (id: string, active: boolean) => void;
  getUserById: (id: string) => User | undefined;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [INITIAL_SUPERADMIN],
      
      addUser: (userData) => set((state) => ({
        users: [...state.users, {
          ...userData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }],
      })),
      
      updateUser: (id, updates) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        ),
      })),
      
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      })),
      
      setUserRole: (id, role) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, role } : user
        ),
      })),
      
      setUserActive: (id, active) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, active } : user
        ),
      })),
      
      getUserById: (id) => get().users.find((user) => user.id === id),
    }),
    {
      name: 'user-store',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { users: [INITIAL_SUPERADMIN] };
        }
        return persistedState;
      },
      onRehydrateStorage: () => (state) => {
        if (state && !state.users.some(user => user.role === 'superadmin')) {
          state.users.push(INITIAL_SUPERADMIN);
        }
      },
    }
  )
);