"use client"

import { useMemo, useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { 
  MapPin, 
  Building, 
  Calendar, 
  Star, 
  GitBranch, 
  Eye, 
  Users, 
  FolderGit2,
  Globe,
  Twitter,
  Github
} from "lucide-react"
import Link from "next/link"

interface UserProfile {
  login: string
  id: number
  avatar_url: string
  name: string
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  location: string
  company: string
  blog: string
  email: string
  twitter_username: string
  html_url: string
}

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
  fork: boolean
  private: boolean
}

export default function UserProfile() {
  const params = useParams()
  const username = params.username as string
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [languageFilter, setLanguageFilter] = useState<string>("All")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        
        // Fetch user profile
        const profileResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!profileResponse.ok) {
          throw new Error("User not found")
        }
        const profileData: UserProfile = await profileResponse.json()
        setProfile(profileData)

        // Fetch user repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
        if (reposResponse.ok) {
          const reposData: Repository[] = await reposResponse.json()
          setRepos(reposData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchUserData()
    }
  }, [username])

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((r) => {
      if (r.language) set.add(r.language)
    })
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [repos])

  const visibleRepos = useMemo(() => {
    if (languageFilter === "All") return repos
    return repos.filter((r) => r.language === languageFilter)
  }, [repos, languageFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-app text-app">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          ← Back to Search
        </Link>
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-surface border border-app rounded-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar and Basic Info */}
            <div className="flex-shrink-0">
              <img
                src={profile.avatar_url}
                alt={`${profile.login} avatar`}
                className="w-32 h-32 rounded-full border-4 border-app"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{profile.name || profile.login}</h1>
                {profile.name && (
                  <span className="text-xl text-gray-400">@{profile.login}</span>
                )}
              </div>

              {profile.bio && (
                <p className="text-lg text-muted mb-4">{profile.bio}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">{profile.public_repos}</span>
                  <span className="text-gray-400">repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">{profile.followers}</span>
                  <span className="text-gray-400">followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">{profile.following}</span>
                  <span className="text-gray-400">following</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">{profile.public_gists}</span>
                  <span className="text-gray-400">gists</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {profile.location && (
                  <div className="flex items-center gap-2 text-muted">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2 text-muted">
                    <Building className="w-4 h-4" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile.blog && (
                  <div className="flex items-center gap-2 text-muted">
                    <Globe className="w-4 h-4" />
                    <a 
                      href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      {profile.blog}
                    </a>
                  </div>
                )}
                {profile.twitter_username && (
                  <div className="flex items-center gap-2 text-muted">
                    <Twitter className="w-4 h-4" />
                    <a 
                      href={`https://twitter.com/${profile.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      @{profile.twitter_username}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(profile.created_at)}</span>
                </div>
              </div>

              {/* GitHub Profile Link */}
              <div className="mt-6">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Repositories</h2>
            <p className="text-muted">Showing {visibleRepos.length} of {repos.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Language</label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-2 bg-surface-muted border border-app rounded-md"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {repos.length === 0 ? (
          <div className="text-center py-16 bg-gray-800 border border-gray-700 rounded-lg">
            <FolderGit2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No public repositories found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {visibleRepos.map((repo) => (
              <div
                key={repo.id}
                className="bg-surface border border-app rounded-lg p-6 hover:opacity-90 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300 mb-2">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h3>
                    {repo.description && (
                      <p className="text-muted text-sm mb-3">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--primary)" }}></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {repo.fork ? "Forked" : "Original"}
                      </span>
                      <span>Updated {formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  {repo.private && (
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      Private
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
