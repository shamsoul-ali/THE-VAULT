"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Calendar, MapPin, Fuel, Gauge, Crown, Diamond, Star, Play, Heart, ArrowRight, X } from "lucide-react";

// Luxury car data (using placeholder images for demo)
const luxuryCars = [
  {
    id: 1,
    name: "Bugatti Chiron Super Sport",
    year: 2023,
    price: "$3,900,000",
    status: "available",
    category: "hypercar",
    location: "Monaco",
    mileage: "127 miles",
    engine: "8.0L W16 Quad-Turbo",
    horsepower: "1,577 HP",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&h=800&fit=crop"
    ],
    description: "The pinnacle of automotive engineering, featuring a quad-turbocharged W16 engine producing unprecedented power.",
    features: ["Carbon Fiber Body", "Ceramic Brakes", "Active Aerodynamics", "Leather Interior"],
    exclusive: true
  },
  {
    id: 2,
    name: "Ferrari 250 GTO",
    year: 1962,
    price: "$48,400,000",
    status: "sold",
    category: "classic",
    location: "Maranello",
    mileage: "15,847 miles",
    engine: "3.0L V12",
    horsepower: "300 HP",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop"
    ],
    description: "One of only 36 ever made, this legendary racing car represents the holy grail of classic Ferrari collecting.",
    features: ["Matching Numbers", "Period Correct", "Race History", "Concours Condition"],
    exclusive: true
  },
  {
    id: 3,
    name: "McLaren P1",
    year: 2024,
    price: "$1,350,000",
    status: "available",
    category: "hypercar",
    location: "London",
    mileage: "245 miles",
    engine: "3.8L V8 Hybrid",
    horsepower: "903 HP",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop"
    ],
    description: "The ultimate expression of McLaren's Formula 1 technology transferred to the road.",
    features: ["Hybrid Powertrain", "DRS System", "Carbon Tub", "Track Mode"],
    exclusive: false
  },
  {
    id: 4,
    name: "Koenigsegg Jesko",
    year: 2025,
    price: "Coming Soon",
    status: "coming-soon",
    category: "hypercar",
    location: "Stockholm",
    mileage: "0 miles",
    engine: "5.0L V8 Twin-Turbo",
    horsepower: "1,600 HP",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop"
    ],
    description: "The ultimate track-focused hypercar engineered for absolute speed and precision.",
    features: ["Active Aerodynamics", "9-Speed Transmission", "Carbon Fiber", "Track Package"],
    exclusive: true
  },
  {
    id: 5,
    name: "Pagani Huayra Roadster",
    year: 2023,
    price: "$3,400,000",
    status: "available",
    category: "hypercar",
    location: "Milan",
    mileage: "89 miles",
    engine: "6.0L V12 Twin-Turbo",
    horsepower: "764 HP",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop"
    ],
    description: "Italian artistry meets cutting-edge engineering in this open-top masterpiece.",
    features: ["Removable Roof", "Handcrafted Interior", "Titanium Exhaust", "Bespoke Design"],
    exclusive: true
  },
  {
    id: 6,
    name: "Rolls-Royce Phantom",
    year: 2023,
    price: "$460,000",
    status: "available",
    category: "luxury",
    location: "London",
    mileage: "1,234 miles",
    engine: "6.75L V12",
    horsepower: "563 HP",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop"
    ],
    description: "The ultimate expression of luxury motoring, handcrafted to perfection.",
    features: ["Starlight Headliner", "Lamb's Wool Carpets", "Spirit of Ecstasy", "Magic Carpet Ride"],
    exclusive: false
  }
];

const comingSoonCars = [
  {
    id: 7,
    name: "Rimac Nevera R",
    year: 2025,
    category: "electric",
    location: "Zagreb",
    engine: "Electric Quad-Motor",
    horsepower: "2,107 HP",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=500&fit=crop",
    description: "The most powerful electric hypercar ever created, redefining performance standards.",
    features: ["All-Wheel Drive", "1.9s 0-60mph", "412km/h Top Speed", "120kWh Battery"],
    releaseDate: "Q2 2025"
  },
  {
    id: 8,
    name: "Gordon Murray T.50s",
    year: 2025,
    category: "track",
    location: "Surrey",
    engine: "3.9L V12 NA",
    horsepower: "711 HP",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    description: "The purest driving experience ever created, inspired by the legendary McLaren F1.",
    features: ["Fan Car Technology", "Manual Transmission", "Central Driving Position", "Sub-1000kg"],
    releaseDate: "Q3 2025"
  }
];

