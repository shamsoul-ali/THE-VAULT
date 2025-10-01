'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Grid } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CarImage {
  id: string
  image_url: string
  image_type: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
  alt_text: string | null
  caption: string | null
  sort_order: number | null
}

interface CarInfo {
  id: string
  name: string
  make: string
  model: string
  year: number
  price: number
  price_currency?: string
  show_price: boolean
  status: string
}

function VirtualTourContent() {
  const searchParams = useSearchParams()
  const carId = searchParams.get('carId')

  const [carImages, setCarImages] = useState<CarImage[]>([])
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [currentMainImage, setCurrentMainImage] = useState(0)

  const formatPriceText = (price: number, currency: string = 'USD') => {
    const usdPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    return usdPrice;
  };

  const generateWhatsAppUrl = (car: CarInfo | null) => {
    if (!car) return 'https://wa.me/60122946022';

    const phoneNumber = '60122946022';
    const priceText = car.show_price ? formatPriceText(car.price, car.price_currency || 'USD') : 'Contact for Price';
    const message = `Hi! I'm interested in the ${car.year} ${car.make} ${car.model} (${car.name}) listed at ${priceText}. I'd like to know more about this vehicle. Status: ${car.status.replace('_', ' ').toUpperCase()}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  useEffect(() => {
    if (carId) {
      fetchGalleryData()
    } else {
      setLoading(false)
    }
  }, [carId])

  const fetchGalleryData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch car info
      const carResponse = await fetch(`/api/cars/${carId}`)
      const carResult = await carResponse.json()

      if (carResult.success && carResult.data) {
        setCarInfo(carResult.data)
      }

      // Fetch all car images (limit to first 10)
      const imagesResponse = await fetch(`/api/car-images/${carId}`)
      const imagesResult = await imagesResponse.json()

      if (imagesResult.success && imagesResult.data) {
        // Limit to first 10 images
        setCarImages(imagesResult.data.slice(0, 10))
      } else {
        setCarImages([])
      }
    } catch (err: any) {
      console.error('Error fetching gallery data:', err)
      setError(err.message || 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  // Reset main image when images load
  useEffect(() => {
    if (carImages.length > 0) {
      setCurrentMainImage(0)
    }
  }, [carImages])

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImageModal = () => {
    setSelectedImageIndex(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return

    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : carImages.length - 1)
    } else {
      setSelectedImageIndex(selectedImageIndex < carImages.length - 1 ? selectedImageIndex + 1 : 0)
    }
  }

  const selectThumbnail = (index: number) => {
    setCurrentMainImage(index)
  }

  if (!carId) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-white/70 mb-8">No car selected for gallery view</p>
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
          <p className="text-white/70">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="text-xs md:text-sm">
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        {carImages.length > 0 ? (
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 md:space-y-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gold-medium">
                {carInfo?.name || 'Gallery'}
              </h1>
            </div>

            {/* Main Image Display */}
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white/5 cursor-pointer"
                   onClick={() => openImageModal(currentMainImage)}>
                <Image
                  src={carImages[currentMainImage].image_url}
                  alt={carImages[currentMainImage].alt_text || 'Car image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                  <span className="px-2 md:px-3 py-1 bg-black/60 backdrop-blur-sm text-xs md:text-sm text-white rounded-full">
                    {currentMainImage + 1} / {carImages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {carImages.length > 1 && (
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                  {carImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`flex-shrink-0 relative aspect-square w-16 h-16 md:w-20 md:h-20 cursor-pointer overflow-hidden rounded-lg transition-all ${
                        index === currentMainImage
                          ? 'ring-2 ring-gold-medium scale-110'
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => selectThumbnail(index)}
                    >
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || `Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="text-center pt-8 md:pt-12">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="outline" className="text-xs md:text-sm w-full md:w-auto">Back to Marketplace</Button>
                </Link>
                <a href={generateWhatsAppUrl(carInfo)} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <Button className="btn-luxury text-xs md:text-sm w-full md:w-auto">Contact for Price</Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 md:py-20">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Grid className="w-8 h-8 md:w-12 md:h-12 text-white/50" />
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Gallery Coming Soon</h1>
            <p className="text-white/70 mb-6 md:mb-8 text-sm md:text-base">
              The image gallery for this vehicle is not yet available.
            </p>
            <p className="text-white/50 text-xs md:text-sm mb-6 md:mb-8">
              Contact us via WhatsApp for more information about this vehicle.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/marketplace">
                <Button variant="outline" className="text-xs md:text-sm w-full md:w-auto">Back to Marketplace</Button>
              </Link>
              <a href={generateWhatsAppUrl(carInfo)} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button className="btn-luxury text-xs md:text-sm w-full md:w-auto">Contact for Price</Button>
              </a>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4">
            <button
              onClick={closeImageModal}
              className="absolute top-2 md:top-4 right-2 md:right-4 text-white hover:text-gold-medium transition-colors z-10"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-medium transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-medium transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
              <Image
                src={carImages[selectedImageIndex].image_url}
                alt={carImages[selectedImageIndex].alt_text || 'Car image'}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </div>

            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/70 text-xs md:text-sm">
                {selectedImageIndex + 1} of {carImages.length}
              </p>
              {carImages[selectedImageIndex].caption && (
                <p className="text-white text-xs md:text-sm mt-1 md:mt-2">
                  {carImages[selectedImageIndex].caption}
                </p>
              )}
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