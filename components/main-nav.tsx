"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="container-spacious max-w-7xl mx-auto px-8 md:px-16 pl-24 md:pl-40">
        <div className="flex items-center justify-end h-20 md:h-24">
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-12">
              <li>
                <NavLink href="/about-us">About us</NavLink>
              </li>
              <li>
                <NavLink href="/services">Services</NavLink>
              </li>
              <li>
                <NavLink href="/team">Our Team</NavLink>
              </li>
              <li>
                <NavLink href="/insights">Insights</NavLink>
              </li>
              <li>
                <NavLink href="/careers">Careers</NavLink>
              </li>
              <li>
                <NavLink href="/contact-us">Contact</NavLink>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center ml-12">
            <Button variant="ghost" size="icon" className="text-white">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l border-primary/20">
              <div className="flex flex-col h-full p-8">
                <div className="flex items-center justify-between py-4">
                  <span className="text-lg font-light tracking-wider text-white">MENU</span>
                </div>

                <div className="elegant-line w-full my-8" />

                <nav className="flex flex-col py-8">
                  <ul className="space-y-10">
                    <li>
                      <MobileNavLink href="/about-us">About us</MobileNavLink>
                    </li>
                    <li>
                      <MobileNavLink href="/services">Services</MobileNavLink>
                    </li>
                    <li>
                      <MobileNavLink href="/team">Our Team</MobileNavLink>
                    </li>
                    <li>
                      <MobileNavLink href="/insights">Insights</MobileNavLink>
                    </li>
                    <li>
                      <MobileNavLink href="/careers">Careers</MobileNavLink>
                    </li>
                    <li>
                      <MobileNavLink href="/contact-us">Contact</MobileNavLink>
                    </li>
                  </ul>
                </nav>

                <div className="mt-auto pb-8">
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
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
  return (
    <Link
      href={href}
      className="text-xl font-light text-white/80 hover:text-white transition-colors duration-200 block py-2"
    >
      {children}
    </Link>
  )
}

