// components/vertical-logo.tsx
"use client"

import { motion, useSpring } from "framer-motion"
import Link from "next/link"

interface VerticalLogoProps {
  scrollY: number
}

export function VerticalLogo({ scrollY }: VerticalLogoProps) {
  // --- Existing logic for calculating height and spring ---
  const maxHeight = 600
  const minHeight = 300
  const shrinkRate = 0.15
  const logoHeight = Math.max(minHeight, maxHeight - scrollY * shrinkRate)
  const springHeight = useSpring(logoHeight, { stiffness: 100, damping: 30 })
  // --- End of existing logic ---

  return (
    // This wrapper div controls the visibility and fixed positioning:
    // - `hidden`: Default state (mobile) - the logo is not displayed.
    // - `lg:flex`: At the 'lg' breakpoint (1024px) and up, it becomes a flex container, making it visible.
    // - Positioning (`fixed`, `left-12`, etc.) is now part of this component's responsibility.
    <div className="hidden lg:flex items-center pointer-events-none fixed left-12 top-0 bottom-0 z-40">
      {/* The motion div and Link remain mostly the same */}
      <motion.div className="flex flex-col items-center" style={{ height: springHeight }}>
        <Link href="/" className="text-vertical-rl rotate-180 text-2xl font-light tracking-widest text-white">
          AMARA <span className="text-primary font-normal">&</span> PARTNERS
        </Link>
      </motion.div>
    </div>
  )
}