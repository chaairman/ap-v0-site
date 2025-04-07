"use client"
import Image from "next/image"
import Link from "next/link"

interface InsightCardProps {
  title: string
  category: string
  date?: string
  image: string
  featured?: boolean
  lightMode?: boolean
}

export function InsightCard({ title, category, date, image, featured = false, lightMode = false }: InsightCardProps) {
  if (featured) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            lightMode
              ? "from-neutral-900/80 via-neutral-900/40 to-transparent"
              : "from-neutral-900 via-neutral-900/60 to-transparent"
          }`}
        />

        <div className="absolute bottom-0 left-0 p-12 md:p-16 max-w-3xl">
          <div className="mb-6">
            <span
              className={`inline-block text-sm font-medium px-6 py-1.5 border-l border-primary ${
                lightMode ? "text-primary" : "text-white/80"
              }`}
            >
              {category}
            </span>
          </div>

          <Link href={`/insights/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <h3
              className={`text-2xl md:text-3xl font-bold hover:text-primary transition-colors ${
                lightMode ? "text-neutral-900" : "text-white"
              }`}
            >
              {title}
            </h3>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 ${
            lightMode
              ? "bg-neutral-900/30 group-hover:bg-neutral-900/10"
              : "bg-neutral-900/40 group-hover:bg-neutral-900/20"
          } transition-colors duration-300`}
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-primary">{category}</span>
          {date && <span className={`text-sm ${lightMode ? "text-neutral-500" : "text-white/60"}`}>{date}</span>}
        </div>

        <Link href={`/insights/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <h3
            className={`text-xl font-bold group-hover:text-primary transition-colors ${
              lightMode ? "text-neutral-900" : "text-white"
            }`}
          >
            {title}
          </h3>
        </Link>
      </div>
    </div>
  )
}

