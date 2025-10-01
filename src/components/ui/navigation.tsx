"use client";

import { useState } from "react";
import { Button } from "./button";
import { Menu, X, Lock, Crown, User, LogOut, Settings, Star } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, signOut, loading, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/html/Revura_Logo_White.png"
                alt="Revura Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation matching reference */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-white hover:text-white/70 transition-colors duration-200 text-sm font-light"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white hover:text-white/70 transition-colors duration-200 text-sm font-light"
            >
              About
            </a>
            <a
              href="/marketplace"
              className="text-white hover:text-white/70 transition-colors duration-200 text-sm font-light"
            >
              Marketplace
            </a>
            <div className="flex items-center space-x-3 ml-6">
              {loading ? (
                <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full backdrop-blur transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>{profile?.full_name || 'User'}</span>
                    {isAdmin && <Crown className="w-4 h-4 text-yellow-400" />}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Crown className="w-4 h-4 text-yellow-400" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/favorites"
                        className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Star className="w-4 h-4" />
                        <span>Favorites</span>
                      </Link>
                      <div className="border-t border-white/20"></div>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/signup" className="px-6 py-2 bg-white text-black hover:bg-white/90 text-sm font-medium rounded-full transition-all duration-200">
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted hover:text-white hover:bg-white-10"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-b border-white-15">
          <div className="px-4 py-4 space-y-4">
            <a
              href="/about"
              className="block py-2 text-muted hover:text-white transition-colors text-sm font-light"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="/marketplace"
              className="block py-2 text-muted hover:text-white transition-colors text-sm font-light"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </a>
            <div className="pt-4 border-t border-white-15">
              {user ? (
                <div className="space-y-3">
                  <div className="text-white text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {profile?.full_name || 'User'}
                    {isAdmin && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block py-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-light"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="block py-2 text-white hover:text-white/70 transition-colors text-sm font-light"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/favorites"
                    className="block py-2 text-white hover:text-white/70 transition-colors text-sm font-light"
                    onClick={() => setIsOpen(false)}
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block py-2 text-white hover:text-white/70 transition-colors text-sm font-light"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/signup"
                    className="block px-6 py-2 bg-white text-black hover:bg-white/90 text-sm font-medium rounded-full transition-all duration-200 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
