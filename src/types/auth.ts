export type UserRole = 'user';
export type Permission = 'upload' | 'edit-tags' | 'delete' | 'manage-preparation';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkPermission: (permission: Permission) => boolean;
}