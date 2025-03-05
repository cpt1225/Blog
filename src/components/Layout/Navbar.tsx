"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn } from "next-auth/react"
import { Archive } from 'lucide-react';
import { signOut } from "next-auth/react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated";
  const sign = session ? "SignOut" : "SignIn"

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 ">
          AC
        </Link>

        {/* Mobile menu button */}
        <button
          className="block rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-20 md:min-width:800px ">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/post"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
          >
            About
          </Link>
        </div>

        {/* Sign out button (desktop) */}
        <div className="hidden md:flex relative">
          <button onClick={() => isAuthenticated ? signOut() : signIn()}
            className=" w-24 rounded-md border border-gray-300 mr-2
          bg-white px-3 py-2 text-sm font-medium text-gray-700
           shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-600 ">
            {status === "loading" ? "..." : sign}
          </button>
          <div className="relative ml-10">
            {sign === 'SignOut' && (
              <Link href="/admin">
                <Archive size={36}
                  strokeWidth={1.75}
                  className="text-gray-700 hover:text-blue-500 absolute right-0" />
              </Link>
            )}
          </div>

        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-50 border-b border-gray-200 bg-white p-6 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pt-4">
                  <button
                    onClick={() => (sign === 'SignOut' ? signOut() : signIn())}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-600 "
                  >
                    {sign}
                  </button>
                  {sign === 'SignOut' && (
                    <Link href="/admin">
                      <button
                        className="w-full mt-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-600 "
                      >
                        dashboard
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

