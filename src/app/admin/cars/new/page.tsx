'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  DollarSign,
  Info,
  Settings,
  Palette,
  FileText,
  Tag
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'

interface CarFormData {
  // Basic Information
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

  // Engine & Performance
  engine: string
  horsepower: string
  torque: string
  transmission: string
  drivetrain: string
  acceleration: string
  top_speed: string
  fuel_type: string
  fuel_economy: string

  // Physical Specifications
  length: string
  width: string
  height: string
  weight: string
  wheelbase: string

  // Colors & Interior
  exterior_color: string
  interior_color: string
  roof_type: string

  // Descriptions
  description: string
  condition_report: string
  service_history: string

  // Features & Metadata
  badge: string
  tags: string
  is_exclusive: boolean
  is_featured: boolean
  is_verified: boolean

  // Ownership
  previous_owners: number
  ownership_history: string
  registration_documents: boolean

  // SEO
  meta_title: string
  meta_description: string
}

export default function NewCarPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

  const handleInputChange = (field: string, value: any) => {
    // Single setFormData call to prevent loops
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value }

      // Auto-generate name if make, model, or year changes
      if (['make', 'model', 'year'].includes(field)) {
        if (updatedData.make && updatedData.model && updatedData.year) {
          const autoName = `${updatedData.make} ${updatedData.model}`
          return {
            ...updatedData,
            name: autoName,
            meta_title: `${autoName} - ${updatedData.year} | Revura`
          }
        }
      }

      return updatedData
    })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation
      if (!formData.name || !formData.make || !formData.model || !formData.price) {
        throw new Error('Please fill in all required fields (Name, Make, Model, Price)')
      }

      // Prepare data for insertion
      const carData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        slug: generateSlug(formData.name),
        created_by: user?.id,
        updated_by: user?.id
      }

      const { data, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single()

      if (error) throw error

      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push(`/admin/cars/${data.id}/edit?success=created`)
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the car listing')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Car Created Successfully!</h2>
        <p className="text-white/70 mb-6">
          Your new car listing has been created and saved to the database.
        </p>
        <div className="space-x-4">
          <Link href="/admin/cars">
            <Button variant="outline">View All Cars</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/cars">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cars
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Car</h1>
          <p className="text-white/70">Create a new luxury car listing</p>
        </div>
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
                placeholder="e.g., Bugatti Chiron Super Sport"
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
                placeholder="e.g., Bugatti"
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
                placeholder="e.g., Chiron"
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
                placeholder="3900000"
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
                placeholder="e.g., 127 miles"
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
                placeholder="e.g., 8.0L W16 Quad-Turbo"
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
                placeholder="e.g., 1,577 HP"
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="torque" className="text-white font-medium">
                Torque
              </Label>
              <Input
                id="torque"
                value={formData.torque}
                onChange={(e) => handleInputChange('torque', e.target.value)}
                placeholder="e.g., 1,180 lb-ft"
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
                placeholder="e.g., 7-Speed DSG"
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="drivetrain" className="text-white font-medium">
                Drivetrain
              </Label>
              <Input
                id="drivetrain"
                value={formData.drivetrain}
                onChange={(e) => handleInputChange('drivetrain', e.target.value)}
                placeholder="e.g., AWD"
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
                placeholder="e.g., 2.4s"
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
                placeholder="e.g., 273 mph"
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
                placeholder="e.g., Premium Gasoline"
                className="bg-white/10 border-white/20 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="fuel_economy" className="text-white font-medium">
                Fuel Economy
              </Label>
              <Input
                id="fuel_economy"
                value={formData.fuel_economy}
                onChange={(e) => handleInputChange('fuel_economy', e.target.value)}
                placeholder="e.g., 8 city / 14 hwy mpg"
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
                placeholder="Describe the car's key features, history, and what makes it special..."
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
                  placeholder="e.g., Fastest, Rare, Limited Edition"
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
                  placeholder="e.g., Performance, Luxury, Carbon Fiber"
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

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8"
          >
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-black/30 border-t-black rounded-full"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Car Listing
              </>
            )}
          </Button>

          <Link href="/admin/cars">
            <Button variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}