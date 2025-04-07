// components/main-nav.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useBreakpoint } from "@/hooks/use-breakpoint"

// Define props for the component
interface MainNavProps {
  isCollapsed: boolean;        // Driven by scroll position
  isManuallyRevealed: boolean; // Driven by hamburger click on desktop
  onManualReveal: () => void;  // Callback function from page.tsx
}

export function MainNav({ isCollapsed, isManuallyRevealed, onManualReveal }: MainNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const isLargeScreen = useBreakpoint('lg');

  // Effect for background change (subtle scroll effect)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // --- Animation Variants (Unchanged from previous step) ---
  const desktopNavVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    hidden: { opacity: 0, x: "50%", transition: { duration: 0.3, ease: "easeInOut" } }, // Slides right
  };
  const mobileTriggerVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut", delay: 0.1 } },
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };
  // --- End Variants ---

  // --- UPDATED Visibility Logic ---
  // Show Desktop Nav IF: Large screen AND (NOT collapsed OR is manually revealed)
  const showDesktopNav = isLargeScreen && (!isCollapsed || isManuallyRevealed);
  // Show Mobile Trigger IF: NOT large screen OR (Large screen AND is collapsed AND NOT manually revealed)
  const showMobileTrigger = !isLargeScreen || (isLargeScreen && isCollapsed && !isManuallyRevealed);
  // --- End Visibility Logic ---

  // --- UPDATED Background Condition ---
  const showBackground = scrolled || (isLargeScreen && isManuallyRevealed);
  // --- End Background Condition ---


  return (
    <motion.header
      // Apply background conditionally
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        showBackground ? "bg-background/70 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-40 lg:pr-8">
        <div className="flex items-center justify-end h-20 md:h-24 min-h-[5rem] md:min-h-[6rem]">

          {/* Animated Desktop Navigation Wrapper */}
          <AnimatePresence mode="wait">
            {showDesktopNav && ( // Uses updated visibility logic
              <motion.div
                className="flex items-center"
                key="desktop-nav-wrapper"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={desktopNavVariants}
              >
                {/* Desktop Links */}
                <nav className="flex items-center"> <ul className="flex space-x-12"> <li><NavLink href="/about-us">About us</NavLink></li> <li><NavLink href="/services">Services</NavLink></li> <li><NavLink href="/team">Our Team</NavLink></li> <li><NavLink href="/insights">Insights</NavLink></li> <li><NavLink href="/careers">Careers</NavLink></li> <li><NavLink href="/contact-us">Contact</NavLink></li> </ul> </nav>
                {/* Desktop Search */}
                <div className="flex items-center ml-12"> <Button variant="ghost" size="icon" className="text-white"> <Search className="h-5 w-5" /> <span className="sr-only">Search</span> </Button> </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Mobile Trigger Wrapper */}
          <AnimatePresence mode="wait">
            {showMobileTrigger && ( // Uses updated visibility logic
              <motion.div
                key="mobile-trigger-wrapper"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileTriggerVariants}
                className="relative z-50" // Ensure clickable
              >
                {/* Sheet component remains for mobile functionality */}
                <Sheet>
                  <SheetTrigger asChild>
                    {/* --- UPDATED onClick Handler --- */}
                    <motion.button
                       className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                       aria-label="Toggle menu"
                       onClick={(e) => {
                         // On large screens, prevent sheet opening & trigger manual reveal
                         if (isLargeScreen) {
                           e.preventDefault(); // Stop SheetTrigger's default behavior
                           onManualReveal();   // Call the function passed from page.tsx
                         }
                         // On small screens, do nothing extra - SheetTrigger handles opening
                       }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.button>
                     {/* --- End onClick Handler --- */}
                  </SheetTrigger>
                  {/* SheetContent remains the same - only used on mobile */}
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l border-primary/20 p-0">
                    <SheetHeader className="p-8 pb-4"> <SheetTitle className="text-lg font-light tracking-wider text-white text-left"> MENU </SheetTitle> <SheetDescription className="sr-only"> Main navigation links for the Amara and Partners website. </SheetDescription> </SheetHeader>
                    <div className="p-8 pt-0 flex flex-col h-[calc(100%-theme(space.24))]"> <div className="elegant-line w-full my-4" /> <nav className="flex flex-col py-4 flex-grow"> <ul className="space-y-10"> <li><MobileNavLink href="/about-us">About us</MobileNavLink></li> <li><MobileNavLink href="/services">Services</MobileNavLink></li> <li><MobileNavLink href="/team">Our Team</MobileNavLink></li> <li><MobileNavLink href="/insights">Insights</MobileNavLink></li> <li><MobileNavLink href="/careers">Careers</MobileNavLink></li> <li><MobileNavLink href="/contact-us">Contact</MobileNavLink></li> </ul> </nav> <div className="mt-auto pb-0"> <Button className="w-full rounded-none bg-primary hover:bg-primary/90 py-6">Get in Touch</Button> </div> </div>
                  </SheetContent>
                </Sheet>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.header>
  )
}

// --- Helper Components (NavLink, MobileNavLink) - No Changes ---
function NavLink({ href, children }: { href: string; children: React.ReactNode }) { return ( <Link href={href} className="relative text-white/80 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider font-light py-2"> {children} </Link> ) }
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) { return ( <Link href={href} className="text-xl font-light text-white/80 hover:text-white transition-colors duration-200 block py-2"> {children} </Link> ) }