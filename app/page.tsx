"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { MobileProgressIndicator } from "@/components/mobile-progress-indicator"
import {
  CheckSquare,
  Map,
  FileText,
  MessageSquare,
  Calendar,
  GraduationCap,
  Globe,
  HelpCircle,
  Gamepad,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calculator,
} from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(currentScrollY / maxScroll, 1)

      setScrollY(currentScrollY)
      setScrollProgress(progress)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const navigationItems = [
    {
      title: "Checklist",
      description: "Track your arrival tasks",
      href: "/checklist",
      icon: CheckSquare,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Campus Map",
      description: "Find important locations",
      href: "/map",
      icon: Map,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
    },
    {
      title: "Documents",
      description: "Download important files",
      href: "/documents",
      icon: FileText,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Forum",
      description: "Ask questions & discuss",
      href: "/forum",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
    {
      title: "Events",
      description: "ISE Instagram updates",
      href: "/events",
      icon: Calendar,
      color: "bg-gradient-to-br from-indigo-600 to-purple-600",
    },
    {
      title: "University Info",
      description: "Academic information",
      href: "/university-info",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    {
      title: "Life in Germany",
      description: "Essential living guide",
      href: "/life-in-germany",
      icon: Globe,
      color: "bg-gradient-to-br from-blue-700 to-indigo-800",
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      href: "/faq",
      icon: HelpCircle,
      color: "bg-gradient-to-br from-indigo-700 to-blue-800",
    },
    {
      title: "Grade Calculator",
      description: "Calculate your GPA",
      href: "/grade-calculator",
      icon: Calculator,
      color: "bg-gradient-to-br from-green-600 to-green-700",
    },
  ]

  // Calculate which background to show based on scroll position with smoother transitions
  const getBackgroundImage = () => {
    if (typeof window === "undefined") return "/images/gallery/campus-main.jpg"

    if (scrollProgress < 0.15) {
      return "/images/gallery/campus-main.jpg"
    } else if (scrollProgress < 0.35) {
      return "/images/gallery/engineering-lab.jpg"
    } else if (scrollProgress < 0.55) {
      return "/images/gallery/students-studying.jpg"
    } else if (scrollProgress < 0.75) {
      return "/images/gallery/library-study.jpg"
    } else {
      return "/images/gallery/international-students.jpg"
    }
  }

  // More minimalistic parallax calculations
  const getParallaxTransform = () => {
    // Much more subtle parallax effect
    const parallaxSpeed = isMobile ? 0.1 : 0.2
    return `translateY(${scrollY * parallaxSpeed}px)`
  }

  // Darker overlay for better contrast
  const getOverlayOpacity = () => {
    return Math.max(0.6, 0.9 - scrollProgress * 0.2)
  }

  const currentBackground = getBackgroundImage()

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Progress Indicators */}
      <ScrollProgressIndicator currentBackground={currentBackground} scrollProgress={scrollProgress} />
      <MobileProgressIndicator currentBackground={currentBackground} scrollProgress={scrollProgress} />

      {/* Main Background with Minimalistic Parallax */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url('${currentBackground}')`,
          transform: getParallaxTransform(),
          filter: `brightness(0.3) contrast(1.2)`,
          zIndex: 1,
        }}
      />

      {/* Darker Gradient Overlay */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 transition-opacity duration-700"
        style={{
          opacity: getOverlayOpacity(),
          zIndex: 2,
        }}
      />

      {/* Additional Top Gradient for Navigation */}
      <div
        className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/95 to-transparent"
        style={{
          zIndex: 3,
        }}
      />

      {/* Content Layer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12 min-h-screen flex flex-col justify-center items-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Logo with minimal movement */}
                <img
                  src="/images/ise-logo-official.png"
                  alt="ISE Logo - International Studies in Engineering, University of Duisburg-Essen"
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain drop-shadow-2xl transition-all duration-500"
                  style={{
                    transform: `translateY(${scrollY * (isMobile ? 0.02 : 0.05)}px)`,
                    filter: `drop-shadow(0 0 40px rgba(255,255,255,0.3))`,
                  }}
                />
              </div>
            </div>

            <div
              className="max-w-4xl mx-auto px-4"
              style={{
                transform: `translateY(${scrollY * (isMobile ? 0.01 : 0.03)}px)`,
              }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-tight">
                Welcome to ISE
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl text-white/95 mb-4 font-medium drop-shadow-lg">
                International Studies in Engineering
              </p>
              <p className="text-base md:text-xl lg:text-2xl text-white/85 mb-8 drop-shadow-lg max-w-3xl mx-auto">
                Your guide to starting your journey at University of Duisburg-Essen
              </p>
            </div>
          </div>

          {/* Navigation Grid with minimal parallax */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-16"
            style={{
              transform: `translateY(${scrollY * (isMobile ? 0 : 0.01)}px)`,
            }}
          >
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/30 shadow-xl">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div
                        className={`${item.color} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Quick Info Section */}
          <div
            className="text-center mb-20"
            style={{
              transform: `translateY(${scrollY * (isMobile ? 0 : 0.02)}px)`,
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg">
              Quick Start Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { title: "1. Complete Checklist", desc: "Start with essential arrival tasks" },
                { title: "2. Explore Campus", desc: "Use the interactive map" },
                { title: "3. Join the Forum", desc: "Ask questions and get help" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/30 hover:shadow-xl transition-all duration-500 hover:scale-105 shadow-xl"
                >
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* German Learning Section */}
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/20 via-orange-50/20 to-red-50/20 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-3xl transform -rotate-1 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-green-50/20 via-blue-50/20 to-purple-50/20 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl transform rotate-1 backdrop-blur-sm"></div>

            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-dashed border-yellow-300/60 dark:border-yellow-600/60 shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    🇩🇪 Learn German
                  </h2>
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium px-2">
                  Master the German language with our interactive tools!
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 px-2">
                  Essential for your studies and daily life in Germany
                </p>
              </div>

              {/* Mobile-optimized grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                {/* German Wordle */}
                <Link href="/german-wordle" className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-4 sm:p-6 md:p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-3xl">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white rounded-full animate-bounce"></div>
                      <div
                        className="absolute top-6 right-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="absolute bottom-6 left-6 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="bg-white/20 p-2 sm:p-3 md:p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <Gamepad className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">
                        German Wordle
                      </h3>
                      <p className="text-green-100 text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg px-2">
                        Challenge yourself with daily 5-letter German word puzzles
                      </p>

                      <div className="flex items-center justify-center space-x-2 text-green-100 group-hover:text-white transition-colors duration-300">
                        <span className="font-semibold text-sm sm:text-base">Play Now</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* German Words */}
                <Link href="/german-words" className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-4 sm:p-6 md:p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-3xl">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white rounded-full animate-pulse"></div>
                      <div
                        className="absolute bottom-4 right-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "0.7s" }}
                      ></div>
                      <div
                        className="absolute top-8 left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "1.4s" }}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="bg-white/20 p-2 sm:p-3 md:p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">
                        German Words
                      </h3>
                      <p className="text-orange-100 text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg px-2">
                        Learn essential vocabulary with daily words and examples
                      </p>

                      <div className="flex items-center justify-center space-x-2 text-orange-100 group-hover:text-white transition-colors duration-300">
                        <span className="font-semibold text-sm sm:text-base">Start Learning</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Bottom decoration */}
              <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium text-center">
                  Deutsch lernen macht Spaß!
                </span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${(i + 5) * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
