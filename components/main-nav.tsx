// components/main-nav.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
// ***** IMPORT CHANGES HERE *****
import {
  Sheet,
  SheetContent,
  SheetDescription, // Import SheetDescription
  SheetHeader,      // Import SheetHeader (good practice to wrap title/desc)
  SheetTitle,       // Import SheetTitle
  SheetTrigger,
} from "@/components/ui/sheet"

export function MainNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }} // Delay might have been adjusted by you
    >
      <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-40 lg:pr-8">
        <div className="flex items-center justify-end h-20 md:h-24">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-12">
              <li><NavLink href="/about-us">About us</NavLink></li>
              <li><NavLink href="/services">Services</NavLink></li>
              <li><NavLink href="/team">Our Team</NavLink></li>
              <li><NavLink href="/insights">Insights</NavLink></li>
              <li><NavLink href="/careers">Careers</NavLink></li>
              <li><NavLink href="/contact-us">Contact</NavLink></li>
            </ul>
          </nav>

          {/* Desktop Search Icon */}
          <div className="hidden lg:flex items-center ml-12">
            <Button variant="ghost" size="icon" className="text-white">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {/* Mobile Menu Trigger (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            {/* ***** CONTENT CHANGES HERE for Accessibility ***** */}
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l border-primary/20 p-0">
              {/* Use SheetHeader to group title and description */}
              <SheetHeader className="p-8 pb-4"> {/* Add some padding */}
                {/* Replace the old span with SheetTitle */}
                <SheetTitle className="text-lg font-light tracking-wider text-white text-left">
                  MENU
                </SheetTitle>
                {/* Add a visually hidden description for screen readers */}
                <SheetDescription className="sr-only">
                  Main navigation links for the Amara and Partners website.
                </SheetDescription>
              </SheetHeader>

              {/* Keep the rest of the mobile nav content */}
              <div className="p-8 pt-0 flex flex-col h-[calc(100%-theme(space.24))]"> {/* Adjust height calculation if needed */}
                <div className="elegant-line w-full my-4" />
                <nav className="flex flex-col py-4 flex-grow"> {/* Allow nav to grow */}
                  <ul className="space-y-10">
                    <li><MobileNavLink href="/about-us">About us</MobileNavLink></li>
                    <li><MobileNavLink href="/services">Services</MobileNavLink></li>
                    <li><MobileNavLink href="/team">Our Team</MobileNavLink></li>
                    <li><MobileNavLink href="/insights">Insights</MobileNavLink></li>
                    <li><MobileNavLink href="/careers">Careers</MobileNavLink></li>
                    <li><MobileNavLink href="/contact-us">Contact</MobileNavLink></li>
                  </ul>
                </nav>
                <div className="mt-auto pb-0"> {/* Remove extra padding if header has it */}
                  <Button className="w-full rounded-none bg-primary hover:bg-primary/90 py-6">Get in Touch</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

// Helper components (NavLink, MobileNavLink) remain the same
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  // ... (same as before)
  return (
    <Link
      href={href}
      className="relative text-white/80 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider font-light py-2"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  // ... (same as before)
  return (
    <Link
      href={href}
      className="text-xl font-light text-white/80 hover:text-white transition-colors duration-200 block py-2"
    >
      {children}
    </Link>
  )
}