"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, FlaskConical, Users, BookOpen, Globe, ChevronUp } from "lucide-react"

interface ScrollProgressIndicatorProps {
  scrollProgress: number
  currentBackground: string
}

export function ScrollProgressIndicator({ scrollProgress, currentBackground }: ScrollProgressIndicatorProps) {
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

  const getCurrentStage = () => {
    if (!currentBackground) return stages[0]

    const found = stages.find((stage) => {
      const stageName = stage.image.split("/").pop()?.split(".")[0] || ""
      return currentBackground.includes(stageName)
    })

    return found || stages[0]
  }

  const currentStage = getCurrentStage()

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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
            {/* Scroll Progress Bar */}
            <div className="mb-4">
              <div className="w-2 h-32 bg-white/20 rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full"
                  style={{ height: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />

                {/* Progress markers */}
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/40 transition-all duration-300"
                    style={{
                      bottom: `${(stage.progress / stages[stages.length - 1].progress) * 100}%`,
                      backgroundColor:
                        scrollProgress >= stage.progress / stages[stages.length - 1].progress ? "white" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Current Stage Indicator */}
            <div className="text-center">
              <motion.div
                key={currentStage.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                <div
                  className={`w-12 h-12 ${currentStage.color} rounded-full flex items-center justify-center shadow-lg mx-auto mb-2`}
                >
                  <currentStage.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-xs font-medium text-center leading-tight w-20">{currentStage.name}</p>
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <div className="text-center mt-3 pt-3 border-t border-white/20">
              <span className="text-white/80 text-xs font-mono">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>

          {/* Stage Navigation Dots */}
          <div className="mt-4 flex flex-col items-center space-y-2">
            {stages.map((stage, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection((stage.progress / stages[stages.length - 1].progress) * 0.95)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStage === stage ? `${stage.color} shadow-lg scale-125` : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title={stage.name}
              />
            ))}
          </div>

          {/* Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-white mx-auto" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
