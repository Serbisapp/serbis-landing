import type { ProjectStatus } from '../types';

interface StatusTagProps {
  status: ProjectStatus;
}

export function StatusTag({ status }: StatusTagProps) {
  const statusClass = status === 'En producción' ? 'status-tag status-tag--live' : 'status-tag status-tag--build';

  return <span className={statusClass}>{status}</span>;
}
