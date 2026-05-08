'use client'
import { use } from 'react'
import { StreamTabs } from '@/components/StreamTabs'
import { WorkItemCard } from '@/components/WorkItemCard'
import { CreateWorkItemForm } from '@/components/CreateWorkItemForm'
import { useWorkItems } from '@/lib/useWorkItems'
import { StreamId } from '@/types'

const STREAM_MAP: Record<string, StreamId> = { a: 'A', b: 'B', c: 'C' }

export default function StreamPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = use(params)
  const { streams, addItem, changeStatus, resetToMockData, hydrated } = useWorkItems()
  const streamId = STREAM_MAP[stream] as StreamId
  const current = streams.find(s => s.id === streamId)

  if (!hydrated) return <div className="text-center text-gray-400 py-16">Loading...</div>
  if (!current) return <div className="text-center text-red-400 py-16">Stream not found</div>

  return (
    <div>
      <StreamTabs streams={streams} />

      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{current.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{current.description}</p>
        </div>
        <button
          onClick={resetToMockData}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Reset to mock data
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {current.items.map(item => (
          <WorkItemCard key={item.id} item={item} onStatusChange={changeStatus} />
        ))}
        {current.items.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">No work items yet</p>
        )}
      </div>

      <CreateWorkItemForm streamId={streamId} onAdd={addItem} />
    </div>
  )
}
