"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation({ logoImage = null }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-2 w-full z-20 backdrop-blur-md bg-white/5 shadow-lg border border-white/10 fixed top-0">
        <div className="flex items-center space-x-2 group">
          {logoImage ? (
            <div className="w-8 h-8 relative">
              <Image
                src="/credit_logo.png"
                alt="KCredit Check Logo"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-6 h-6 bg-lime-400 rounded-sm"></div>
          )}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 via-purple-400 to-white bg-clip-text text-transparent  transition-transform cursor-pointer"
          >
            CreditSense
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            <Link href="/">Home</Link>
          </div>

          <span className="cursor-pointer hover:text-lime-400 transition-colors ">
            <Link href="/getstarted">Get Started</Link>
          </span>

          <span className="cursor-pointer hover:text-lime-400 transition-colors ">
            <Link href="/blogs">Blogs</Link>
          </span>

          <span className="cursor-pointer hover:text-lime-400 transition-colors ">
            <Link href="/contact">Contact Us</Link>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="cursor-pointer hover:text-lime-400 transition-colors ">
            Log in
          </span>
          <button className="px-6 py-2 border-2 border-lime-400 rounded-full bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 text-white font-bold shadow-lg hover:from-lime-400 hover:to-purple-700  transition-all duration-300 ">
            Registration
          </button>
          {/* Mobile menu button */}
          <button
            aria-label="Menu"
            className="md:hidden inline-flex flex-col justify-center items-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : "translate-y-1"
              }`}
            ></span>
          </button>
        </div>
      </nav>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 animate-fade-in">
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/getstarted"
            className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
          >
            Get Started
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/blogs"
            className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
          >
            Blogs
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
          >
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
}
