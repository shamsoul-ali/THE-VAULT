"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signInWithEmail, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/marketplace";

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signInWithEmail(formData.email, formData.password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-6">Loading...</div>}>
      <div className="min-h-screen bg-black">
        <div className="relative pt-16 pb-12 px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Revura
          </Link>

          <h1 className="text-2xl font-light text-white mb-2">PRIVATE ACCESS</h1>
          <p className="text-white/70 text-sm font-light tracking-wide uppercase">
            Exclusive Members Only
          </p>

          <div className="mt-8 mb-4">
            <p className="text-white/60 text-sm font-light max-w-md mx-auto leading-relaxed">
              Enter your credentials to access our private catalog and exclusive auctions.
            </p>
          </div>
        </div>

        <section className="px-6 pb-12">
          <div className="max-w-sm mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>

                <h2 className="text-xl font-medium text-white mb-2">Member Login</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

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
                    placeholder="member@example.com"
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

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-white bg-white/10 border-white/30 rounded focus:ring-white/20 focus:ring-1"
                    />
                    <span className="ml-2 text-white/70 font-light">Remember me</span>
                  </label>

                  <Link href="/forgot-password" className="text-white/70 hover:text-white transition-colors font-light">
                    Forgot password?
                  </Link>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg.White/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-medium rounded-lg backdrop-blur transition-all duration-200"
                  >
                    {loading ? "Signing In..." : "Access Private Collection"}
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="text-center space-y-4">
                  <p className="text-white/60 text-sm font-light">Don't have an account?</p>

                  <Link href="/request-access">
                    <Button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur transition-all duration-200 border border-white/30">
                      Request Membership
                    </Button>
                  </Link>

                  <p className="text-white/50 text-xs font-light leading-relaxed">
                    All login attempts are secured with enterprise-grade encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}



