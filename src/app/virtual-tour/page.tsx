"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Crown, Diamond, Eye, Camera, Star, Navigation } from "lucide-react";
import Link from "next/link";

export default function VirtualTourPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentView, setCurrentView] = useState("exterior");

  const tourViews = [
    { id: "exterior", name: "Exterior", icon: Camera },
    { id: "interior", name: "Interior", icon: Eye },
    { id: "engine", name: "Engine Bay", icon: Star },
    { id: "details", name: "Details", icon: Diamond }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-black-rich to-black-soft pt-20">
      {/* Premium Header */}
      <section className="py-16 px-4 bg-gradient-to-br from-black-soft to-black-rich relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/private-catalog" 
              className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 font-body text-sm uppercase tracking-widest group"
            >
              <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Catalog
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="badge-exclusive">
              <Play className="w-4 h-4 mr-2" />
              VIRTUAL TOUR
              <Crown className="w-4 h-4 ml-2" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl text-gold-medium mb-4">
              Virtual Showroom Tour
            </h1>
            <p className="text-premium text-lg max-w-2xl mx-auto opacity-90">
              Experience our exclusive collection from the comfort of your home
            </p>
          </div>
        </div>
      </section>

      {/* Virtual Tour Player */}
      <section className="py-8 px-4 bg-gradient-to-br from-black-rich to-black-pure">
        <div className="max-w-7xl mx-auto">
          <div className="card-luxury-premium overflow-hidden">
            {/* Tour Video/Image Container */}
            <div className="relative aspect-video bg-black-pure rounded-t-lg overflow-hidden">
              {/* Placeholder for virtual tour video/360 viewer */}
              <div className="absolute inset-0 bg-gradient-to-br from-black-pure via-black-rich to-black-soft flex items-center justify-center">
                <div className="text-center max-w-3xl px-12">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-gold-light to-gold-medium rounded-full mx-auto flex items-center justify-center shadow-2xl mb-8 animate-premium-glow">
                      <Play className="w-12 h-12 text-black-rich ml-1" />
                    </div>
                    <div className="absolute -inset-4 bg-gold-medium/10 rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-display text-3xl text-gold-medium mb-4">
                      Premium Virtual Experience
                    </h3>
                    <div className="w-24 h-px bg-gradient-to-r from-gold-light to-gold-medium mx-auto mb-6"></div>
                    <p className="text-white-soft text-base leading-relaxed max-w-2xl mx-auto">
                      Immerse yourself in a cinematic 360° tour featuring ultra-high-definition imagery, 
                      professional automotive commentary, and interactive hotspots that reveal every detail.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="btn-luxury group px-8 py-4 text-base"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-3 h-5 w-5" />
                        <span>Pause Experience</span>
                      </>
                    ) : (
                      <>
                        <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span>Begin Virtual Tour</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Tour Controls Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="luxury-glass border border-gold-medium/30 text-gold-medium hover:text-gold-light hover:border-gold-medium/60 p-3 rounded-full transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </Button>
                  
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className="luxury-glass border border-gold-medium/30 text-gold-medium hover:text-gold-light hover:border-gold-medium/60 p-3 rounded-full transition-all duration-300"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>
                
                <Button className="luxury-glass border border-gold-medium/30 text-gold-medium hover:text-gold-light hover:border-gold-medium/60 p-3 rounded-full transition-all duration-300">
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Tour Navigation */}
            <div className="px-8 py-12 bg-gradient-to-br from-black-soft to-black-rich">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-medium"></div>
                  <Navigation className="w-5 h-5 text-gold-medium" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-medium"></div>
                </div>
                <h3 className="font-display text-2xl text-gold-medium mb-2">Explore Every Angle</h3>
                <p className="text-white-soft/80 text-sm">Select your preferred view to begin the virtual experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {tourViews.map((view, index) => {
                  const IconComponent = view.icon;
                  return (
                    <div
                      key={view.id}
                      className={`luxury-glass rounded-lg p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 group animate-exclusive-entrance ${
                        currentView === view.id
                          ? "border-2 border-gold-medium bg-gradient-to-br from-gold-medium/10 to-gold-dark/5"
                          : "border border-gold-medium/30 hover:border-gold-medium/60"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setCurrentView(view.id)}
                    >
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                            currentView === view.id
                              ? "bg-gradient-to-br from-gold-light to-gold-medium text-black-rich"
                              : "bg-gradient-to-br from-black-rich to-black-pure text-gold-medium group-hover:from-gold-medium/20 group-hover:to-gold-dark/20"
                          }`}>
                            <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          {currentView === view.id && (
                            <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl animate-premium-glow"></div>
                          )}
                        </div>
                        
                        <h4 className={`font-display text-lg mb-2 transition-colors duration-300 ${
                          currentView === view.id ? "text-gold-light" : "text-white-soft group-hover:text-gold-light"
                        }`}>
                          {view.name}
                        </h4>
                        
                        <div className={`w-8 h-px mx-auto transition-all duration-300 ${
                          currentView === view.id 
                            ? "bg-gradient-to-r from-gold-light to-gold-medium" 
                            : "bg-gradient-to-r from-transparent via-gold-medium/50 to-transparent group-hover:via-gold-medium"
                        }`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Information */}
      <section className="py-16 px-4 bg-gradient-to-br from-black-soft to-black-rich">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-luxury p-8">
              <h3 className="font-display text-2xl text-gold-medium mb-6 flex items-center">
                <Star className="w-6 h-6 mr-3" />
                Premium Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Crown className="w-5 h-5 text-gold-medium mt-1" />
                  <div>
                    <h4 className="text-white-soft font-display mb-1">360° High-Resolution Views</h4>
                    <p className="text-white-soft/70 text-sm">Explore every angle in stunning 4K detail</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Diamond className="w-5 h-5 text-gold-medium mt-1" />
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Expert Commentary</h4>
                    <p className="text-white-soft/70 text-sm">Professional narration by automotive specialists</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-gold-medium mt-1" />
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Interactive Hotspots</h4>
                    <p className="text-white-soft/70 text-sm">Click to discover detailed specifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-gold-medium mt-1" />
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Multiple Perspectives</h4>
                    <p className="text-white-soft/70 text-sm">Interior, exterior, engine bay, and detail shots</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-8">
              <h3 className="font-display text-2xl text-gold-medium mb-6 flex items-center">
                <Play className="w-6 h-6 mr-3" />
                How It Works
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gold-medium text-black-rich rounded-full flex items-center justify-center font-display text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Choose Your View</h4>
                    <p className="text-white-soft/70 text-sm">Select from exterior, interior, engine, or detail views</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gold-medium text-black-rich rounded-full flex items-center justify-center font-display text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Navigate Freely</h4>
                    <p className="text-white-soft/70 text-sm">Use mouse or touch to explore 360° environments</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gold-medium text-black-rich rounded-full flex items-center justify-center font-display text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-white-soft font-display mb-1">Discover Details</h4>
                    <p className="text-white-soft/70 text-sm">Click hotspots for detailed information and specifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-black-pure to-black-rich">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge-exclusive mb-8">
            <Crown className="w-4 h-4 mr-2" />
            EXPERIENCE MORE
          </div>
          
          <h2 className="font-display text-4xl text-gold-medium mb-6">
            Ready for a Private Viewing?
          </h2>
          
          <p className="text-premium text-lg max-w-2xl mx-auto mb-12 opacity-90">
            Nothing compares to experiencing these automotive masterpieces in person. 
            Schedule your exclusive appointment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/schedule-viewing">
              <Button className="btn-luxury group text-lg px-8 py-4">
                <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Schedule Private Viewing
              </Button>
            </Link>
            <Link href="/private-catalog">
              <Button className="btn-luxury-outline group text-lg px-8 py-4">
                <Eye className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}