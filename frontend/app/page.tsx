'use client'

import { useState } from 'react'
import DashboardView from '@/components/dashboard/DashboardView'

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#7f8c8d] font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <DashboardView
        loading={loading}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        setLoading={setLoading}
      />
    </div>
  )
}
