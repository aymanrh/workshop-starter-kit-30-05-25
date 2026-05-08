import { WorkItem, Stream } from '@/types'

const makeItem = (id: string, stream: 'A' | 'B' | 'C', title: string, status: WorkItem['status'], notes = ''): WorkItem => ({
  id,
  title,
  notes,
  status,
  stream,
  createdAt: '2026-04-30T09:00:00Z',
  updatedAt: '2026-04-30T09:00:00Z',
})

export const INITIAL_STREAMS: Stream[] = [
  {
    id: 'A',
    name: 'Stream A — Client Work',
    description: 'Active client delivery work',
    items: [
      makeItem('a1', 'A', 'Deliver onboarding documentation', 'active', 'First draft due this week'),
      makeItem('a2', 'A', 'Weekly status report to stakeholder', 'waiting', 'Waiting on client sign-off'),
      makeItem('a3', 'A', 'Fix reported UI bug in dashboard', 'blocked', 'Blocked: need access to staging env'),
    ],
  },
  {
    id: 'B',
    name: 'Stream B — Product Work',
    description: 'Own product development',
    items: [
      makeItem('b1', 'B', 'Write landing page copy', 'active'),
      makeItem('b2', 'B', 'Set up analytics tracking', 'closed', 'Completed 2026-04-28'),
    ],
  },
  {
    id: 'C',
    name: 'Stream C — Outreach',
    description: 'Business development and outreach efforts',
    items: [
      makeItem('c1', 'C', 'LinkedIn post: AI-assisted testing', 'active'),
      makeItem('c2', 'C', 'Follow up with conference contact', 'waiting', 'Sent intro email 2026-04-25'),
      makeItem('c3', 'C', 'Proposal for consulting engagement', 'cancelled', 'Client went with another vendor'),
    ],
  },
]
