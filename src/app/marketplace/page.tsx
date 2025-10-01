"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Calendar, MapPin, Fuel, Gauge, Crown, Diamond, Star, Play, Heart, ArrowRight, ArrowLeft, X, Zap, Award, TrendingUp, ChevronDown } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr'
import { Car, CarImage, Database } from '@/lib/supabase/types'

// Type for enhanced car data with images
interface CarWithImages extends Car {
  images: CarImage[]
  features: string[]
  primaryImage?: string
  gallery: string[]
}

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<CarWithImages | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredCars, setFilteredCars] = useState<CarWithImages[]>([]);
  const [allCars, setAllCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Hero slideshow images
  const heroImages = [
    '/html/imagesslides/DSC02820.jpg',
    '/html/imagesslides/DSC03009.jpg',
    '/html/imagesslides/DSC03211.jpg',
    '/html/imagesslides/DSC03304.jpg',
    '/html/imagesslides/PDP04595.jpg',
    '/html/imagesslides/PDP04616.jpg',
    '/html/imagesslides/PDP04837.jpg',
  ];

  // Create Supabase client
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch cars from Supabase on mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Hero slideshow effect - change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Filter cars based on active filter and search query
  useEffect(() => {
    let filtered = allCars;

    if (activeFilter !== "all") {
      filtered = filtered.filter(car => car.category === activeFilter || car.status === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery)
      );
    }

    setFilteredCars(filtered);
  }, [activeFilter, searchQuery, allCars]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the API route that we know works
      const response = await fetch('/api/test-db');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch cars');
      }

      const carsData = result.data || [];

      // Check if we have any cars
      if (carsData.length === 0) {
        setAllCars([]);
        setLoading(false);
        return;
      }

      // Transform the cars data
      const transformedCars: CarWithImages[] = [];

      for (const car of carsData) {
        // Fetch images and features in parallel
        const [imgResponse, featuresResponse] = await Promise.all([
          fetch(`/api/car-images/${car.id}`).catch(() => null),
          fetch(`/api/car-features/${car.id}`).catch(() => null)
        ]);

        let images: any[] = [];
        let features: string[] = [];

        if (imgResponse && imgResponse.ok) {
          const imgData = await imgResponse.json();
          images = imgData.data || [];
        }

        if (featuresResponse && featuresResponse.ok) {
          const featuresData = await featuresResponse.json();
          features = (featuresData.data || []).map((f: any) => f.feature_name);
        }

        const primaryImage = images.find((img: any) => img.image_type === 'primary');
        const gallery = images.map((img: any) => img.image_url);

        transformedCars.push({
          ...car,
          price: typeof car.price === 'string' ? parseFloat(car.price) : car.price,
          images,
          features,
          primaryImage: primaryImage?.image_url || gallery[0] || '',
          gallery
        });
      }

      setAllCars(transformedCars);
    } catch (err: any) {
      console.error('Error fetching cars:', err);
      setError(err.message || 'Error loading cars');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string = 'USD', showRM: boolean = true) => {
    const usdPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);

    if (showRM) {
      const rmPrice = (price * 4).toLocaleString();
      return (
        <div className="flex flex-col">
          <span className="text-gold-medium">{usdPrice}</span>
          <span className="text-gold-light text-sm">RM {rmPrice}</span>
        </div>
      );
    }

    return usdPrice;
  };

  const formatPriceText = (price: number, currency: string = 'USD') => {
    const usdPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    return usdPrice;
  };

  const generateWhatsAppUrl = (car: CarWithImages) => {
    const phoneNumber = '60122946022';
    const priceText = car.show_price ? formatPriceText(car.price, car.price_currency || 'USD') : 'Contact for Price';
    const message = `Hi! I'm interested in the ${car.year} ${car.make} ${car.model} (${car.name}) listed at ${priceText}. I'd like to know more about this vehicle. Status: ${car.status.replace('_', ' ').toUpperCase()}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const generateWhatsAppUrl = (car: CarWithImages) => {
    const phoneNumber = '60124134002';
    const message = `Hi! I'm interested in the ${car.year} ${car.make} ${car.model} (${car.name}) listed at ${formatPrice(car.price, car.price_currency || 'USD')}. I'd like to know more about this vehicle. Status: ${car.status.replace('_', ' ').toUpperCase()}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const openModal = (car: CarWithImages) => {
    setSelectedCar(car);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedCar && selectedCar.gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev >= selectedCar.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedCar && selectedCar.gallery.length > 0) {
      setCurrentImageIndex((prev) =>
        prev <= 0 ? selectedCar.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Black opacity overlay */}
          <div className="absolute inset-0 bg-black/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="animate-luxury-fade-in-up">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-8 py-3 bg-gradient-to-r from-gold-medium/20 via-gold-light/20 to-gold-medium/20 backdrop-blur-xl border border-gold-medium/30 rounded-full animate-premium-glow">
              <Diamond className="w-5 h-5 text-gold-medium animate-pulse" />
              <span className="text-gold-light font-body text-sm uppercase tracking-[0.3em]">Curated Collection</span>
              <Diamond className="w-5 h-5 text-gold-medium animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-medium to-gold-light mb-8 animate-gold-shimmer leading-none">
              MARKETPLACE
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-medium"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-medium"></div>
            </div>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gold-light font-display mb-6 tracking-wider">
              Exceptional Vehicles for Discerning Collectors
            </p>

            {/* Description */}
            <p className="text-white-soft text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Discover the world's most exclusive supercars, hypercars, and vintage classics.
              Each vehicle undergoes rigorous authentication and provenance verification.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-display text-gold-medium mb-2">{allCars.filter(car => car.status === 'available').length}</div>
                <div className="text-caption text-white-soft uppercase tracking-wider">Available</div>
              </div>
              <div className="w-px h-12 bg-gold-medium/30"></div>
              <div className="text-center">
                <div className="text-4xl font-display text-gold-medium mb-2">{allCars.length}</div>
                <div className="text-caption text-white-soft uppercase tracking-wider">Total Cars</div>
              </div>
              <div className="w-px h-12 bg-gold-medium/30"></div>
              <div className="text-center">
                <div className="text-4xl font-display text-gold-medium mb-2">24/7</div>
                <div className="text-caption text-white-soft uppercase tracking-wider">Concierge</div>
              </div>
            </div>

            {/* Scroll Down Arrow */}
            <a href="#collection" className="inline-block animate-bounce">
              <ChevronDown className="w-6 h-6 text-gold-medium hover:text-gold-light transition-colors" />
            </a>
          </div>
        </div>

        {/* Luxury Corner Accents */}
        <div className="absolute top-12 left-12 w-32 h-32 border-l-2 border-t-2 border-gold-medium/30 animate-fade-in"></div>
        <div className="absolute top-12 right-12 w-32 h-32 border-r-2 border-t-2 border-gold-medium/30 animate-fade-in" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-12 left-12 w-32 h-32 border-l-2 border-b-2 border-gold-medium/30 animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-12 right-12 w-32 h-32 border-r-2 border-b-2 border-gold-medium/30 animate-fade-in" style={{ animationDelay: '0.6s' }}></div>
      </section>

      {/* Premium Filters & Search */}
      <section id="collection" className="py-8 px-4 bg-gradient-to-br from-black-soft to-black-rich relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold-medium/20 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-8">
            {/* Filter Tabs */}
            <div className="w-full lg:w-auto overflow-x-auto">
              <div className="filter-tabs backdrop-blur-xl bg-black-rich/50 p-2 rounded-full border border-gold-medium/20 inline-flex min-w-min">
                {["all", "hypercar", "supercar", "classic", "luxury", "electric", "available", "sold", "coming_soon"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`filter-tab whitespace-nowrap ${activeFilter === filter ? "active" : ""} transition-all duration-300`}
                  >
                    {filter.replace("_", " ").replace("-", " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Luxury Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-medium/20 to-gold-light/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="luxury-search relative backdrop-blur-xl bg-black-rich/50 border-gold-medium/30">
                <Search className="search-icon text-gold-medium" />
                <input
                  type="text"
                  placeholder="Search exclusive collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Car Gallery */}
      <section className="pt-4 pb-12 px-4 bg-gradient-to-br from-black-rich via-black-pure to-black-soft relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-medium"></div>
              <p className="text-white-soft mt-4">Loading luxury collection...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400">{error}</p>
                <Button onClick={fetchCars} className="mt-4 btn-luxury">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white-soft text-xl">No cars found matching your criteria.</p>
              <Button onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }} className="mt-4 btn-luxury-outline">
                Clear Filters
              </Button>
            </div>
          )}

          {!loading && !error && filteredCars.length > 0 && (
            <div className="flex flex-col gap-8">
              {filteredCars.map((car, index) => (
                <div
                  key={car.id}
                  className="group relative cursor-pointer animate-car-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openModal(car)}
                >
                  {/* Card Container with Premium Effects */}
                  <div className="relative bg-gradient-to-br from-black-rich to-black-soft border border-gold-medium/20 rounded-lg overflow-hidden transition-all duration-500 hover:border-gold-medium/60 hover:shadow-2xl hover:shadow-gold-medium/20 hover:-translate-y-2">

                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-medium/0 via-gold-light/0 to-gold-medium/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Horizontal Layout Container */}
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Car Image */}
                      <div className="relative h-72 md:h-96 md:w-2/5 overflow-hidden">
                      <img
                        src={car.primaryImage || car.gallery[0] || '/placeholder-car.jpg'}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-car.jpg';
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                          car.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                          car.status === 'sold' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                          car.status === 'coming_soon' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        }`}>
                          {car.status.replace("_", " ").replace("-", " ")}
                        </span>
                      </div>

                      {/* Badge */}
                      {car.badge && (
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-gold-medium/90 backdrop-blur-md rounded-full">
                            <Award className="w-4 h-4 text-black" />
                            <span className="text-black text-xs font-bold uppercase tracking-wider">{car.badge}</span>
                          </div>
                        </div>
                      )}

                      {/* Exclusive Badge */}
                      {car.is_exclusive && (
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md border border-gold-medium/50 rounded-full">
                            <Crown className="w-4 h-4 text-gold-medium animate-pulse" />
                            <span className="text-gold-medium text-xs font-bold uppercase tracking-wider">Exclusive</span>
                          </div>
                        </div>
                      )}

                      {/* Quick View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Button className="btn-luxury shadow-2xl">
                          <Eye className="w-5 h-5 mr-2" />
                          View Details
                        </Button>
                      </div>
                      </div>

                      {/* Car Details */}
                      <div className="p-6 space-y-4 md:w-3/5 flex flex-col justify-between">
                        {/* Name and Year */}
                        <div className="flex items-start justify-between">
                        <h3 className="font-display text-2xl text-gold-medium group-hover:text-gold-light transition-colors leading-tight">
                          {car.name}
                        </h3>
                        <span className="text-gold-light text-sm font-body bg-gold-medium/10 px-3 py-1 rounded-full">
                          {car.year}
                        </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          {car.show_price ? (
                            <div className="text-3xl font-display">
                              {formatPrice(car.price, car.price_currency || 'USD')}
                            </div>
                          ) : (
                            <span className="text-2xl font-display text-gold-medium">
                              Contact for Price
                            </span>
                          )}
                        </div>

                        <div className="divider-gold opacity-30"></div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-gold-medium" />
                          <div>
                            <div className="text-caption text-white-soft/60">Power</div>
                            <div className="text-white-soft text-sm font-semibold">{car.horsepower || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-gold-medium" />
                          <div>
                            <div className="text-caption text-white-soft/60">0-60mph</div>
                            <div className="text-white-soft text-sm font-semibold">{car.acceleration || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-gold-medium" />
                          <div>
                            <div className="text-caption text-white-soft/60">Mileage</div>
                            <div className="text-white-soft text-sm font-semibold">{car.mileage || 'N/A'}</div>
                          </div>
                        </div>
                        </div>

                        <div className="divider-gold opacity-30"></div>

<<<<<<< HEAD
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button className="btn-luxury-outline flex-1 group/btn">
                            <Heart className="w-4 h-4 mr-2 group-hover/btn:fill-current transition-all" />
                            Save
                          </Button>
                          <Button
                            className="btn-luxury flex-1 group/btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(car);
                            }}
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
=======
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button className="btn-luxury-outline flex-1 group/btn">
                          <Heart className="w-4 h-4 mr-2 group-hover/btn:fill-current transition-all" />
                          Save
                        </Button>
                        <a href={generateWhatsAppUrl(car)} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="btn-luxury w-full group/btn">
                            Inquire
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </a>
>>>>>>> origin/main
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Enhanced Modal */}
      {selectedCar && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={closeModal}>
          <div
            className="relative bg-gradient-to-br from-black-rich to-black-soft border border-gold-medium/30 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold-medium/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image Gallery */}
            <div className="relative h-96">
              <img
                src={selectedCar.gallery[currentImageIndex] || selectedCar.primaryImage || '/placeholder-car.jpg'}
                alt={selectedCar.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-car.jpg';
                }}
              />

              {/* Navigation Arrows */}
              {selectedCar.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 border border-white/30 text-white rounded-full transition-all z-10"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 border border-white/30 text-white rounded-full transition-all z-10"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {selectedCar.gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {selectedCar.gallery.length}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-black/40 to-transparent"></div>

              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-3 bg-black/70 backdrop-blur-md border border-gold-medium/50 text-gold-medium hover:text-gold-light hover:border-gold-light transition-all rounded-full group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl text-gold-medium mb-3">
                      {selectedCar.name}
                    </h2>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-gold-light text-xl font-display">{selectedCar.year}</span>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase backdrop-blur-md ${
                        selectedCar.status === 'available' ? 'bg-green-500/30 text-green-400 border border-green-500/50' :
                        'bg-red-500/30 text-red-400 border border-red-500/50'
                      }`}>
                        {selectedCar.status.replace("_", " ")}
                      </span>
                      {selectedCar.is_exclusive && (
                        <span className="flex items-center gap-2 px-4 py-2 bg-gold-medium/20 backdrop-blur-md border border-gold-medium/50 rounded-full">
                          <Crown className="w-4 h-4 text-gold-medium" />
                          <span className="text-gold-medium text-sm font-bold uppercase">Exclusive</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {selectedCar.show_price && (
                      <div className="text-5xl font-display">
                        {formatPrice(selectedCar.price, selectedCar.price_currency || 'USD')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-gold-medium mb-4 flex items-center gap-3">
                      <Diamond className="w-5 h-5" />
                      Description
                    </h3>
                    <p className="text-white-soft leading-relaxed text-lg">
                      {selectedCar.description || `Experience the ultimate in luxury and performance with this exceptional ${selectedCar.make} ${selectedCar.model}. This vehicle represents the pinnacle of automotive engineering and design.`}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-gold-medium mb-4 flex items-center gap-3">
                      <Star className="w-5 h-5" />
                      Features
                    </h3>
                    {selectedCar.features.length > 0 ? (
                      <ul className="space-y-3">
                        {selectedCar.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-white-soft">
                            <Crown className="w-5 h-5 text-gold-medium flex-shrink-0 mt-1" />
                            <span className="text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white-soft/70">Feature details available upon inquiry.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-black-rich/50 backdrop-blur-xl p-8 rounded-lg border border-gold-medium/20">
                    <h3 className="font-display text-2xl text-gold-medium mb-6">
                      Specifications
                    </h3>

                    <div className="space-y-4">
                      {[
                        { label: 'Make', value: selectedCar.make },
                        { label: 'Model', value: selectedCar.model },
                        { label: 'Year Manufactured', value: selectedCar.year.toString() },
                        { label: 'Engine', value: selectedCar.engine || 'N/A' },
                        { label: 'Power', value: selectedCar.horsepower || 'N/A' },
                        { label: '0-60mph', value: selectedCar.acceleration || 'N/A' },
                        { label: 'Top Speed', value: selectedCar.top_speed || 'N/A' },
                        { label: 'Mileage', value: selectedCar.mileage || 'N/A' },
                      ].filter(spec => spec.value && spec.value !== 'N/A').map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-gold-medium/10 last:border-0">
                          <span className="text-white-soft/70 font-medium">{spec.label}</span>
                          <span className="text-white-soft font-semibold text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a href={`/virtual-tour?carId=${selectedCar.id}`} className="block">
                      <button className="w-full bg-white hover:bg-gray-100 text-black px-8 py-5 font-bold text-lg uppercase tracking-wider hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 rounded-lg group shadow-lg">
                        <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        Gallery
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </a>

                    <a href={generateWhatsAppUrl(selectedCar)} target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 font-semibold text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 rounded-lg group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Contact via WhatsApp
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}