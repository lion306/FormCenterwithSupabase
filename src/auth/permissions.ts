import { Permission, User } from '../types/auth';

export function checkUserPermission(user: User | null, permission: Permission): boolean {
  // Wenn der Benutzer angemeldet ist, hat er alle Berechtigungen
  return user !== null;
}