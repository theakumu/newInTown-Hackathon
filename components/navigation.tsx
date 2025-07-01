'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  HelpCircle, 
  MessageSquare,
  Map,
  GraduationCap,
  CheckSquare,
  User,
  Globe,
  Gamepad2
} from 'lucide-react'

const navigationItems = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home,
    description: 'Homepage and general information'
  },
  { 
    name: 'Checklist', 
    href: '/checklist', 
    icon: CheckSquare,
    description: 'To-do checklist'
  },
  { 
    name: 'Life in Germany', 
    href: '/life-in-germany', 
    icon: Globe,
    description: 'Living in Germany guide'
  },
  { 
    name: 'University Info', 
    href: '/university-info', 
    icon: GraduationCap,
    description: 'University information'
  },
  { 
    name: 'Map', 
    href: '/map', 
    icon: Map,
    description: 'Campus map'
  },
  { 
    name: 'Forum', 
    href: '/forum', 
    icon: MessageSquare,
    description: 'Student forum'
  },
  { 
    name: 'Buddy System', 
    href: '/buddy-system', 
    icon: Users,
    description: 'Student buddy system'
  },
  { 
    name: 'Events', 
    href: '/events', 
    icon: Calendar,
    description: 'Campus events'
  },
  { 
    name: 'Documents', 
    href: '/documents', 
    icon: FileText,
    description: 'Important documents'
  },
  { 
    name: 'FAQ', 
    href: '/faq', 
    icon: HelpCircle,
    description: 'Frequently asked questions'
  }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-blue-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/images/ise-logo-new.png"
                alt="ISE Logo - Fachschaftsrat International Studies in Engineering"
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-125 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800 dark:text-white leading-tight transition-colors duration-300">
                NewInTown Student Guide
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 leading-tight">
                University of Duisburg-Essen
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(1).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
