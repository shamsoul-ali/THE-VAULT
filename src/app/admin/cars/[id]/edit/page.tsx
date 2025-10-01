'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  Car,
  Trash2,
  Info,
  Settings,
  FileText,
  Eye,
  Play
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/lib/hooks/useAuth'
import { Car as CarType } from '@/lib/supabase/types'
import Link from 'next/link'

interface CarFormData {
  name: string
  make: string
  model: string
  year: number
  price: number
  price_currency: string
  show_price: boolean
  status: string
  category: string
  location: string
  mileage: string
  engine: string
  horsepower: string
  torque: string
  transmission: string
  drivetrain: string
  acceleration: string
  top_speed: string
  fuel_type: string
  fuel_economy: string
  length: string
  width: string
  height: string
  weight: string
  wheelbase: string
  exterior_color: string
  interior_color: string
  roof_type: string
  description: string
  condition_report: string
  service_history: string
  badge: string
  tags: string
  is_exclusive: boolean
  is_featured: boolean
  is_verified: boolean
  previous_owners: number
  ownership_history: string
  registration_documents: boolean
  meta_title: string
  meta_description: string
}

export default function EditCarPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const carId = params.id as string
  const successMessage = searchParams.get('success')

  const [car, setCar] = useState<CarType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    price_currency: 'USD',
    show_price: false,
    status: 'available',
    category: 'luxury',
    location: '',
    mileage: '',
    engine: '',
    horsepower: '',
    torque: '',
    transmission: '',
    drivetrain: '',
    acceleration: '',
    top_speed: '',
    fuel_type: '',
    fuel_economy: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    wheelbase: '',
    exterior_color: '',
    interior_color: '',
    roof_type: '',
    description: '',
    condition_report: '',
    service_history: '',
    badge: '',
    tags: '',
    is_exclusive: false,
    is_featured: false,
    is_verified: false,
    previous_owners: 0,
    ownership_history: '',
    registration_documents: false,
    meta_title: '',
    meta_description: ''
  })

  useEffect(() => {
    if (successMessage === 'created') {
      setSuccess('Car created successfully!')
      // Clear the success param from URL
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete('success')
      router.replace(`/admin/cars/${carId}/edit?${newParams.toString()}`)
    }
  }, [successMessage, carId, router, searchParams])

  useEffect(() => {
    if (carId) {
      fetchCar()
    }
  }, [carId])

  const fetchCar = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single()

      if (error) throw error

      setCar(data)
      setFormData({
        name: data.name || '',
        make: data.make || '',
        model: data.model || '',
        year: data.year || new Date().getFullYear(),
        price: data.price || 0,
        price_currency: data.price_currency || 'USD',
        show_price: data.show_price || false,
        status: data.status || 'available',
        category: data.category || 'luxury',
        location: data.location || '',
        mileage: data.mileage || '',
        engine: data.engine || '',
        horsepower: data.horsepower || '',
        torque: data.torque || '',
        transmission: data.transmission || '',
        drivetrain: data.drivetrain || '',
        acceleration: data.acceleration || '',
        top_speed: data.top_speed || '',
        fuel_type: data.fuel_type || '',
        fuel_economy: data.fuel_economy || '',
        length: data.length || '',
        width: data.width || '',
        height: data.height || '',
        weight: data.weight || '',
        wheelbase: data.wheelbase || '',
        exterior_color: data.exterior_color || '',
        interior_color: data.interior_color || '',
        roof_type: data.roof_type || '',
        description: data.description || '',
        condition_report: data.condition_report || '',
        service_history: data.service_history || '',
        badge: data.badge || '',
        tags: data.tags ? data.tags.join(', ') : '',
        is_exclusive: data.is_exclusive || false,
        is_featured: data.is_featured || false,
        is_verified: data.is_verified || false,
        previous_owners: data.previous_owners || 0,
        ownership_history: data.ownership_history || '',
        registration_documents: data.registration_documents || false,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || ''
      })

    } catch (err: any) {
      setError(err.message || 'Error loading car')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!formData.name || !formData.make || !formData.model || !formData.price) {
        throw new Error('Please fill in all required fields (Name, Make, Model, Price)')
      }

      const { features, ...carFormData } = formData
      const carData = {
        ...carFormData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        slug: generateSlug(formData.name),
        updated_by: user?.id
      }

      const { error } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', carId)

      if (error) throw error

      // Save features separately
      if (features) {
        const featuresArray = features.split('\n').filter(f => f.trim())
        await fetch(`/api/cars/${carId}/features`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features: featuresArray })
        })
      }

      setSuccess('Car updated successfully!')

      // Refresh the car data
      await fetchCar()

    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the car')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId)

      if (error) throw error

      router.push('/admin/cars?deleted=true')

    } catch (err: any) {
      setError(err.message || 'Error deleting car')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/10 rounded animate-pulse"></div>
          <div>
            <div className="h-6 w-48 bg-white/10 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <div className="h-6 bg-white/10 rounded mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(j => (
                <div key={j} className="space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-10 bg-white/10 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error && !car) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Error Loading Car</h2>
        <p className="text-white/70 mb-6">{error}</p>
        <Link href="/admin/cars">
          <Button>Back to Cars</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/cars">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cars
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Car</h1>
            <p className="text-white/70">{car?.name}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-red-400 border-red-400/50 hover:bg-red-400/10"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Car
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-400/80 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Success</p>
              <p className="text-green-400/80 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <Label htmlFor="name" className="text-white font-medium">
                Car Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="make" className="text-white font-medium">
                Make *
              </Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="model" className="text-white font-medium">
                Model *
              </Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-white font-medium">
                Year Manufactured *
              </Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2030"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                className="bg-white/10 border-white/20 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-white font-medium">
                Price (USD) *
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                className="bg-white/10 border-white/20 text-white mt-2"
                required
              />
              {formData.price > 0 && (
                <p className="text-gold-medium text-sm mt-2">
                  = RM {(formData.price * 4).toLocaleString()} (USD × 4)
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-3 mt-2">
                <input
                  type="checkbox"
                  id="show_price"
                  checked={formData.show_price}
                  onChange={(e) => handleInputChange('show_price', e.target.checked)}
                  className="w-4 h-4 text-gold-medium bg-white/10 border-white/20 rounded focus:ring-gold-medium focus:ring-2"
                />
                <Label htmlFor="show_price" className="text-white font-medium cursor-pointer">
                  Show price publicly
                </Label>
              </div>
              <p className="text-white/60 text-xs mt-1 ml-7">
                When unchecked, price will show as "Contact for Price"
              </p>
            </div>

            <div>
              <Label htmlFor="status" className="text-white font-medium">
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="waiting_list">Waiting List</option>
                <option value="booked">Booked</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <div>
              <Label htmlFor="category" className="text-white font-medium">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="hypercar">Hypercar</option>
                <option value="supercar">Supercar</option>
                <option value="luxury">Luxury</option>
                <option value="classic">Classic</option>
                <option value="electric">Electric</option>
                <option value="track">Track</option>
                <option value="sports">Sports</option>
              </select>
            </div>


            <div>
              <Label htmlFor="mileage" className="text-white font-medium">
                Mileage
              </Label>
              <Input
                id="mileage"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>
          </div>
        </div>

        {/* Engine & Performance */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Settings className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Engine & Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="engine" className="text-white font-medium">
                Engine
              </Label>
              <Input
                id="engine"
                value={formData.engine}
                onChange={(e) => handleInputChange('engine', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="horsepower" className="text-white font-medium">
                Horsepower
              </Label>
              <Input
                id="horsepower"
                value={formData.horsepower}
                onChange={(e) => handleInputChange('horsepower', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="acceleration" className="text-white font-medium">
                0-60mph
              </Label>
              <Input
                id="acceleration"
                value={formData.acceleration}
                onChange={(e) => handleInputChange('acceleration', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="top_speed" className="text-white font-medium">
                Top Speed
              </Label>
              <Input
                id="top_speed"
                value={formData.top_speed}
                onChange={(e) => handleInputChange('top_speed', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="transmission" className="text-white font-medium">
                Transmission
              </Label>
              <Input
                id="transmission"
                value={formData.transmission}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="fuel_type" className="text-white font-medium">
                Fuel Type
              </Label>
              <Input
                id="fuel_type"
                value={formData.fuel_type}
                onChange={(e) => handleInputChange('fuel_type', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Description</h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="text-white font-medium">
                Main Description
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="badge" className="text-white font-medium">
                  Badge
                </Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => handleInputChange('badge', e.target.value)}
                  className="bg-white/10 border-white/20 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="tags" className="text-white font-medium">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="bg-white/10 border-white/20 text-white mt-2"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_exclusive}
                  onChange={(e) => handleInputChange('is_exclusive', e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10"
                />
                <span className="text-white">Exclusive</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10"
                />
                <span className="text-white">Featured</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_verified}
                  onChange={(e) => handleInputChange('is_verified', e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10"
                />
                <span className="text-white">Verified</span>
              </label>
            </div>
          </div>
        </div>

        {/* Car Features */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Car Features</h3>
          <div>
            <Label htmlFor="features" className="text-white font-medium">
              Features (one per line)
            </Label>
            <textarea
              id="features"
              value={formData.features || ''}
              onChange={(e) => handleInputChange('features', e.target.value)}
              placeholder="Enter car features, one per line:&#10;Premium Sound System&#10;Leather Seats&#10;Navigation System"
              className="w-full h-32 mt-2 p-3 bg-white/10 border border-white/20 rounded text-white resize-none"
            />
            <p className="text-white/60 text-sm mt-2">
              Enter each feature on a new line. These will be displayed in the car details.
            </p>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={saving}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8"
          >
            {saving ? (
              <>
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-black/30 border-t-black rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <Link href="/admin/cars">
            <Button variant="outline">
              Cancel
            </Button>
          </Link>

          <Link href={`/admin/cars/${carId}/images`}>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Manage Images
            </Button>
          </Link>
          <Link href={`/admin/cars/${carId}/virtual-tour`}>
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Virtual Tour
            </Button>
          </Link>

          <Link href={`/marketplace`}>
            <Button variant="ghost" className="ml-auto">
              <Car className="w-4 h-4 mr-2" />
              View Live
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}