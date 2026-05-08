'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Stream } from '@/types'

const ACTIVE_COLORS: Record<string, string> = {
  A: 'border-blue-500 text-blue-700',
  B: 'border-purple-500 text-purple-700',
  C: 'border-cyan-500 text-cyan-700',
}

export function StreamTabs({ streams }: { streams: Stream[] }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Streams" className="flex gap-1 border-b border-gray-200 mb-6">
      {streams.map(stream => {
        const active = pathname === `/streams/${stream.id.toLowerCase()}`
        return (
          <Link
            key={stream.id}
            href={`/streams/${stream.id.toLowerCase()}`}
            aria-current={active ? 'page' : undefined}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active
                ? (ACTIVE_COLORS[stream.id] || 'border-gray-800 text-gray-900')
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Stream {stream.id}
            <span className="ml-2 text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
              {stream.items.filter(i => !['closed','cancelled'].includes(i.status)).length}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
