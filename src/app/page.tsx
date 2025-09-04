"use client"

import { useState, useEffect } from "react"
import { Search, Users, Star, GitBranch } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface User {
  id: number
  login: string
  avatar_url: string
  type: string
  score: number
}

interface SearchResult {
  total_count: number
  items: User[]
}

export default function Home() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Check for search query in URL on component mount
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setQuery(searchQuery)
      searchUsers(searchQuery)
    }
  }, [searchParams])

  const searchUsers = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || query
    if (!queryToSearch.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(queryToSearch)}&per_page=20`)
      const data: SearchResult = await response.json()
      setUsers(data.items || [])
      setSearched(true)
    } catch (error) {
      console.error("Error searching users:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchUsers()
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Discover GitHub Users
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Search for developers, explore their profiles, repositories, and contributions
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter username or search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 text-lg bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => searchUsers()}
              disabled={loading}
              className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {loading ? "Searching..." : `Found ${users.length} users`}
            </h2>
            {users.length > 0 && (
              <p className="text-gray-400">Click on any user to view their detailed profile</p>
            )}
          </div>

          {users.length === 0 && !loading && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400">No users found for "{query}"</p>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/user/${user.login}`}
                className="block bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 hover:bg-gray-750 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="w-16 h-16 rounded-full border-2 border-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-400 capitalize">
                      {user.type}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Star className="w-3 h-3 mr-1" />
                      <span>Score: {user.score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      {!searched && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What you can do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Users</h3>
              <p className="text-gray-400">Find developers by username, location, or skills</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Profiles</h3>
              <p className="text-gray-400">Explore detailed user profiles with repositories</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Repos</h3>
              <p className="text-gray-400">Check out projects and contributions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
