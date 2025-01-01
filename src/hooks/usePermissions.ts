import { useAuthStore } from '../store/useAuthStore';
import type { Permission } from '../types/auth';

export function usePermissions() {
  const { checkPermission } = useAuthStore();
  
  return {
    checkPermission,
    hasUploadPermission: () => checkPermission('upload'),
    hasEditTagsPermission: () => checkPermission('edit-tags'),
    hasDeletePermission: () => checkPermission('delete'),
    hasManagePreparationPermission: () => checkPermission('manage-preparation'),
  };
}