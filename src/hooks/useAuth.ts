import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.email!.split('@')[0],
          name: session.user.user_metadata.full_name || session.user.email!.split('@')[0],
          role: 'user', // Default role until we get the actual role
          active: true,
          createdAt: session.user.created_at,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.email!.split('@')[0],
          name: session.user.user_metadata.full_name || session.user.email!.split('@')[0],
          role: 'user', // Default role until we get the actual role
          active: true,
          createdAt: session.user.created_at,
        });
      } else {
        clearUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, clearUser]);
}