'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Grid, Car, Eye, Settings, Check } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import Image from 'next/image'

interface CarImage {
  id: string
  image_url: string
  image_type: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
  alt_text: string | null
  caption: string | null
  sort_order: number | null
  gallery_selected: boolean | null
}

export default function GalleryManagePage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const carId = params.id as string

  const [images, setImages] = useState<CarImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Images', icon: Grid },
    { id: 'exterior', label: 'Exterior', icon: Car },
    { id: 'interior', label: 'Interior', icon: Eye },
    { id: 'engine', label: 'Engine', icon: Settings },
    { id: 'special', label: 'Special', icon: Grid },
    { id: 'primary', label: 'Primary', icon: Grid },
    { id: 'thumbnail', label: 'Thumbnail', icon: Grid }
  ]

  useEffect(() => {
    if (!authLoading && user) {
      fetchImages()
    }
  }, [carId, user, authLoading])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('sort_order', { ascending: true })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleImageSelection = async (imageId: string, currentlySelected: boolean) => {
    const selectedCount = images.filter(img => img.gallery_selected).length

    // Check if trying to select more than 10
    if (!currentlySelected && selectedCount >= 10) {
      alert('You can only select up to 10 images for the gallery.')
      return
    }

    try {
      const { error } = await supabase
        .from('car_images')
        .update({ gallery_selected: !currentlySelected })
        .eq('id', imageId)

      if (error) throw error

      // Update local state
      setImages(prev => prev.map(img =>
        img.id === imageId
          ? { ...img, gallery_selected: !currentlySelected }
          : img
      ))
    } catch (error) {
      console.error('Error updating image selection:', error)
      alert('Failed to update image selection')
    }
  }

  const updateImageCategory = async (imageId: string, newCategory: string) => {
    try {
      const { error } = await supabase
        .from('car_images')
        .update({ image_type: newCategory as any })
        .eq('id', imageId)

      if (error) throw error

      // Update local state
      setImages(prev => prev.map(img =>
        img.id === imageId
          ? { ...img, image_type: newCategory as any }
          : img
      ))
    } catch (error) {
      console.error('Error updating image category:', error)
      alert('Failed to update image category')
    }
  }

  const clearAllSelections = async () => {
    if (!confirm('Are you sure you want to clear all gallery selections?')) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('car_images')
        .update({ gallery_selected: false })
        .eq('car_id', carId)

      if (error) throw error

      setImages(prev => prev.map(img => ({ ...img, gallery_selected: false })))
    } catch (error) {
      console.error('Error clearing selections:', error)
      alert('Failed to clear selections')
    } finally {
      setSaving(false)
    }
  }

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.image_type === selectedCategory)

  const selectedImages = images.filter(img => img.gallery_selected)

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-medium mb-4"></div>
          <p className="text-white-soft mt-4">Loading gallery management...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href={`/admin/cars/${carId}/edit`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Car
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gold-medium">Gallery Management</h1>
              <p className="text-white-soft">
                Select up to 10 images for the gallery display. Selected: {selectedImages.length}/10
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={clearAllSelections}
              variant="outline"
              disabled={saving || selectedImages.length === 0}
            >
              Clear All
            </Button>
            <Link href={`/virtual-tour?carId=${carId}`} target="_blank">
              <Button className="btn-luxury">
                Preview Gallery
              </Button>
            </Link>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20">
            <Grid className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No Images Found</h2>
            <p className="text-white/70 mb-8">
              Upload images first in the Images section before managing the gallery.
            </p>
            <Link href={`/admin/cars/${carId}/images`}>
              <Button className="btn-luxury">
                Manage Images
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const count = category.id === 'all'
                  ? images.length
                  : images.filter(img => img.image_type === category.id).length

                if (category.id !== 'all' && count === 0) return null

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gold-medium text-black font-semibold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label} ({count})
                  </button>
                )
              })}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="space-y-3">
                  <div className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || 'Car image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />

                      {/* Selection Overlay */}
                      <div
                        className={`absolute inset-0 border-2 rounded-lg transition-all cursor-pointer ${
                          image.gallery_selected
                            ? 'border-gold-medium bg-gold-medium/20'
                            : 'border-transparent hover:border-white/30'
                        }`}
                        onClick={() => toggleImageSelection(image.id, !!image.gallery_selected)}
                      >
                        {image.gallery_selected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-gold-medium rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-black" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">Category:</span>
                        <select
                          value={image.image_type}
                          onChange={(e) => updateImageCategory(image.id, e.target.value)}
                          className="text-xs bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                        >
                          <option value="exterior">Exterior</option>
                          <option value="interior">Interior</option>
                          <option value="engine">Engine</option>
                          <option value="special">Special</option>
                          <option value="primary">Primary</option>
                          <option value="thumbnail">Thumbnail</option>
                        </select>
                      </div>

                      <button
                        onClick={() => toggleImageSelection(image.id, !!image.gallery_selected)}
                        className={`w-full text-xs py-2 px-3 rounded transition-all ${
                          image.gallery_selected
                            ? 'bg-gold-medium text-black font-semibold'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        disabled={!image.gallery_selected && selectedImages.length >= 10}
                      >
                        {image.gallery_selected ? 'Selected' : 'Select for Gallery'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selection Summary */}
            {selectedImages.length > 0 && (
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gold-medium mb-4">
                  Gallery Selection Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Total Selected:</span>
                    <div className="text-white font-semibold">{selectedImages.length}/10</div>
                  </div>
                  <div>
                    <span className="text-white/60">Exterior:</span>
                    <div className="text-white font-semibold">
                      {selectedImages.filter(img => img.image_type === 'exterior').length}
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60">Interior:</span>
                    <div className="text-white font-semibold">
                      {selectedImages.filter(img => img.image_type === 'interior').length}
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60">Engine:</span>
                    <div className="text-white font-semibold">
                      {selectedImages.filter(img => img.image_type === 'engine').length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}