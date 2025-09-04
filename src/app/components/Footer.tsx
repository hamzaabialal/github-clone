"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        
        <p>© {new Date().getFullYear()} GitHubClone. Built for learning 🚀</p>
        
        <nav className="flex gap-4 mt-3 md:mt-0">
          <Link href="/" className="hover:text-blue-400">Terms</Link>
          <Link href="/" className="hover:text-blue-400">Privacy</Link>
          <Link href="/" className="hover:text-blue-400">Security</Link>
          <Link href="/" className="hover:text-blue-400">Docs</Link>
        </nav>
      </div>
    </footer>
  )
}
