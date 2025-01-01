export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'superadmin' | 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'superadmin' | 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'superadmin' | 'admin' | 'user'
          created_at?: string
        }
      }
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: 'superadmin' | 'admin' | 'user'
      }
    }
    Enums: {
      app_role: 'superadmin' | 'admin' | 'user'
    }
  }
}