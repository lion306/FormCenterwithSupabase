import React from 'react';
import { Permission } from '../../types/auth';
import { usePermissions } from '../../hooks/usePermissions';

interface ProtectedComponentProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { checkPermission } = usePermissions();
  return checkPermission(permission) ? <>{children}</> : <>{fallback}</>;
};