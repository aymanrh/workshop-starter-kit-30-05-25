export type Status = 'active' | 'waiting' | 'blocked' | 'closed' | 'cancelled'
export type StreamId = 'A' | 'B' | 'C'

export interface WorkItem {
  id: string
  title: string
  notes: string
  status: Status
  stream: StreamId
  createdAt: string
  updatedAt: string
}

export interface Stream {
  id: StreamId
  name: string
  description: string
  items: WorkItem[]
}
