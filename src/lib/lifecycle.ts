import { Status } from '@/types'

// Terminal states cannot transition out
const TERMINAL: Status[] = ['closed', 'cancelled']

// All valid transitions — any non-terminal can reach any other status
export function canTransition(from: Status, to: Status): boolean {
  if (from === to) return false
  if (TERMINAL.includes(from)) return false
  return true
}

export function getValidTransitions(from: Status): Status[] {
  const all: Status[] = ['active', 'waiting', 'blocked', 'closed', 'cancelled']
  return all.filter(to => canTransition(from, to))
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
