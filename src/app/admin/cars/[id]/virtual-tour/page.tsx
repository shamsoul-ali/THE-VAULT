'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload, Play, Trash2, Save } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { createClient } from '@supabase/supabase-js'

interface VirtualTour {
  id: string
  video_url: string
  tour_title: string
  tour_description: string
  video_duration?: number
  created_at: string
}

export default function VirtualTourManagePage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const carId = params.id as string

  const [virtualTour, setVirtualTour] = useState<VirtualTour | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    tour_title: '',
    tour_description: ''
  })

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!authLoading && user) {
      fetchVirtualTour()
    }
  }, [carId, user, authLoading])

  const fetchVirtualTour = async () => {
    try {
      const response = await fetch(`/api/virtual-tours/${carId}`)
      const result = await response.json()

      if (result.success && result.data) {
        setVirtualTour(result.data)
        setFormData({
          tour_title: result.data.tour_title || '',
          tour_description: result.data.tour_description || ''
        })
      }
    } catch (error) {
      console.error('Error fetching virtual tour:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoUpload = async (file: File) => {
    if (!file || !user) {
      console.log('No file or user, returning')
      return
    }

    console.log('Starting video upload for file:', file.name, 'size:', file.size)
    setUploading(true)

    try {
      // Upload video to Supabase Storage (using the working car-images bucket)
      const fileExt = file.name.split('.').pop()
      const fileName = `${carId}-virtual-tour.${fileExt}`
      const filePath = `virtual-tours/${fileName}`

      console.log('Uploading to path:', filePath)

      // Add timeout to catch hanging uploads
      const uploadPromise = supabase.storage
        .from('car-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Upload timeout after 30 seconds')), 30000)
      )

      const { data: uploadData, error: uploadError } = await Promise.race([
        uploadPromise,
        timeoutPromise
      ]) as any

      console.log('Upload response:', { data: uploadData, error: uploadError })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      if (!uploadData) {
        throw new Error('Upload completed but no data returned')
      }

      console.log('Upload successful, getting public URL')

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(filePath)

      console.log('Public URL:', publicUrl)

      // Create/update virtual tour record
      console.log('Saving virtual tour data to database')
      const response = await fetch(`/api/virtual-tours/${carId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_url: publicUrl,
          tour_title: formData.tour_title || `Virtual Tour - Car ${carId}`,
          tour_description: formData.tour_description || 'Take a virtual tour of this exceptional vehicle.'
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('API response:', result)

      if (result.success) {
        console.log('Virtual tour saved successfully, refreshing data')
        await fetchVirtualTour() // Refresh data
        alert('Video uploaded successfully!')
      } else {
        throw new Error(result.error || 'Failed to save virtual tour')
      }
    } catch (error: any) {
      console.error('Error uploading video:', error)
      alert('Error uploading video: ' + error.message)
    } finally {
      console.log('Upload process complete, setting uploading to false')
      setUploading(false)
    }
  }

  const handleSaveDetails = async () => {
    if (!virtualTour || !user) return

    setSaving(true)
    try {
      const response = await fetch(`/api/virtual-tours/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tour_title: formData.tour_title,
          tour_description: formData.tour_description
        })
      })

      const result = await response.json()
      if (result.success) {
        await fetchVirtualTour() // Refresh data
        alert('Virtual tour details updated successfully!')
      } else {
        throw new Error(result.error || 'Failed to update virtual tour')
      }
    } catch (error: any) {
      console.error('Error updating virtual tour:', error)
      alert('Error updating virtual tour: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTour = async () => {
    if (!virtualTour || !user) return

    if (!confirm('Are you sure you want to delete this virtual tour?')) return

    try {
      const response = await fetch(`/api/virtual-tours/${carId}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      if (result.success) {
        setVirtualTour(null)
        setFormData({ tour_title: '', tour_description: '' })
        alert('Virtual tour deleted successfully!')
      } else {
        throw new Error(result.error || 'Failed to delete virtual tour')
      }
    } catch (error: any) {
      console.error('Error deleting virtual tour:', error)
      alert('Error deleting virtual tour: ' + error.message)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    if (videoFile) {
      handleVideoUpload(videoFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      handleVideoUpload(file)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-medium"></div>
          <p className="text-white-soft mt-4">Loading virtual tour management...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/admin/cars/${carId}/edit`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Car
            </Button>
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gold-medium">Virtual Tour Management</h1>

          {/* Current Video Display */}
          {virtualTour?.video_url && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gold-light">Current Virtual Tour</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <video
                  controls
                  className="w-full max-w-2xl mx-auto rounded-lg mb-4"
                  poster={virtualTour.video_thumbnail}
                >
                  <source src={virtualTour.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">{virtualTour.tour_title}</h3>
                  <p className="text-gray-400">{virtualTour.tour_description}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleDeleteTour}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Tour
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Video Upload Area */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gold-light">
              {virtualTour ? 'Replace Video' : 'Upload Video'}
            </h2>
            <div
              className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gold-medium transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {uploading ? (
                <div>
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold-medium mb-4"></div>
                  <p className="text-gray-400">Uploading video...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-4">Drag and drop a video file here, or click to select</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="inline-block cursor-pointer">
                    <div className="bg-gradient-to-r from-gold-medium to-gold-light text-black px-6 py-3 rounded-lg font-semibold hover:from-gold-light hover:to-gold-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                      Select Video File
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Supported formats: MP4, MOV, AVI (Max: 100MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Tour Details Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gold-light">Tour Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tour Title
              </label>
              <input
                type="text"
                value={formData.tour_title}
                onChange={(e) => setFormData(prev => ({ ...prev, tour_title: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-medium focus:outline-none"
                placeholder="Enter tour title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tour Description
              </label>
              <textarea
                value={formData.tour_description}
                onChange={(e) => setFormData(prev => ({ ...prev, tour_description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-medium focus:outline-none"
                placeholder="Enter tour description..."
              />
            </div>

            <Button
              onClick={handleSaveDetails}
              disabled={saving}
              className="btn-luxury"
            >
              {saving ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Details
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}