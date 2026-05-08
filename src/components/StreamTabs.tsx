'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Stream } from '@/types'

const STREAM_COLORS: Record<string, string> = {
  A: 'data-[active=true]:border-blue-500 data-[active=true]:text-blue-700',
  B: 'data-[active=true]:border-purple-500 data-[active=true]:text-purple-700',
  C: 'data-[active=true]:border-cyan-500 data-[active=true]:text-cyan-700',
}

export function StreamTabs({ streams }: { streams: Stream[] }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-1 border-b border-gray-200 mb-6">
      {streams.map(stream => {
        const active = pathname === `/streams/${stream.id.toLowerCase()}`
        return (
          <Link
            key={stream.id}
            href={`/streams/${stream.id.toLowerCase()}`}
            role="tab"
            aria-selected={active}
            data-active={active}
            className={`px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-800 transition-colors -mb-px ${STREAM_COLORS[stream.id] || ''}`}
          >
            Stream {stream.id}
            <span className="ml-2 text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
              {stream.items.filter(i => !['closed','cancelled'].includes(i.status)).length}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
