import { Status } from '@/types'

// Exhaustive record — adding a new Status without updating this is a TypeScript error
const TERMINAL: Record<Status, boolean> = {
  active: false,
  waiting: false,
  blocked: false,
  closed: true,
  cancelled: true,
}

const ALL_STATUSES: Status[] = ['active', 'waiting', 'blocked', 'closed', 'cancelled']

// Any non-terminal status can transition to any other status
export function canTransition(from: Status, to: Status): boolean {
  if (from === to) return false
  if (TERMINAL[from]) return false
  return true
}

export function getValidTransitions(from: Status): Status[] {
  return ALL_STATUSES.filter(to => canTransition(from, to))
}

export function statusLabel(status: Status): string {
  const labels: Record<Status, string> = {
    active: 'Active',
    waiting: 'Waiting',
    blocked: 'Blocked',
    closed: 'Closed',
    cancelled: 'Cancelled',
  }
  return labels[status]
}

export function statusColor(status: Status): string {
  const colors: Record<Status, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    waiting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blocked: 'bg-red-100 text-red-800 border-red-200',
    closed: 'bg-gray-100 text-gray-600 border-gray-200',
    cancelled: 'bg-gray-50 text-gray-400 border-gray-100',
  }
  return colors[status]
}
