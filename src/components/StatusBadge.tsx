import { Status } from '@/types'
import { statusLabel, statusColor } from '@/lib/lifecycle'

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColor(status)}`}>
      {statusLabel(status)}
    </span>
  )
}
