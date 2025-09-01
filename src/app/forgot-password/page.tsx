"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Crown, Diamond, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Password reset requested for:", email);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-pure via-black-rich to-black-soft pt-20 luxury-spotlight">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-medium to-transparent opacity-40" />
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-32 text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="mb-12">
              <Link 
                href="/login" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Back to Login
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            
            {/* Premium Success Icon */}
            <div className="relative mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl animate-premium-glow">
                <CheckCircle className="w-12 h-12 text-black-rich -rotate-45" />
              </div>
              <div className="absolute -inset-4 bg-gold-medium/20 rounded-full blur-3xl opacity-60"></div>
            </div>
            
            {/* Exclusive Badge */}
            <div className="badge-exclusive mb-8 text-lg px-8 py-4">
              <Mail className="w-5 h-5 mr-2" />
              RESET LINK SENT
              <Diamond className="w-5 h-5 ml-2" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-gold-medium mb-8 animate-gold-shimmer">
              Check Your Email
            </h1>
            
            <div className="divider-gold max-w-xl mx-auto mb-12"></div>
            
            <p className="text-premium text-lg max-w-xl mx-auto opacity-90 mb-8 leading-relaxed">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            
            <p className="text-caption text-gold-medium/70 max-w-md mx-auto leading-relaxed">
              Please check your email and follow the secure link to reset your password. 
              If you don't receive it within 10 minutes, check your spam folder.
            </p>
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
        
        <div className="max-w-lg mx-auto text-center relative">
          <div className="animate-luxury-fade-in-up">
            <div className="mb-16">
              <Link 
                href="/login" 
                className="inline-flex items-center text-gold-medium hover:text-gold-light transition-all duration-500 mb-12 font-body text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Login
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Exclusive Badge */}
              <div className="badge-exclusive mb-8 text-lg px-8 py-4">
                <Shield className="w-5 h-5 mr-2" />
                PASSWORD RECOVERY
                <Crown className="w-5 h-5 ml-2" />
              </div>
              
              <h1 className="text-luxury text-center mb-8">
                FORGOT PASSWORD
              </h1>
              
              <div className="divider-gold max-w-sm mx-auto mb-12"></div>
              
              <p className="text-premium text-lg max-w-sm mx-auto opacity-90 leading-relaxed">
                Enter your email to receive secure reset instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Reset Form */}
      <section className="py-32 px-4 bg-gradient-to-br from-black-soft to-black-rich relative overflow-hidden">
        <div className="max-w-md mx-auto relative">
          <div className="card-luxury-premium p-10">
            <div className="text-center mb-8 animate-exclusive-entrance">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-light to-gold-medium rounded-none mx-auto flex items-center justify-center rotate-45 shadow-2xl">
                  <Mail className="w-8 h-8 text-black-rich -rotate-45" />
                </div>
                <div className="absolute -inset-2 bg-gold-medium/20 rounded-full blur-xl opacity-50"></div>
              </div>
              
              <h2 className="font-display text-xl text-gold-medium mb-4">
                Reset Your Password
              </h2>
              <p className="text-white-soft font-body text-sm">
                We'll send you a secure reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gold-medium font-body text-sm uppercase tracking-wider mb-3 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 bg-black-rich border-2 border-gold-medium/30 text-white-pure font-body focus:border-gold-light focus:ring-2 focus:ring-gold-medium/20 transition-all duration-300"
                  placeholder="member@example.com"
                />
              </div>

              <div className="pt-6">
                <Button type="submit" className="btn-luxury w-full text-lg py-4 group animate-premium-glow">
                  <Crown className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Send Reset Link
                  <Mail className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6">
              <div className="divider-gold mb-6"></div>
              <div className="text-center">
                <p className="text-caption text-gold-medium/70 text-sm leading-relaxed mb-4">
                  Remember your password?
                </p>
                
                <Link href="/login">
                  <Button className="btn-luxury-outline group">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}