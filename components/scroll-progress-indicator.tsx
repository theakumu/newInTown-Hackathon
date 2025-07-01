"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, FlaskConical, Users, BookOpen, Globe, ChevronUp } from "lucide-react"

interface ScrollProgressIndicatorProps {
  currentBackground: string
  scrollProgress: number
}

export function ScrollProgressIndicator({ currentBackground, scrollProgress }: ScrollProgressIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(scrollProgress > 0.05)
  }, [scrollProgress])

  const stages = [
    {
      name: "Campus Main",
      icon: Building2,
      color: "bg-blue-500",
      image: "/images/gallery/campus-main.jpg",
      progress: 0.15,
    },
    {
      name: "Engineering Lab",
      icon: FlaskConical,
      color: "bg-green-500",
      image: "/images/gallery/engineering-lab.jpg",
      progress: 0.35,
    },
    {
      name: "Study Groups",
      icon: Users,
      color: "bg-purple-500",
      image: "/images/gallery/students-studying.jpg",
      progress: 0.55,
    },
    {
      name: "Library",
      icon: BookOpen,
      color: "bg-orange-500",
      image: "/images/gallery/library-study.jpg",
      progress: 0.75,
    },
    {
      name: "International Community",
      icon: Globe,
      color: "bg-red-500",
      image: "/images/gallery/international-students.jpg",
      progress: 1.0,
    },
  ]

  const currentStage =
    stages.find((stage) => currentBackground.includes(stage.image.split("/").pop()?.split(".")[0] || "")) || stages[0]

  const scrollToSection = (targetProgress: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = targetProgress * maxScroll
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
        >
          
        </motion.div>
      )}
    </AnimatePresence>
  )
}
