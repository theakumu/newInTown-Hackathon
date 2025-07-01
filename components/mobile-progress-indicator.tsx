"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, FlaskConical, Users, BookOpen, Globe } from "lucide-react"

interface MobileProgressIndicatorProps {
  currentBackground: string
  scrollProgress: number
}

export function MobileProgressIndicator({ currentBackground, scrollProgress }: MobileProgressIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(scrollProgress > 0.05 && scrollProgress < 0.95)
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

  const currentStage =
    stages.find((stage) => currentBackground.includes(stage.image.split("/").pop()?.split(".")[0] || "")) || stages[0]
  const currentStageIndex = stages.indexOf(currentStage)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
        >
          <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3">
              {/* Current Stage Icon */}
              <div className={`${currentStage.color} w-8 h-8 rounded-full flex items-center justify-center`}>
                <currentStage.icon className="w-4 h-4 text-white" />
              </div>

              {/* Stage Info */}
              <div className="flex-1">
                <p className="text-xs text-white font-medium">{currentStage.name}</p>
                <div className="w-16 h-1 bg-white/20 rounded-full mt-1">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Progress Percentage */}
              <div className="text-xs text-white/80 font-mono">{Math.round(scrollProgress * 100)}%</div>

              {/* Stage Dots */}
              <div className="flex space-x-1">
                {stages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStageIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
