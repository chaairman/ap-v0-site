// components/vertical-logo.tsx
"use client"

import { motion, useSpring } from "framer-motion"
import Link from "next/link"

interface VerticalLogoProps {
  scrollY: number
}

export function VerticalLogo({ scrollY }: VerticalLogoProps) {
  // --- Logic for calculating height and spring (remains the same) ---
  const maxHeight = 600
  const minHeight = 300
  const shrinkRate = 0.15
  const logoHeight = Math.max(minHeight, maxHeight - scrollY * shrinkRate)
  const springHeight = useSpring(logoHeight, { stiffness: 100, damping: 30 })
  // --- End of logic ---

  return (
    // This wrapper div controls the visibility and fixed positioning:
    // - Changed to `lg:top-24`: On large screens and up, position 6rem (24 * 0.25rem) from the top edge.
    // - `top-0`: Default top position (element is hidden on mobile).
    <div className="hidden lg:flex items-center pointer-events-none fixed left-12 lg:top-24 top-0 bottom-0 z-40">
      {/* The motion div and Link remain the same */}
      <motion.div className="flex flex-col items-center" style={{ height: springHeight }}>
        <Link href="/" className="text-vertical-rl rotate-180 text-2xl font-light tracking-widest text-white">
          AMARA <span className="text-primary font-normal">&</span> PARTNERS
        </Link>
      </motion.div>
    </div>
  )
}