export default function PrivateCatalogPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState(luxuryCars);

  useEffect(() => {
    let filtered = luxuryCars;
    
    if (activeFilter !== "all") {
      filtered = filtered.filter(car => car.category === activeFilter || car.status === activeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery)
      );
    }
    
    setFilteredCars(filtered);
  }, [activeFilter, searchQuery]);

  const openModal = (car: any) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Cinematic Header */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-black-pure via-black-rich to-black-soft overflow-hidden luxury-spotlight">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="badge-exclusive mb-8">
              <Crown className="w-4 h-4 mr-2" />
              MEMBERS ONLY
              <Diamond className="w-4 h-4 ml-2" />
            </div>
            
            <h1 className="text-luxury text-center mb-8">
              PRIVATE CATALOG
            </h1>
            
            <div className="divider-gold max-w-2xl mx-auto mb-12"></div>
            
            <p className="text-subtitle max-w-3xl mx-auto mb-8">
              CURATED COLLECTION OF AUTOMOTIVE LEGENDS
            </p>
            
            <p className="text-premium text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
              Discover the world's most exclusive supercars, hypercars, and vintage classics. 
              Each vehicle undergoes rigorous authentication and provenance verification.
            </p>
          </div>
        </div>
        
        {/* Luxury Corner Accents */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-medium/20"></div>
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gold-medium/20"></div>
      </section>

      {/* Premium Filters & Search */}
      <section className="py-16 px-4 bg-gradient-to-br from-black-soft to-black-rich">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
            {/* Filter Tabs */}
            <div className="filter-tabs">
              {["all", "hypercar", "classic", "luxury", "available", "sold"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
                >
                  {filter.replace("-", " ")}
                </button>
              ))}
            </div>
            
            {/* Luxury Search */}
            <div className="luxury-search">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search exclusive collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Collection Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center animate-exclusive-entrance">
              <div className="text-gold-medium font-display text-3xl mb-2">{filteredCars.length}</div>
              <div className="text-caption text-white-soft">AVAILABLE NOW</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.1s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">{luxuryCars.filter(car => car.exclusive).length}</div>
              <div className="text-caption text-white-soft">EXCLUSIVE PIECES</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.2s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">{comingSoonCars.length}</div>
              <div className="text-caption text-white-soft">COMING SOON</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.3s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">24/7</div>
              <div className="text-caption text-white-soft">CONCIERGE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Car Gallery */}
      <section className="py-24 px-4 bg-gradient-to-br from-black-rich to-black-pure">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <div 
                key={car.id}
                className="car-card-premium luxury-hover animate-car-reveal cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(car)}
              >
                {/* Car Image */}
                <div className="car-image-container">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                  />
                  <div className="car-image-overlay"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`status-${car.status}`}>
                      {car.status.replace("-", " ")}
                    </span>
                  </div>
                  
                  {/* Exclusive Badge */}
                  {car.exclusive && (
                    <div className="absolute top-4 right-4">
                      <div className="badge-exclusive">
                        <Crown className="w-3 h-3 mr-1" />
                        EXCLUSIVE
                      </div>
                    </div>
                  )}
                  
                  {/* View Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="btn-luxury-outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
                
                {/* Car Details */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl text-gold-medium">
                      {car.name}
                    </h3>
                    <span className="text-caption text-gold-light">
                      {car.year}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-white-soft font-body text-sm">Price</span>
                      <span className="text-gold-medium font-display text-lg">
                        {car.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white-soft font-body text-sm">Location</span>
                      <span className="text-white-soft text-sm flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {car.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white-soft font-body text-sm">Mileage</span>
                      <span className="text-white-soft text-sm flex items-center">
                        <Gauge className="w-3 h-3 mr-1" />
                        {car.mileage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="divider-gold"></div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-caption text-gold-medium">
                      {car.horsepower}
                    </span>
                    <Button className="btn-luxury-outline group">
                      <Crown className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Inquire Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-soft via-black-rich to-black-pure relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-caption text-gold-light mb-6 tracking-[0.3em]">
              EXCLUSIVE PREVIEWS
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gold-medium mb-6">
              Coming Soon
            </h2>
            <div className="divider-gold max-w-2xl mx-auto mb-8"></div>
            <p className="text-premium text-lg max-w-2xl mx-auto opacity-90">
              Be the first to discover our upcoming exclusive acquisitions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {comingSoonCars.map((car, index) => (
              <div 
                key={car.id}
                className="car-card-premium luxury-hover animate-exclusive-entrance"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="car-image-container">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                  />
                  <div className="car-image-overlay"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="status-coming-soon">
                      Coming Soon
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="badge-exclusive">
                      <Star className="w-3 h-3 mr-1" />
                      {car.releaseDate}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-2xl text-gold-medium">
                      {car.name}
                    </h3>
                    <span className="text-caption text-gold-light">
                      {car.year}
                    </span>
                  </div>
                  
                  <p className="text-white-soft font-body mb-6 leading-relaxed">
                    {car.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-caption text-gold-medium block mb-1">Engine</span>
                      <span className="text-white-soft text-sm">{car.engine}</span>
                    </div>
                    <div>
                      <span className="text-caption text-gold-medium block mb-1">Power</span>
                      <span className="text-white-soft text-sm">{car.horsepower}</span>
                    </div>
                  </div>
                  
                  <div className="divider-gold"></div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <Button className="btn-luxury group">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reserve Now
                    </Button>
                    <Button className="btn-luxury-outline group">
                      <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Modal */}
      {selectedCar && (
        <div className={`luxury-modal ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
          <div 
            className="luxury-modal-content p-0 max-w-4xl" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedCar.gallery[0]}
                alt={selectedCar.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm border border-gold-medium/30 text-gold-medium hover:text-gold-light hover:border-gold-light transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-6 left-6">
                <h2 className="font-display text-3xl text-gold-medium mb-2">
                  {selectedCar.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-caption text-gold-light">
                    {selectedCar.year}
                  </span>
                  <span className={`status-${selectedCar.status}`}>
                    {selectedCar.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-xl text-gold-medium mb-4">
                      Description
                    </h3>
                    <p className="text-white-soft font-body leading-relaxed text-sm">
                      {selectedCar.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-gold-medium mb-4">
                      Features
                    </h3>
                    <ul className="space-y-3">
                      {selectedCar.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start text-white-soft">
                          <Crown className="w-4 h-4 text-gold-medium mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="luxury-glass p-6">
                    <h3 className="font-display text-xl text-gold-medium mb-6">
                      Specifications
                    </h3>
                    
                    <div className="space-y-5">
                      <div className="flex justify-between items-center py-2 border-b border-gold-medium/10">
                        <span className="text-white-soft text-sm font-medium">Price</span>
                        <span className="text-gold-medium font-display text-lg">{selectedCar.price}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gold-medium/10">
                        <span className="text-white-soft text-sm font-medium">Engine</span>
                        <span className="text-white-soft text-sm font-mono text-right max-w-[150px]">{selectedCar.engine}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gold-medium/10">
                        <span className="text-white-soft text-sm font-medium">Power</span>
                        <span className="text-white-soft text-sm font-mono">{selectedCar.horsepower}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gold-medium/10">
                        <span className="text-white-soft text-sm font-medium">Mileage</span>
                        <span className="text-white-soft text-sm font-mono">{selectedCar.mileage}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-white-soft text-sm font-medium">Location</span>
                        <span className="text-white-soft text-sm font-mono">{selectedCar.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <div className="text-center">
                      <a 
                        href="/schedule-viewing" 
                        className="inline-block w-full"
                      >
                        <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black px-6 py-4 font-semibold uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-3">
                          <Crown className="w-5 h-5" />
                          Schedule Private Viewing
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </a>
                    </div>
                    
                    <div className="text-center">
                      <a 
                        href="/virtual-tour" 
                        className="inline-block w-full"
                      >
                        <button className="w-full bg-transparent border-2 border-yellow-600 text-yellow-600 px-6 py-4 font-semibold uppercase tracking-wider hover:bg-yellow-600 hover:text-black transition-all duration-300 flex items-center justify-center gap-3">
                          <Play className="w-5 h-5" />
                          Virtual Tour
                        </button>
                      </a>
                    </div>
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