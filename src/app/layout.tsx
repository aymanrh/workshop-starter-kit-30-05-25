import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Freelancer Workstream Toolkit',
  description: 'Workshop scaffold — Phase 1: Foundation & Lifecycle',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-slate-900 text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg">Freelancer Workstream Toolkit</h1>
              <p className="text-xs text-slate-400 mt-0.5">Phase 1 — Foundation · Workshop Scaffold (no integrations)</p>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-1 rounded-full">
              Mock data — localStorage only
            </span>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
