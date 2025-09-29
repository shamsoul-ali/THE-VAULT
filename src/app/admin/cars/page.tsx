'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Filter,
  Download,
  MoreHorizontal,
  Car,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { Car as CarType } from '@/lib/supabase/types'
import Link from 'next/link'

export default function CarsListPage() {
  const [cars, setCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedCars, setSelectedCars] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchCars()
  }, [sortBy, sortOrder])

  const fetchCars = async () => {
    try {
      setLoading(true)

      let query = supabase
        .from('cars')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' })

      const { data, error } = await query

      if (error) throw error

      setCars(data || [])
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year.toString().includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || car.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || car.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleSelectCar = (carId: string) => {
    setSelectedCars(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCars.length === filteredCars.length) {
      setSelectedCars([])
    } else {
      setSelectedCars(filteredCars.map(car => car.id))
    }
  }

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId)

      if (error) throw error

      setCars(prev => prev.filter(car => car.id !== carId))
      setSelectedCars(prev => prev.filter(id => id !== carId))
    } catch (error) {
      console.error('Error deleting car:', error)
      alert('Error deleting car. Please try again.')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedCars.length === 0) return

    if (!confirm(`Are you sure you want to delete ${selectedCars.length} cars? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .in('id', selectedCars)

      if (error) throw error

      setCars(prev => prev.filter(car => !selectedCars.includes(car.id)))
      setSelectedCars([])
    } catch (error) {
      console.error('Error deleting cars:', error)
      alert('Error deleting cars. Please try again.')
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'sold':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'coming_soon':
        return <Clock className="w-4 h-4 text-blue-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'sold':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'coming_soon':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'waiting_list':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'booked':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Car Listings</h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Car Listings</h1>
          <p className="text-white/70">Manage your luxury car inventory</p>
        </div>
        <Link href="/admin/cars/new">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search cars by name, make, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="coming_soon">Coming Soon</option>
            <option value="waiting_list">Waiting List</option>
            <option value="booked">Booked</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="hypercar">Hypercar</option>
            <option value="supercar">Supercar</option>
            <option value="luxury">Luxury</option>
            <option value="classic">Classic</option>
            <option value="electric">Electric</option>
            <option value="track">Track</option>
            <option value="sports">Sports</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-desc">Price High-Low</option>
            <option value="price-asc">Price Low-High</option>
            <option value="year-desc">Year Newest</option>
            <option value="year-asc">Year Oldest</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedCars.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-between">
            <span className="text-yellow-400 text-sm">
              {selectedCars.length} car(s) selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-400 border-red-400/50 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Cars Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedCars.length === filteredCars.length && filteredCars.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/30 bg-white/10"
                  />
                </th>
                <th className="text-left p-4 text-white font-medium">Car</th>
                <th className="text-left p-4 text-white font-medium">Price</th>
                <th className="text-left p-4 text-white font-medium">Status</th>
                <th className="text-left p-4 text-white font-medium">Category</th>
                <th className="text-left p-4 text-white font-medium">Added</th>
                <th className="text-right p-4 text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-12">
                    <Car className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70 mb-4">
                      {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                        ? 'No cars match your filters'
                        : 'No cars listed yet'}
                    </p>
                    <Link href="/admin/cars/new">
                      <Button className="bg-yellow-400 hover:bg-yellow-300 text-black">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Car
                      </Button>
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredCars.map((car) => (
                  <tr
                    key={car.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCars.includes(car.id)}
                        onChange={() => handleSelectCar(car.id)}
                        className="w-4 h-4 rounded border-white/30 bg-white/10"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <Car className="w-6 h-6 text-white/70" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{car.name}</div>
                          <div className="text-sm text-white/70">
                            {car.year} • {car.make} {car.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">
                        {formatCurrency(car.price)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(car.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(car.status)}`}>
                          {car.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium capitalize">
                        {car.category}
                      </span>
                    </td>
                    <td className="p-4 text-white/70 text-sm">
                      {new Date(car.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/marketplace`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/cars/${car.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCar(car.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{cars.length}</div>
          <div className="text-white/70 text-sm">Total Cars</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {cars.filter(c => c.status === 'available').length}
          </div>
          <div className="text-white/70 text-sm">Available</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">
            {cars.filter(c => c.status === 'sold').length}
          </div>
          <div className="text-white/70 text-sm">Sold</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {formatCurrency(cars.reduce((sum, car) => sum + car.price, 0))}
          </div>
          <div className="text-white/70 text-sm">Total Value</div>
        </div>
      </div>
    </div>
  )
}