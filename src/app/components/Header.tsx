"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="w-full bg-gray-900 text-gray-100 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
            🐙 GitHubClone
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search or jump to..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </form>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/" className="hover:text-blue-400 transition-colors">Explore</Link>
          <Link href="/" className="hover:text-blue-400 transition-colors">About</Link>
        </nav>

        {/* Profile (dummy) */}
        <div className="ml-4">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}
