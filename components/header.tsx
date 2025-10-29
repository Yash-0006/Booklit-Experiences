"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={40}
            />
          </Link>

          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search experiences"
                className="flex-1 px-3 sm:px-4 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button onClick={handleSearch} className="btn-yellow px-3 sm:px-6 text-sm">
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">🔍</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
