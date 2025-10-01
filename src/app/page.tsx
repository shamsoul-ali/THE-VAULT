"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Users, Car, Crown, Lock, Star, Eye, Diamond } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export default function HomePage() {
  const section1 = useScrollAnimation();
  const card1 = useScrollAnimation();
  const card2 = useScrollAnimation();
  const stats = useScrollAnimation();
  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-start md:items-center justify-start overflow-hidden">

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
        <div className="relative z-10 px-4 sm:px-8 md:px-12 max-w-7xl w-full pt-24 md:pt-0">
          <div className="max-w-2xl space-y-4 md:space-y-6">

            {/* Hero Title - Top Left on Mobile */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Where Performance<br/>
                Meets Presence
              </h1>

              {/* Subtitle - Below Title on Mobile */}
              <h2 className="text-white text-[0.65rem] md:text-xs tracking-widest font-light">
                LEGENDS MEET LEGACY
              </h2>
            </div>

          </div>
        </div>

        {/* Luxury Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-luxury-pulse">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-px h-12 bg-gradient-to-b from-gold-medium/60 to-transparent"></div>
            <div className="w-2 h-2 bg-gold-medium rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Cinematic Side Accents */}
        <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
      </section>

      {/* Premium Features Section - Godfather Elegance */}
      <section className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-br from-black-soft to-black-rich relative overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div
            ref={section1.ref}
            className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${
              section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-caption text-gold-light mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.3em]">
              UNCOMPROMISING EXCELLENCE
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gold-medium mb-4 md:mb-6">
              The Art of Exclusivity
            </h2>
            <div className="divider-gold max-w-2xl mx-auto"></div>
          </div>

          {/* Premium Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div
              ref={card1.ref}
              className={`card-luxury-premium luxury-hover text-center p-6 md:p-8 transition-all duration-1000 delay-200 ${
                card1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Car className="w-8 h-8 md:w-10 md:h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>

              <div className="badge-exclusive mb-4 md:mb-6">
                <Diamond className="w-3 h-3 mr-1" />
                MUSEUM GRADE
              </div>

              <h3 className="font-display text-xl md:text-2xl text-gold-medium mb-3 md:mb-4">
                Curated Masterpieces
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Each vehicle represents automotive artistry at its pinnacle.
                Documented provenance, pristine condition, and historical significance guaranteed.
              </p>

              <div className="text-caption text-gold-light">
                AUTHENTICATED LEGENDS
              </div>
            </div>

            <div
              ref={card2.ref}
              className={`card-luxury-premium luxury-hover text-center p-6 md:p-8 transition-all duration-1000 delay-400 ${
                card2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative mb-6 md:mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>

              <div className="badge-exclusive mb-4 md:mb-6">
                <Star className="w-3 h-3 mr-1" />
                GLOBAL ELITE
              </div>

              <h3 className="font-display text-xl md:text-2xl text-gold-medium mb-3 md:mb-4">
                Worldwide Network
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Connect with fellow connoisseurs across continents.
                Our private network spans luxury capitals, ensuring global reach with local expertise.
              </p>

              <div className="text-caption text-gold-light">
                50+ COUNTRIES
              </div>
            </div>
          </div>

          {/* Premium Statistics */}
          <div
            ref={stats.ref}
            className={`mt-16 md:mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 transition-all duration-1000 ${
              stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center">
              <div className="text-gold-medium font-display text-3xl md:text-4xl mb-2">98%</div>
              <div className="text-caption text-white-soft text-xs md:text-sm">SATISFACTION RATE</div>
            </div>
            <div className="text-center">
              <div className="text-gold-medium font-display text-3xl md:text-4xl mb-2">24/7</div>
              <div className="text-caption text-white-soft text-xs md:text-sm">CONCIERGE SERVICE</div>
            </div>
            <div className="text-center">
              <div className="text-gold-medium font-display text-3xl md:text-4xl mb-2">72H</div>
              <div className="text-caption text-white-soft text-xs md:text-sm">DELIVERY GUARANTEE</div>
            </div>
            <div className="text-center">
              <div className="text-gold-medium font-display text-3xl md:text-4xl mb-2">100%</div>
              <div className="text-caption text-white-soft text-xs md:text-sm">AUTHENTICITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* View Marketplace Button Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-black-rich to-black-soft relative">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/marketplace">
            <Button className="btn-luxury text-base md:text-lg px-8 py-4 md:px-12 md:py-6 group animate-premium-glow">
              <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
              View Marketplace
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
