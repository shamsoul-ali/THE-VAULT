"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Users, Car, Crown, Lock, Star, Eye, Diamond } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">

        {/* Full Viewport Image Background */}
        <div className="absolute inset-0" style={{ zIndex: -2 }}>
          <Image
            src="/html/PDP04506.JPG"
            alt="Luxury Car Hero"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Image Overlay for text readability */}
        <div className="hero-video-overlay" style={{ zIndex: -1 }}></div>
        
        {/* Main Content - Left Aligned */}
        <div className="relative z-10 px-12 max-w-7xl w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Hero Title - Left Aligned */}
            <div className="space-y-6">
              <h1 className="text-hero text-2xl md:text-3xl lg:text-4xl font-bold">
                Where Performance<br/>
                Meets Presence
              </h1>
            </div>

            {/* Subtitle - Left Aligned */}
            <div className="space-y-6">
              <h2 className="text-black text-xs md:text-sm tracking-widest font-light">
                LEGENDS MEET LEGACY
              </h2>
            </div>
            
          </div>
        </div>
        
        {/* Luxury Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-luxury-pulse">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-px h-12 bg-gradient-to-b from-gold-medium/60 to-transparent"></div>
            <div className="w-2 h-2 bg-gold-medium rounded-full animate-bounce"></div>
          </div>
        </div>
        
        {/* Cinematic Side Accents */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
      </section>

      {/* Premium Features Section - Godfather Elegance */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-soft to-black-rich relative overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="text-caption text-gold-light mb-6 tracking-[0.3em]">
              UNCOMPROMISING EXCELLENCE
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gold-medium mb-6">
              The Art of Exclusivity
            </h2>
            <div className="divider-gold max-w-2xl mx-auto"></div>
          </div>
          
          {/* Premium Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury-premium luxury-hover text-center p-8 animate-car-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Shield className="w-10 h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Crown className="w-3 h-3 mr-1" />
                EXCLUSIVE
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-4">
                Private Access
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                By invitation only. Each member undergoes rigorous verification 
                ensuring our community maintains the highest standards of discretion and prestige.
              </p>
              
              <div className="text-caption text-gold-light">
                INVITATION REQUIRED
              </div>
            </div>
            
            <div className="card-luxury-premium luxury-hover text-center p-8 animate-car-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Car className="w-10 h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Diamond className="w-3 h-3 mr-1" />
                MUSEUM GRADE
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-4">
                Curated Masterpieces
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                Each vehicle represents automotive artistry at its pinnacle. 
                Documented provenance, pristine condition, and historical significance guaranteed.
              </p>
              
              <div className="text-caption text-gold-light">
                AUTHENTICATED LEGENDS
              </div>
            </div>
            
            <div className="card-luxury-premium luxury-hover text-center p-8 animate-car-reveal" style={{ animationDelay: '0.5s' }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Users className="w-10 h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Star className="w-3 h-3 mr-1" />
                GLOBAL ELITE
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-4">
                Worldwide Network
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                Connect with fellow connoisseurs across continents. 
                Our private network spans luxury capitals, ensuring global reach with local expertise.
              </p>
              
              <div className="text-caption text-gold-light">
                50+ COUNTRIES
              </div>
            </div>
          </div>
          
          {/* Premium Statistics */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.7s' }}>
              <div className="text-gold-medium font-display text-4xl mb-2">98%</div>
              <div className="text-caption text-white-soft">SATISFACTION RATE</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.8s' }}>
              <div className="text-gold-medium font-display text-4xl mb-2">24/7</div>
              <div className="text-caption text-white-soft">CONCIERGE SERVICE</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.9s' }}>
              <div className="text-gold-medium font-display text-4xl mb-2">72H</div>
              <div className="text-caption text-white-soft">DELIVERY GUARANTEE</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '1.0s' }}>
              <div className="text-gold-medium font-display text-4xl mb-2">100%</div>
              <div className="text-caption text-white-soft">AUTHENTICITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* View Marketplace Button Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-black-rich to-black-soft relative">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/marketplace">
            <Button className="btn-luxury text-lg px-12 py-6 group animate-premium-glow">
              <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              View Marketplace
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
