"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Shield, Clock, CheckCircle, Crown, Diamond, Star, Lock } from "lucide-react";
import Link from "next/link";

export default function RequestAccessPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    interests: "",
    experience: "",
    referral: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                href="/" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Return to Vault
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
              <Crown className="w-5 h-5 mr-2" />
              APPLICATION RECEIVED
              <Diamond className="w-5 h-5 ml-2" />
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl text-gold-medium mb-8 animate-gold-shimmer">
              Welcome to THE VAULT
            </h1>
            
            <div className="divider-gold max-w-xl mx-auto mb-12"></div>
            
            <p className="text-subtitle mb-8 max-w-2xl mx-auto leading-relaxed">
              Your Application Has Been Successfully Submitted
            </p>
            
            <p className="text-premium text-lg max-w-xl mx-auto opacity-90 mb-16 leading-relaxed">
              Thank you for your interest in joining our exclusive community. 
              Our concierge team will review your application with the utmost discretion.
            </p>
            
            {/* Premium Status Card */}
            <div className="card-luxury-premium p-8 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-gold-medium mb-6">
                <Clock className="w-6 h-6" />
                <span className="font-display text-xl tracking-wider">PROCESSING STATUS</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Review Period</span>
                  <span className="text-gold-medium font-display">48 Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Verification Process</span>
                  <span className="text-gold-medium font-display">2-3 Business Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white-soft font-body">Access Approval</span>
                  <span className="text-gold-medium font-display">Within 72 Hours</span>
                </div>
              </div>
              
              <div className="divider-gold my-6"></div>
              
              <p className="text-caption text-gold-medium/70 leading-relaxed">
                All applications undergo rigorous verification by our selection committee. 
                You will receive a personalized response via secure email with detailed next steps.
              </p>
            </div>
            
            {/* Premium Actions */}
            <div className="space-y-6">
              <div className="text-caption text-gold-medium/70 max-w-lg mx-auto leading-relaxed mb-8">
                Your application reference number and detailed instructions 
                have been sent to your registered email address.
              </div>
            </div>
          </div>
          
          {/* Luxury Corner Accents */}
          <div className="absolute top-12 left-12 w-20 h-20 border-l-2 border-t-2 border-gold-medium/30"></div>
          <div className="absolute top-12 right-12 w-20 h-20 border-r-2 border-t-2 border-gold-medium/30"></div>
          <div className="absolute bottom-12 left-12 w-20 h-20 border-l-2 border-b-2 border-gold-medium/30"></div>
          <div className="absolute bottom-12 right-12 w-20 h-20 border-r-2 border-b-2 border-gold-medium/30"></div>
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
          
          {/* Luxury pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23c8aa6e' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="mb-16">
              <Link 
                href="/" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Return to Vault
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Exclusive Badge */}
              <div className="badge-exclusive mb-8 text-lg px-8 py-4">
                <Shield className="w-5 h-5 mr-2" />
                MEMBERSHIP APPLICATION
                <Crown className="w-5 h-5 ml-2" />
              </div>
              
              <h1 className="text-luxury text-center mb-8">
                REQUEST ACCESS
              </h1>
              
              <div className="divider-gold max-w-2xl mx-auto mb-12"></div>
              
              <p className="text-subtitle max-w-3xl mx-auto mb-8 leading-relaxed">
                JOIN THE WORLD'S MOST EXCLUSIVE AUTOMOTIVE SOCIETY
              </p>
              
              <p className="text-premium text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
                Apply for membership to access our private catalog and participate 
                in invitation-only auctions featuring automotive legends.
              </p>
            </div>
          </div>
        </div>
        
        {/* Cinematic Side Accents */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold-medium to-transparent opacity-60"></div>
      </section>

      {/* Premium Form Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-soft to-black-rich relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-20" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-20" />
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="card-luxury-premium p-12">
            <div className="flex items-center justify-center gap-4 mb-12 animate-exclusive-entrance">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-gold-medium rounded-none flex items-center justify-center rotate-45 shadow-2xl">
                <Shield className="w-10 h-10 text-black-rich -rotate-45" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-gold-medium mb-2">
                  Membership Application
                </h2>
                <div className="divider-gold max-w-sm"></div>
                <p className="text-premium mt-4 opacity-90">
                  Complete your application for concierge review and verification
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position / Title</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="interests">Automotive Interests</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g., Classic cars, modern supercars, racing heritage, specific brands..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="experience">Collecting Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe your experience with collector vehicles, auctions, or automotive investments..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="referral">How did you hear about us?</Label>
                <Input
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  placeholder="e.g., Industry colleague, previous auction, online search..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="pt-12">
                <Button type="submit" className="btn-luxury w-full text-lg py-6 group animate-premium-glow">
                  <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Submit Exclusive Application
                  <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-12 pt-8">
              <div className="divider-gold mb-8"></div>
              <div className="text-center space-y-4">
                <div className="badge-exclusive">
                  <Lock className="w-3 h-3 mr-1" />
                  CONFIDENTIAL PROCESS
                </div>
                <p className="text-caption text-gold-medium/70 max-w-2xl mx-auto leading-relaxed">
                  All applications undergo rigorous review by our selection committee. 
                  We maintain the highest standards of discretion and confidentiality throughout the entire process.
                  Only qualified candidates will receive access to our exclusive catalog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-pure via-black-rich to-black-soft relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-30" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="text-caption text-gold-light mb-6 tracking-[0.3em]">
              EXCLUSIVE MEMBERSHIP PROCESS
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-gold-medium mb-8 animate-gold-shimmer">
              The Path to Exclusivity
            </h2>
            <div className="divider-gold max-w-2xl mx-auto mb-8"></div>
            <p className="text-premium text-lg max-w-2xl mx-auto opacity-90">
              Your journey to join the world's most exclusive automotive society
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="card-luxury-premium text-center p-10 luxury-hover animate-car-reveal">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <span className="font-display text-3xl text-black-rich -rotate-45">1</span>
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Crown className="w-3 h-3 mr-1" />
                STEP ONE
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-6">
                Submit Application
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                Complete our comprehensive membership form with your personal details, 
                automotive interests, and collecting experience.
              </p>
              
              <div className="text-caption text-gold-light">
                INSTANT CONFIRMATION
              </div>
            </div>
            
            <div className="card-luxury-premium text-center p-10 luxury-hover animate-car-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <span className="font-display text-3xl text-black-rich -rotate-45">2</span>
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Diamond className="w-3 h-3 mr-1" />
                STEP TWO
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-6">
                Concierge Review
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                Our elite selection committee evaluates your application and 
                conducts thorough background verification and reference checks.
              </p>
              
              <div className="text-caption text-gold-light">
                48-72 HOUR PROCESS
              </div>
            </div>
            
            <div className="card-luxury-premium text-center p-10 luxury-hover animate-car-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <span className="font-display text-3xl text-black-rich -rotate-45">3</span>
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <div className="badge-exclusive mb-6">
                <Star className="w-3 h-3 mr-1" />
                STEP THREE
              </div>
              
              <h3 className="font-display text-2xl text-gold-medium mb-6">
                Access Granted
              </h3>
              <p className="text-white-soft font-body leading-relaxed mb-6">
                Upon approval, receive exclusive credentials and private access to 
                our catalog, auctions, and global collector network.
              </p>
              
              <div className="text-caption text-gold-light">
                LIFETIME MEMBERSHIP
              </div>
            </div>
          </div>
          
          {/* Premium Statistics */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.6s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">5%</div>
              <div className="text-caption text-white-soft">ACCEPTANCE RATE</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.7s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">72H</div>
              <div className="text-caption text-white-soft">AVERAGE REVIEW</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.8s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">500+</div>
              <div className="text-caption text-white-soft">ACTIVE MEMBERS</div>
            </div>
            <div className="text-center animate-exclusive-entrance" style={{ animationDelay: '0.9s' }}>
              <div className="text-gold-medium font-display text-3xl mb-2">50</div>
              <div className="text-caption text-white-soft">COUNTRIES</div>
            </div>
          </div>
        </div>
        
        {/* Luxury Corner Accents */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gold-medium/20"></div>
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-gold-medium/20"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-gold-medium/20"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-gold-medium/20"></div>
      </section>
    </div>
  );
}
