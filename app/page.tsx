"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import { Experience } from "@/types"
import { LoadingWithText } from "@/components/ui/spinner"

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/experiences")
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      console.error("Failed to fetch experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingWithText text="Loading experiences..." />
        ) : filteredExperiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl text-foreground mb-2">No experiences found</div>
            <div className="text-muted-foreground mb-4">Try adjusting your search terms</div>
            <button onClick={() => window.location.reload()} className="btn-yellow">
              Show All Experiences
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <Link key={experience.id} href={`/details/${experience.id}`}>
                <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                  <div className="relative h-40 w-full bg-gray-200">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{experience.location}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{experience.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">From ₹{experience.price}</span>
                      <button className="btn-yellow text-sm">View Details</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
