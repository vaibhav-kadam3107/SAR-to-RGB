"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Convert", path: "/convert" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/isro-logo.png" alt="ISRO Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900 leading-tight">ISRO SAR Converter</span>
              <span className="text-xs text-[#FF9933]">भारतीय अंतरिक्ष अनुसंधान संगठन</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  pathname === item.path ? "text-primary" : "text-gray-600",
                )}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]"></span>
                )}
              </Link>
            ))}
            <a 
              href="https://github.com/vaibhav-kadam3107/SAR-to-RGB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={20} />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium py-3 px-4 transition-colors",
                  pathname === item.path
                    ? "bg-gray-50 text-primary border-l-4 border-primary"
                    : "text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="https://github.com/vaibhav-kadam3107/SAR-to-RGB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium py-3 px-4 text-gray-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github size={18} />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

