import { create } from 'zustand';
import type { AuthStore, User } from '../types/auth';
import { checkUserPermission } from '../auth/permissions';
import { supabase } from '../lib/supabase';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('No user returned from authentication');
    }

    set({
      user: {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.email!.split('@')[0],
        name: data.user.user_metadata.full_name || data.user.email!.split('@')[0],
        role: 'user',
        active: true,
        createdAt: data.user.created_at,
      },
    });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  checkPermission: (permission) => {
    const state = useAuthStore.getState();
    return checkUserPermission(state.user, permission);
  },
}));