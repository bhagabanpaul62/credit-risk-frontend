"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation({ logoImage = null }) {
  const [open, setOpen] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('nav')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <>
      <nav className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-3 w-full z-20 backdrop-blur-md bg-white/5 shadow-lg border border-white/10 fixed top-0">
        {/* Logo Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 group min-w-0">
          {logoImage ? (
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative flex-shrink-0">
              <Image
                src="/credit_logo.png"
                alt="KCredit Check Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-lime-400 rounded-sm flex-shrink-0"></div>
          )}
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 via-purple-400 to-white bg-clip-text text-transparent transition-transform cursor-pointer hover:scale-105 truncate"
          >
            CreditSense
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <Link 
            href="/" 
            className="text-sm lg:text-base cursor-pointer hover:text-lime-400 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            Home
          </Link>

          <Link 
            href="/getstarted" 
            className="text-sm lg:text-base cursor-pointer hover:text-lime-400 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            Get Started
          </Link>

          <Link 
            href="/blogs" 
            className="text-sm lg:text-base cursor-pointer hover:text-lime-400 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            Blogs
          </Link>

          <Link 
            href="/contact" 
            className="text-sm lg:text-base cursor-pointer hover:text-lime-400 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        {/* Right Section - Auth & Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-2 md:space-x-3">
            <span className="text-sm lg:text-base cursor-pointer hover:text-lime-400 transition-colors whitespace-nowrap">
              Log in
            </span>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base border-2 border-lime-400 rounded-full bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 text-white font-bold shadow-lg hover:from-lime-400 hover:to-purple-700 transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Registration
            </button>
          </div>

          {/* Mobile Auth Button (Compact) */}
          <div className="flex sm:hidden">
            <button className="px-3 py-1.5 text-xs border-2 border-lime-400 rounded-full bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 text-white font-bold shadow-lg hover:from-lime-400 hover:to-purple-700 transition-all duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden inline-flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 flex-shrink-0"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`h-0.5 w-4 sm:w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-1 sm:translate-y-1.5 rotate-45" : "-translate-y-0.5 sm:-translate-y-1"
              }`}
            ></span>
            <span
              className={`h-0.5 w-4 sm:w-5 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-4 sm:w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-1 sm:-translate-y-1.5 -rotate-45" : "translate-y-0.5 sm:translate-y-1"
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ 
          top: open ? '60px' : '0',
          paddingTop: open ? '8px' : '0'
        }}
      >
        <div className="mx-3 sm:mx-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Navigation Links */}
            {[
              { href: '/', label: 'Home' },
              { href: '/getstarted', label: 'Get Started' },
              { href: '/blogs', label: 'Blogs' },
              { href: '/contact', label: 'Contact Us' }
            ].map((item) => (
              <Link
                key={item.href}
                onClick={() => setOpen(false)}
                href={item.href}
                className="block w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm sm:text-base hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:translate-x-1"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-3 border-t border-white/10 space-y-2 sm:hidden">
              <button 
                onClick={() => setOpen(false)}
                className="block w-full text-left px-4 py-3 text-sm rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                Log in
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 text-sm border-2 border-lime-400 rounded-xl bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 text-white font-bold shadow-lg hover:from-lime-400 hover:to-purple-700 transition-all duration-300"
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-5"
          onClick={() => setOpen(false)}
          style={{ top: '60px' }}
        />
      )}
    </>
  );
}