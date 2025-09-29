'use client'

import { useEffect, useState } from 'react'
import { Car, Users, Eye, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface DashboardStats {
  totalCars: number
  availableCars: number
  soldCars: number
  totalUsers: number
  totalValue: number
  recentCars: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    availableCars: 0,
    soldCars: 0,
    totalUsers: 0,
    totalValue: 0,
    recentCars: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Fetch car statistics
      const { data: cars, error: carsError } = await supabase
        .from('cars')
        .select('*')

      if (carsError) throw carsError

      // Fetch user count
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id')

      if (profilesError) throw profilesError

      // Calculate stats
      const totalCars = cars?.length || 0
      const availableCars = cars?.filter(car => car.status === 'available').length || 0
      const soldCars = cars?.filter(car => car.status === 'sold').length || 0
      const totalValue = cars?.reduce((sum, car) => sum + (car.price || 0), 0) || 0
      const totalUsers = profiles?.length || 0

      // Get recent cars (last 5)
      const recentCars = cars?.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 5) || []

      setStats({
        totalCars,
        availableCars,
        soldCars,
        totalUsers,
        totalValue,
        recentCars
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded mb-4"></div>
              <div className="h-8 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage your luxury car marketplace</p>
        </div>
        <div className="text-white/50 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/30 rounded-full">
              <Car className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalCars}</div>
          <div className="text-blue-200 text-sm">Total Cars</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/30 rounded-full">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.availableCars}</div>
          <div className="text-green-200 text-sm">Available</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/30 rounded-full">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalUsers}</div>
          <div className="text-purple-200 text-sm">Total Users</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/30 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.totalValue)}</div>
          <div className="text-yellow-200 text-sm">Total Value</div>
        </div>
      </div>

      {/* Recent Cars */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Listings</h2>
          <a
            href="/admin/cars"
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
          >
            View All →
          </a>
        </div>

        <div className="space-y-4">
          {stats.recentCars.length > 0 ? (
            stats.recentCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{car.name}</h3>
                    <p className="text-white/70 text-sm">
                      {car.year} • {car.make} {car.model}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-medium">{formatCurrency(car.price)}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    car.status === 'available'
                      ? 'bg-green-500/20 text-green-400'
                      : car.status === 'sold'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {car.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">No cars listed yet</p>
              <a
                href="/admin/cars/new"
                className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Add First Car
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/cars/new"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors group"
        >
          <div className="p-3 bg-yellow-400/20 rounded-full w-fit mb-4 group-hover:bg-yellow-400/30 transition-colors">
            <Car className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Add New Car</h3>
          <p className="text-white/70 text-sm">List a new vehicle in your marketplace</p>
        </a>

        <a
          href="/admin/users"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors group"
        >
          <div className="p-3 bg-blue-400/20 rounded-full w-fit mb-4 group-hover:bg-blue-400/30 transition-colors">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Manage Users</h3>
          <p className="text-white/70 text-sm">View and manage user accounts</p>
        </a>

        <a
          href="/marketplace"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors group"
        >
          <div className="p-3 bg-green-400/20 rounded-full w-fit mb-4 group-hover:bg-green-400/30 transition-colors">
            <Eye className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">View Site</h3>
          <p className="text-white/70 text-sm">See how your site looks to visitors</p>
        </a>
      </div>
    </div>
  )
}