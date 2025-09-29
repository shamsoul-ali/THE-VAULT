"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { signUpWithEmail, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/marketplace');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    const { error } = await signUpWithEmail(formData.email, formData.password, formData.fullName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-sm mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <h2 className="text-2xl font-medium text-white mb-4">
              Welcome to Revura!
            </h2>

            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Your account has been created successfully. Please check your email to verify your account before signing in.
            </p>

            <Link href="/login">
              <Button className="w-full p-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg backdrop-blur transition-all duration-200">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Navigation Section */}
      <div className="relative pt-16 pb-12 px-6 text-center">
        <Link href="/" className="inline-flex items-center text-white hover:text-white/70 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Revura
        </Link>

        <h1 className="text-2xl font-light text-white mb-2">JOIN THE ELITE</h1>
        <p className="text-white/70 text-sm font-light tracking-wide uppercase">Create Your Account</p>

        <div className="mt-8 mb-4">
          <p className="text-white/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            Join our exclusive community of luxury car enthusiasts and collectors.
          </p>
        </div>
      </div>

      {/* Signup Form Section */}
      <section className="px-6 pb-12">
        <div className="max-w-sm mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>

              <h2 className="text-xl font-medium text-white mb-2">
                Create Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="fullName" className="text-white/80 text-sm font-light mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/10 border border-white/30 text-white font-light focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-200 rounded-lg backdrop-blur"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white/80 text-sm font-light mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/10 border border-white/30 text-white font-light focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-200 rounded-lg backdrop-blur"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white/80 text-sm font-light mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white/10 border border-white/30 text-white font-light focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-200 rounded-lg backdrop-blur pr-10"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white/80 text-sm font-light mb-2 block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white/10 border border-white/30 text-white font-light focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-200 rounded-lg backdrop-blur pr-10"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-white bg-white/10 border-white/30 rounded focus:ring-white/20 focus:ring-1 mt-1"
                />
                <label htmlFor="agreeToTerms" className="text-white/70 text-sm font-light leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-white hover:text-white/80 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-white hover:text-white/80 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full p-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-medium rounded-lg backdrop-blur transition-all duration-200"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-sm font-light mb-4">
                  Already have an account?
                </p>

                <Link href="/login">
                  <Button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur transition-all duration-200 border border-white/30">
                    Sign In Instead
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