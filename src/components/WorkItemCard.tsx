'use client'
import { WorkItem, Status, StreamId } from '@/types'
import { StatusBadge } from './StatusBadge'
import { getValidTransitions, statusLabel } from '@/lib/lifecycle'

interface Props {
  item: WorkItem
  onStatusChange: (streamId: StreamId, itemId: string, status: Status) => void
}

export function WorkItemCard({ item, onStatusChange }: Props) {
  const transitions = getValidTransitions(item.status)

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{item.title}</p>
          {item.notes && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.notes}</p>
          )}
        </div>
        <StatusBadge status={item.status} />
      </div>

      {transitions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {transitions.map(t => (
            <button
              key={t}
              aria-label={`Move to ${statusLabel(t)}`}
              onClick={() => onStatusChange(item.stream, item.id, t)}
              className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <span aria-hidden="true">→ </span>{statusLabel(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
