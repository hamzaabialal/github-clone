"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "./ThemeProvider"

export default function Header() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="w-full bg-surface text-app border-b border-app">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-colors">
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
            className="w-full max-w-md px-3 py-1.5 rounded-md bg-surface-muted border border-app text-sm focus:outline-none focus:ring ring-primary"
          />
        </form>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:opacity-80 transition-colors">Home</Link>
          <Link href="/" className="hover:opacity-80 transition-colors">Explore</Link>
          <Link href="/" className="hover:opacity-80 transition-colors">About</Link>
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded-md border border-app bg-surface-muted hover:opacity-90 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>

        {/* Profile (dummy) */}
        <div className="ml-4">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-app hover:opacity-80 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}
