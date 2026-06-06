'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">HD</span>
            </div>
            <span className="font-bold text-lg text-amber-900">Holland Dairy</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-600 hover:text-amber-600 transition">
              About
            </a>
            <a href="#products" className="text-gray-600 hover:text-amber-600 transition">
              Products
            </a>
            <a href="#quality" className="text-gray-600 hover:text-amber-600 transition">
              Quality
            </a>
            <a href="#contact" className="text-gray-600 hover:text-amber-600 transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-between"
          >
            <span className="block w-full h-0.5 bg-gray-600"></span>
            <span className="block w-full h-0.5 bg-gray-600"></span>
            <span className="block w-full h-0.5 bg-gray-600"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#about" className="text-gray-600 hover:text-amber-600 transition">
              About
            </a>
            <a href="#products" className="text-gray-600 hover:text-amber-600 transition">
              Products
            </a>
            <a href="#quality" className="text-gray-600 hover:text-amber-600 transition">
              Quality
            </a>
            <a href="#contact" className="text-gray-600 hover:text-amber-600 transition">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
