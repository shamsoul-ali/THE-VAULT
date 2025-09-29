'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/image-upload'
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Upload,
  Trash2,
  Star,
  Eye
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { Car as CarType, CarImage } from '@/lib/supabase/types'
import Link from 'next/link'

interface ImageWithMetadata extends CarImage {
  file?: File
}

export default function CarImagesPage() {
  const router = useRouter()
  const params = useParams()
  const carId = params.id as string

  const [car, setCar] = useState<CarType | null>(null)
  const [images, setImages] = useState<ImageWithMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (carId) {
      fetchCarAndImages()
    }
  }, [carId])

  const fetchCarAndImages = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch car details
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single()

      if (carError) throw carError
      setCar(carData)

      // Fetch existing images
      const { data: imagesData, error: imagesError } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('sort_order', { ascending: true })

      if (imagesError) throw imagesError
      setImages(imagesData || [])

    } catch (err: any) {
      setError(err.message || 'Error loading car and images')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (url: string, file: File) => {
    try {
      // Determine image type and sort order
      const sortOrder = images.length
      const imageType = sortOrder === 0 ? 'primary' : 'exterior'

      // Save image metadata to database
      const { data, error } = await supabase
        .from('car_images')
        .insert({
          car_id: carId,
          image_url: url,
          image_type: imageType,
          sort_order: sortOrder,
          alt_text: `${car?.name || 'Car'} - Image ${sortOrder + 1}`,
          file_size: file.size,
          format: file.type.split('/')[1],
          storage_path: url.split('/').pop()
        })
        .select()
        .single()

      if (error) throw error

      // Add to local state
      setImages(prev => [...prev, { ...data, file }])
      setSuccess('Image uploaded successfully!')

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)

    } catch (err: any) {
      console.error('Error saving image metadata:', err)
      setError(err.message || 'Error saving image')
    }
  }

  const handleImageRemove = async (url: string) => {
    try {
      // Find the image to remove
      const imageToRemove = images.find(img => img.image_url === url)
      if (!imageToRemove) return

      // Remove from database
      const { error } = await supabase
        .from('car_images')
        .delete()
        .eq('id', imageToRemove.id)

      if (error) throw error

      // Remove from local state
      setImages(prev => prev.filter(img => img.image_url !== url))
      setSuccess('Image removed successfully!')

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)

    } catch (err: any) {
      console.error('Error removing image:', err)
      setError(err.message || 'Error removing image')
    }
  }

  const handleSetPrimary = async (imageId: string) => {
    try {
      setSaving(true)

      // Update all images to not be primary
      await supabase
        .from('car_images')
        .update({ image_type: 'exterior', sort_order: 999 })
        .eq('car_id', carId)

      // Set the selected image as primary
      const { error } = await supabase
        .from('car_images')
        .update({ image_type: 'primary', sort_order: 0 })
        .eq('id', imageId)

      if (error) throw error

      // Refresh images
      await fetchCarAndImages()
      setSuccess('Primary image updated!')

      setTimeout(() => setSuccess(null), 3000)

    } catch (err: any) {
      setError(err.message || 'Error updating primary image')
    } finally {
      setSaving(false)
    }
  }

  const handleReorder = async (imageId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('car_images')
        .update({ sort_order: newOrder })
        .eq('id', imageId)

      if (error) throw error

      // Refresh images
      await fetchCarAndImages()

    } catch (err: any) {
      setError(err.message || 'Error reordering images')
    }
  }

  const getImageUrls = () => images.map(img => img.image_url)

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
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="h-40 bg-white/10 rounded animate-pulse"></div>
        </div>
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
          <Link href={`/admin/cars/${carId}/edit`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Car Images</h1>
            <p className="text-white/70">{car?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/marketplace">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>
      </div>

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

      {/* Image Upload */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Upload className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Upload Images</h2>
            <p className="text-white/70 text-sm">Add high-quality images of your car</p>
          </div>
        </div>

        <ImageUpload
          onUpload={handleImageUpload}
          onRemove={handleImageRemove}
          existingImages={getImageUrls()}
          maxFiles={20}
          bucket="car-images"
          folder="uploads"
        />
      </div>

      {/* Image Management */}
      {images.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <ImageIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Manage Images</h2>
              <p className="text-white/70 text-sm">Reorder, set primary image, and manage your gallery</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((image, index) => (
                <div
                  key={image.id}
                  className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/10"
                >
                  {/* Image */}
                  <div className="aspect-video bg-white/10">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || `Car image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      {image.image_type !== 'primary' && (
                        <Button
                          size="sm"
                          onClick={() => handleSetPrimary(image.id)}
                          disabled={saving}
                          className="bg-yellow-400 hover:bg-yellow-300 text-black"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Set Primary
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleImageRemove(image.image_url)}
                        className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {image.image_type === 'primary' && (
                      <div className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
                        Primary
                      </div>
                    )}
                    <div className="px-2 py-1 bg-black/80 text-white text-xs rounded capitalize">
                      {image.image_type}
                    </div>
                  </div>

                  {/* Order */}
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-black/80 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="p-3">
                    <div className="text-white text-sm font-medium mb-1">
                      {image.alt_text || `Image ${index + 1}`}
                    </div>
                    <div className="text-white/60 text-xs">
                      {image.format?.toUpperCase()} • {Math.round((image.file_size || 0) / 1024)}KB
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="text-blue-400 font-medium mb-2">Pro Tips:</h3>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• The first image you upload becomes the primary image automatically</li>
              <li>• Use "Set Primary" to change which image appears first in listings</li>
              <li>• Upload high-resolution images for the best quality</li>
              <li>• Include exterior, interior, and detail shots for a complete gallery</li>
            </ul>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link href={`/admin/cars/${carId}/edit`}>
          <Button variant="outline">
            Back to Edit Car
          </Button>
        </Link>
        <Link href="/admin/cars">
          <Button variant="outline">
            All Cars
          </Button>
        </Link>
        <Link href="/marketplace">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black">
            <Eye className="w-4 h-4 mr-2" />
            View Live
          </Button>
        </Link>
      </div>
    </div>
  )
}