"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, MapPin, Clock, Crown, Diamond, Shield, CheckCircle, User, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ScheduleViewingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    location: "monaco",
    vehicleInterest: "",
    specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Viewing scheduled:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-pure via-black-rich to-black-soft pt-20 luxury-spotlight">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 py-32 text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="mb-12">
              <Link 
                href="/private-catalog" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Return to Catalog
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            
            {/* Premium Success Icon */}
            <div className="relative mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl animate-premium-glow">
                <CheckCircle className="w-16 h-16 text-black-rich -rotate-45" />
              </div>
              <div className="absolute -inset-4 bg-gold-medium/20 rounded-full blur-3xl opacity-60"></div>
            </div>
            
            {/* Exclusive Badge */}
            <div className="badge-exclusive mb-8 text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              VIEWING SCHEDULED
              <Diamond className="w-5 h-5 ml-2" />
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl text-gold-medium mb-8 animate-gold-shimmer">
              Appointment Confirmed
            </h1>
            
            <div className="divider-gold max-w-xl mx-auto mb-12"></div>
            
            <p className="text-subtitle mb-8 max-w-2xl mx-auto leading-relaxed">
              Your Private Viewing Has Been Successfully Scheduled
            </p>
            
            <p className="text-premium text-lg max-w-xl mx-auto opacity-90 mb-16 leading-relaxed">
              Our concierge team will contact you within 24 hours to confirm the details 
              and arrange your exclusive viewing experience.
            </p>
            
            {/* Premium Status Card */}
            <div className="card-luxury-premium p-8 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-gold-medium mb-6">
                <Shield className="w-6 h-6" />
                <span className="font-display text-xl tracking-wider">VIEWING DETAILS</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Contact</span>
                  <span className="text-gold-medium font-display">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Preferred Date</span>
                  <span className="text-gold-medium font-display">{formData.preferredDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Preferred Time</span>
                  <span className="text-gold-medium font-display">{formData.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Location</span>
                  <span className="text-gold-medium font-display">{formData.location.charAt(0).toUpperCase() + formData.location.slice(1)}</span>
                </div>
              </div>
              
              <div className="divider-gold my-6"></div>
              
              <p className="text-caption text-gold-medium/70 leading-relaxed">
                A premium concierge will personally guide you through our exclusive collection. 
                All viewings include champagne service and detailed provenance documentation.
              </p>
            </div>
            
            {/* Premium Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/private-catalog">
                <Button className="btn-luxury group">
                  <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Continue Browsing
                </Button>
              </Link>
              <Button className="btn-luxury-outline group">
                <Calendar className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-black-rich to-black-soft pt-20">
      {/* Cinematic Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-black-pure via-black-rich to-black-soft overflow-hidden luxury-spotlight">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="mb-16">
              <Link 
                href="/private-catalog" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Return to Catalog
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Exclusive Badge */}
              <div className="badge-exclusive mb-8 text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                PRIVATE VIEWING
                <Crown className="w-5 h-5 ml-2" />
              </div>
              
              <h1 className="text-luxury text-center mb-8">
                SCHEDULE VIEWING
              </h1>
              
              <div className="divider-gold max-w-2xl mx-auto mb-12"></div>
              
              <p className="text-subtitle max-w-3xl mx-auto mb-8 leading-relaxed">
                EXCLUSIVE ONE-ON-ONE VIEWING EXPERIENCE
              </p>
              
              <p className="text-premium text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
                Schedule a private appointment to view our most exclusive vehicles 
                with personal concierge service and champagne reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Form Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-soft to-black-rich relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="card-luxury-premium p-12">
            <div className="text-center mb-12 animate-exclusive-entrance">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Calendar className="w-10 h-10 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl text-gold-medium mb-4">
                Schedule Private Viewing
              </h2>
              <div className="divider-gold max-w-sm mx-auto mb-4"></div>
              <p className="text-premium opacity-90">
                Book your exclusive appointment with our concierge team
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-display text-xl text-gold-medium mb-6 flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Viewing Preferences */}
              <div>
                <h3 className="font-display text-xl text-gold-medium mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  Viewing Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 bg-black-rich border border-gold-medium/30 text-white-pure rounded focus:border-gold-light focus:ring-2 focus:ring-gold-medium/20"
                    >
                      <option value="">Select time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Preferred Location *</Label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 bg-black-rich border border-gold-medium/30 text-white-pure rounded focus:border-gold-light focus:ring-2 focus:ring-gold-medium/20"
                >
                  <option value="monaco">Monaco Showroom</option>
                  <option value="london">London Showroom</option>
                  <option value="geneva">Geneva Showroom</option>
                  <option value="dubai">Dubai Showroom</option>
                  <option value="beverly-hills">Beverly Hills Showroom</option>
                </select>
              </div>

              <div>
                <Label htmlFor="vehicleInterest">Vehicle of Interest</Label>
                <Input
                  id="vehicleInterest"
                  name="vehicleInterest"
                  value={formData.vehicleInterest}
                  onChange={handleChange}
                  placeholder="e.g., Ferrari 250 GTO, Bugatti Chiron..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special arrangements or requirements for your viewing..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="pt-12">
                <Button type="submit" className="btn-luxury w-full text-lg py-6 group animate-premium-glow">
                  <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Schedule Private Viewing
                  <Calendar className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-12 pt-8">
              <div className="divider-gold mb-8"></div>
              <div className="text-center space-y-4">
                <div className="badge-exclusive">
                  <Shield className="w-3 h-3 mr-1" />
                  PREMIUM SERVICE
                </div>
                <p className="text-caption text-gold-medium/70 max-w-2xl mx-auto leading-relaxed">
                  All private viewings include champagne reception, detailed vehicle history, 
                  and personal consultation with our automotive specialists. 
                  Complimentary transportation available within city limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}