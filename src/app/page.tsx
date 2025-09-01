"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Users, Car, Crown, Lock, Star, Eye, Diamond } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Ensure video plays and handle loading states
    const video = document.querySelector('.hero-video-background') as HTMLVideoElement;
    
    if (video) {
      // Video event handlers
      const handleCanPlay = () => {
        console.log('Video can play');
        // Video should be visible from start
      };
      
      const handleLoadStart = () => {
        console.log('Video load started');
      };
      
      const handleError = (e: any) => {
        console.error('Video failed to load:', e);
      };
      
      // Add event listeners
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('error', handleError);
      
      // Force play the video with multiple attempts
      const playVideo = async () => {
        try {
          video.currentTime = 0;
          await video.play();
          console.log('Video started playing successfully');
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      
      // Multiple play attempts
      playVideo();
      setTimeout(playVideo, 100);
      setTimeout(playVideo, 500);
      setTimeout(playVideo, 1000);
      
      // Ensure video is visible
      video.style.display = 'block';
      video.style.visibility = 'visible';
      
      // Cleanup
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        {/* Fallback Background - Temporarily disabled */}
        {/* <div 
          className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-neutral-900 transition-opacity duration-1000" 
          style={{ zIndex: -3, opacity: 0.05 }}
        ></div> */}
        
        {/* Cinematic Video Background */}
        <video 
          className="hero-video-background" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          style={{ zIndex: -2 }}
          onLoadStart={() => console.log('Video element loadstart')}
          onCanPlay={() => console.log('Video element canplay')}
          onError={(e) => console.error('Video element error:', e)}
          onLoadedData={() => console.log('Video data loaded')}
        >
          <source src="/html/The new Porsche 911 Exterior  Interior Design.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for text readability */}
        <div className="hero-video-overlay" style={{ zIndex: -1 }}></div>
        
        {/* Main Content - Left Aligned */}
        <div className="relative z-10 px-12 max-w-7xl w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Hero Title - Left Aligned */}
            <div className="space-y-6">
              <h1 className="text-hero">
                The Ultimate<br/>
                Luxury Car
              </h1>
            </div>
            
            {/* Subtitle - Left Aligned */}
            <div className="space-y-6">
              <h2 className="text-subtitle">
                WHERE LEGENDS MEET LEGACY
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-xl font-light">
                Exclusive invitation-only auctions featuring the world's most coveted supercars, 
                hypercars, and automotive masterpieces.
              </p>
            </div>
            
          </div>
        </div>
        
        {/* Luxury Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-luxury-pulse">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-caption text-gold-medium/70">EXPLORE</div>
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

      {/* Premium CTA Section - James Bond Style */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-rich via-black-pure to-black-rich relative overflow-hidden">
        {/* Cinematic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-medium/5 via-transparent to-gold-medium/5" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-medium/10 rounded-full blur-3xl animate-luxury-pulse" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="animate-exclusive-entrance">
            {/* Premium Badge */}
            <div className="inline-flex items-center mb-8">
              <div className="badge-exclusive text-lg px-6 py-3">
                <Lock className="w-5 h-5 mr-2" />
                MEMBERSHIP REQUIRED
                <Crown className="w-5 h-5 ml-2" />
              </div>
            </div>
            
            {/* Dramatic Headline */}
            <h2 className="font-display text-5xl md:text-7xl text-gold-medium mb-8 animate-gold-shimmer">
              ACCESS RESTRICTED
            </h2>
            
            <div className="divider-gold max-w-xl mx-auto mb-12"></div>
            
            {/* Sophisticated Copy */}
            <div className="mb-16 space-y-6">
              <p className="text-subtitle text-center max-w-3xl mx-auto leading-relaxed">
                THE WORLD'S MOST EXCLUSIVE AUTOMOTIVE SOCIETY
              </p>
              <p className="text-premium text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
                Join an elite circle of collectors, enthusiasts, and connoisseurs. 
                Access our private catalog of automotive legends and secure your legacy.
              </p>
            </div>
            
            {/* Premium Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="/request-access">
                <Button className="btn-luxury group text-lg px-8 py-4 animate-premium-glow">
                  <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Begin Membership Application
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/schedule-viewing">
                <Button className="btn-luxury-outline group text-lg px-8 py-4">
                  <Eye className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Schedule Private Tour
                </Button>
              </a>
            </div>
            
            {/* Exclusivity Notice */}
            <div className="text-caption text-gold-medium/70 max-w-lg mx-auto leading-relaxed">
              By application only. Membership subject to approval by our selection committee. 
              All transactions are conducted with the utmost discretion and privacy.
            </div>
          </div>
        </div>
        
        {/* Luxury Corner Accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold-medium/30"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold-medium/30"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold-medium/30"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold-medium/30"></div>
      </section>

    </div>
  );
}
