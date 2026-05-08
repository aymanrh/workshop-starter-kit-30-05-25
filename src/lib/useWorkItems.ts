'use client'
import { useState, useEffect } from 'react'
import { Stream, WorkItem, Status, StreamId } from '@/types'
import { INITIAL_STREAMS } from './mockData'
import { canTransition } from './lifecycle'

const STORAGE_KEY = 'workshop-streams-v1'

export function useWorkItems() {
  const [streams, setStreams] = useState<Stream[]>(INITIAL_STREAMS)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setStreams(JSON.parse(saved))
    } catch (err) {
      console.warn('[useWorkItems] failed to load saved data, using defaults', err)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(streams))
  }, [streams, hydrated])

  function addItem(streamId: StreamId, title: string) {
    const item: WorkItem = {
      id: `${streamId.toLowerCase()}-${crypto.randomUUID()}`,
      title,
      notes: '',
      status: 'active',
      stream: streamId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setStreams(prev => prev.map(s =>
      s.id === streamId ? { ...s, items: [...s.items, item] } : s
    ))
  }

  function changeStatus(streamId: StreamId, itemId: string, newStatus: Status) {
    setStreams(prev => prev.map(s =>
      s.id !== streamId ? s : {
        ...s,
        items: s.items.map(item =>
          item.id !== itemId ? item :
          canTransition(item.status, newStatus)
            ? { ...item, status: newStatus, updatedAt: new Date().toISOString() }
            : item
        )
      }
    ))
  }

  function resetToMockData() {
    setStreams(INITIAL_STREAMS)
  }

  return { streams, addItem, changeStatus, resetToMockData, hydrated }
}
