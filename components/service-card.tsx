"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  index: number
}

export function ServiceCard({ title, description, image, index }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-900/50 group-hover:bg-neutral-900/30 transition-colors duration-300" />
      </div>

      <div className="p-10 border-b border-l border-r border-white/10 bg-card">
        <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>
        <p className="text-white/70 mb-8 text-spacious">{description}</p>

        <Link
          href={`/services/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-flex items-center text-primary group/link"
        >
          Learn more
          <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}

