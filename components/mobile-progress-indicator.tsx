"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, FlaskConical, Users, BookOpen, Globe } from "lucide-react"

interface MobileProgressIndicatorProps {
  scrollProgress: number
  currentBackground: string
}

export function MobileProgressIndicator({ scrollProgress, currentBackground }: MobileProgressIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(scrollProgress > 0.05)
  }, [scrollProgress])

  const stages = [
    {
      name: "Campus",
      icon: Building2,
      color: "bg-blue-500",
      image: "/images/gallery/campus-main.jpg",
    },
    {
      name: "Lab",
      icon: FlaskConical,
      color: "bg-green-500",
      image: "/images/gallery/engineering-lab.jpg",
    },
    {
      name: "Study",
      icon: Users,
      color: "bg-purple-500",
      image: "/images/gallery/students-studying.jpg",
    },
    {
      name: "Library",
      icon: BookOpen,
      color: "bg-orange-500",
      image: "/images/gallery/library-study.jpg",
    },
    {
      name: "Community",
      icon: Globe,
      color: "bg-red-500",
      image: "/images/gallery/international-students.jpg",
    },
  ]

  const getCurrentStage = () => {
    if (!currentBackground) return stages[0]

    const found = stages.find((stage) => {
      const stageName = stage.image.split("/").pop()?.split(".")[0] || ""
      return currentBackground.includes(stageName)
    })

    return found || stages[0]
  }

  const currentStage = getCurrentStage()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-2xl flex items-center space-x-3">
            <div className={`w-8 h-8 ${currentStage.color} rounded-full flex items-center justify-center`}>
              <currentStage.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm font-medium">{currentStage.name}</span>
              <span className="text-white/60 text-xs">•</span>
              <span className="text-white/80 text-xs font-mono">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Stage dots */}
          <div className="flex justify-center space-x-1 mt-2">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentStage === stage ? `${stage.color}` : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
