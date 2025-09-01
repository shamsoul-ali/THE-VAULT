"use client";

import { useState } from "react";
import { Button } from "./button";
import { Menu, X, Lock, Crown } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo matching reference style */}
          <div className="flex items-center">
            <h1 className="font-light text-xl text-white">
              THE VAULT
            </h1>
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
              href="/request-access" 
              className="text-white hover:text-white/70 transition-colors duration-200 text-sm font-light"
            >
              Request Access
            </a>
            <div className="flex items-center space-x-3 ml-6">
              <a href="/login" className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full backdrop-blur transition-all duration-200">
                Private Access
              </a>
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
          <div className="px-6 py-4 space-y-4">
            <a
              href="/about"
              className="block py-2 text-muted hover:text-white transition-colors text-sm font-light"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="/request-access"
              className="block py-2 text-muted hover:text-white transition-colors text-sm font-light"
              onClick={() => setIsOpen(false)}
            >
              Request Access
            </a>
            <div className="pt-4 border-t border-white-15">
              <a href="/login" className="btn-primary w-full">
                Private Access
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
