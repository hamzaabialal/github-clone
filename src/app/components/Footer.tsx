"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-surface text-muted border-t border-app mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        
        <p>© {new Date().getFullYear()} GitHubClone. Built for learning 🚀</p>
        
        <nav className="flex gap-4 mt-3 md:mt-0">
          <Link href="/" className="hover:opacity-80">Terms</Link>
          <Link href="/" className="hover:opacity-80">Privacy</Link>
          <Link href="/" className="hover:opacity-80">Security</Link>
          <Link href="/" className="hover:opacity-80">Docs</Link>
        </nav>
      </div>
    </footer>
  )
}
