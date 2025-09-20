'use client';

import { useState } from 'react';
import Link from 'next/link';
import { brand } from '@/lib/brand';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {brand.logo.showIcon && (
                <span className="text-2xl mr-2">{brand.logo.icon}</span>
              )}
              <span className="text-2xl font-bold text-cyan-400">{brand.logo.text}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/videos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Videos
            </Link>
            <Link href="/ide" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              IDE
            </Link>
            <Link href="/challenges" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Challenges
            </Link>
            <a 
              href="https://www.youtube.com/@OutputMystery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              YouTube Channel
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={isMenuOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={isMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/videos" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Videos
              </Link>
              <Link href="/ide" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                IDE
              </Link>
              <Link href="/challenges" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Challenges
              </Link>
              <a 
                href="https://www.youtube.com/@OutputMystery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                YouTube Channel
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
