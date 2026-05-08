'use client'
import { useState } from 'react'
import { StreamId } from '@/types'

interface Props {
  streamId: StreamId
  onAdd: (streamId: StreamId, title: string) => void
}

export function CreateWorkItemForm({ streamId, onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(streamId, title.trim())
    setTitle('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg py-3 hover:border-blue-300 hover:text-blue-500 transition-colors"
        aria-label="Add work item"
      >
        + Add work item
      </button>
    )
  }

  return (
    <form onSubmit={submit} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <input
        autoFocus
        type="text"
        aria-label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Work item title..."
        className="w-full text-sm rounded border border-blue-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 bg-white"
      />
      <div className="flex gap-2 mt-2">
        <button type="submit" className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create
        </button>
        <button type="button" onClick={() => { setTitle(''); setOpen(false); }} className="text-sm px-3 py-1.5 text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </form>
  )
}
