"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Amara & Partners LLC" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="/about-us">About Us</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/team">Our Team</NavLink>
            <NavLink href="/insights">Insights</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="/contact-us">Contact</NavLink>
          </nav>

          <div className="hidden lg:block">
            <Button className="rounded-full px-6">Get in Touch</Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" alt="Amara & Partners LLC" width={120} height={40} className="h-8 w-auto" />
                  </Link>
                </div>

                <nav className="flex flex-col space-y-6 py-8">
                  <MobileNavLink href="/about-us">About Us</MobileNavLink>
                  <MobileNavLink href="/services">Services</MobileNavLink>
                  <MobileNavLink href="/team">Our Team</MobileNavLink>
                  <MobileNavLink href="/insights">Insights</MobileNavLink>
                  <MobileNavLink href="/careers">Careers</MobileNavLink>
                  <MobileNavLink href="/contact-us">Contact</MobileNavLink>
                </nav>

                <div className="mt-auto pb-8">
                  <Button className="w-full rounded-full">Get in Touch</Button>
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
      className="relative text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
    >
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-xl font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

