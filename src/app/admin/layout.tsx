'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { Crown, Car, Users, BarChart3, Settings, Home, Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAdmin, loading, user } = useAuth()
  const pathname = usePathname()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-white/70">You don't have permission to access this area.</p>
        </div>
      </div>
    )
  }

  const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/cars', label: 'Car Listings', icon: Car },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="w-8 h-8 text-yellow-400" />
              <div>
                <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                <p className="text-white/50 text-sm">Management Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Home className="w-5 h-5" />
                <span>Back to Site</span>
              </Link>

              <Link
                href="/marketplace"
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Eye className="w-5 h-5" />
                <span>View Marketplace</span>
              </Link>

              <div className="border-t border-white/10 my-4"></div>

              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}