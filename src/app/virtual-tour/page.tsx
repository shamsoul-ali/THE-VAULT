'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play } from 'lucide-react'
import Link from 'next/link'

interface VirtualTour {
  id: string
  video_url: string
  tour_title: string
  tour_description: string
  video_duration?: number
}

function VirtualTourContent() {
  const searchParams = useSearchParams()
  const carId = searchParams.get('carId')

  const [virtualTour, setVirtualTour] = useState<VirtualTour | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (carId) {
      fetchVirtualTour()
    } else {
      setLoading(false)
    }
  }, [carId])

  const fetchVirtualTour = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/virtual-tours/${carId}`)
      const result = await response.json()

      if (result.success && result.data) {
        setVirtualTour(result.data)
      } else {
        setVirtualTour(null)
      }
    } catch (err: any) {
      console.error('Error fetching virtual tour:', err)
      setError(err.message || 'Failed to load virtual tour')
    } finally {
      setLoading(false)
    }
  }

  if (!carId) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Virtual Tour</h1>
          <p className="text-white/70 mb-8">No car selected for virtual tour</p>
          <Link href="/marketplace">
            <Button className="btn-luxury">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-medium mb-4"></div>
          <p className="text-white/70">Loading virtual tour...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        {virtualTour ? (
          <div className="space-y-8">
            {/* Video Player */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                controls
                className="w-full aspect-video"
                poster={virtualTour.video_thumbnail}
                preload="metadata"
              >
                <source src={virtualTour.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Tour Details */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gold-medium">
                {virtualTour.tour_title || 'Virtual Tour'}
              </h1>
              {virtualTour.tour_description && (
                <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                  {virtualTour.tour_description}
                </p>
              )}

              <div className="flex gap-4 justify-center pt-8">
                <Link href="/marketplace">
                  <Button variant="outline">Back to Marketplace</Button>
                </Link>
                <a href="https://wa.me/60124134002" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-luxury">Contact via WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Play className="w-12 h-12 text-white/50" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Virtual Tour Coming Soon</h1>
            <p className="text-white/70 mb-8">
              The virtual tour for this vehicle is not yet available.
            </p>
            <p className="text-white/50 text-sm mb-8">
              Contact us via WhatsApp for a personalized viewing experience.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/marketplace">
                <Button variant="outline">Back to Marketplace</Button>
              </Link>
              <a href="https://wa.me/60124134002" target="_blank" rel="noopener noreferrer">
                <Button className="btn-luxury">Contact via WhatsApp</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VirtualTourPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-medium mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    }>
      <VirtualTourContent />
    </Suspense>
  )
}