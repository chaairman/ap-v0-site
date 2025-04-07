"use client"

import { motion, useSpring } from "framer-motion"
import Link from "next/link"

interface VerticalLogoProps {
  scrollY: number
}

export function VerticalLogo({ scrollY }: VerticalLogoProps) {
  // Calculate logo size based on scroll position
  // Start with full size, then shrink as user scrolls down (up to a minimum size)
  const maxHeight = 600
  const minHeight = 300
  const shrinkRate = 0.15

  const logoHeight = Math.max(minHeight, maxHeight - scrollY * shrinkRate)

  // Spring animation for smoother transitions
  const springHeight = useSpring(logoHeight, { stiffness: 100, damping: 30 })

  return (
    <motion.div className="flex flex-col items-center" style={{ height: springHeight }}>
      <Link href="/" className="text-vertical-rl rotate-180 text-2xl font-light tracking-widest text-white">
        AMARA <span className="text-primary font-normal">&</span> PARTNERS
      </Link>
    </motion.div>
  )
}

