"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description: string
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/gallery/campus-main.jpg",
    alt: "University of Duisburg-Essen Campus",
    title: "UDE Campus",
    description: "Beautiful campus grounds at University of Duisburg-Essen",
  },
  {
    id: "2",
    src: "/images/gallery/engineering-lab.jpg",
    alt: "Engineering Laboratory",
    title: "Engineering Labs",
    description: "State-of-the-art engineering laboratories and equipment",
  },
  {
    id: "3",
    src: "/images/gallery/students-studying.jpg",
    alt: "Students studying together",
    title: "Study Groups",
    description: "International students collaborating and learning together",
  },
  {
    id: "4",
    src: "/images/gallery/germany-architecture.jpg",
    alt: "German Architecture",
    title: "Life in Germany",
    description: "Beautiful German architecture and city life",
  },
  {
    id: "5",
    src: "/images/gallery/library-study.jpg",
    alt: "University Library",
    title: "Library Resources",
    description: "Modern library facilities for research and study",
  },
  {
    id: "6",
    src: "/images/gallery/international-students.jpg",
    alt: "International Students",
    title: "Global Community",
    description: "Diverse international student community at ISE",
  },
  {
    id: "7",
    src: "/images/gallery/graduation-ceremony.jpg",
    alt: "Graduation Ceremony",
    title: "Graduation Day",
    description: "Celebrating achievements at graduation ceremony",
  },
  {
    id: "8",
    src: "/images/gallery/student-presentation.jpg",
    alt: "Student Presentation",
    title: "Academic Presentations",
    description: "Students presenting their research and projects",
  },
  {
    id: "9",
    src: "/images/gallery/campus-winter.jpg",
    alt: "Campus in Winter",
    title: "Winter Campus",
    description: "Beautiful winter scenery on campus",
  },
  {
    id: "10",
    src: "/images/gallery/research-lab.jpg",
    alt: "Research Laboratory",
    title: "Research Facilities",
    description: "Advanced research laboratories and equipment",
  },
  {
    id: "11",
    src: "/images/gallery/student-cafeteria.jpg",
    alt: "Student Cafeteria",
    title: "Campus Dining",
    description: "Modern cafeteria and dining facilities",
  },
  {
    id: "12",
    src: "/images/gallery/campus-spring.jpg",
    alt: "Campus in Spring",
    title: "Spring Campus",
    description: "Vibrant campus life during spring season",
  },
]

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") closeModal()
    }
  }

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <>
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Campus Life Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <Card
              key={image.id}
              className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 glass-effect border-blue-200 dark:border-gray-700"
              onClick={() => openModal(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <img
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <h3 className="font-semibold text-xl mb-2">{galleryImages[selectedImage].title}</h3>
              <p className="text-gray-200">{galleryImages[selectedImage].description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {selectedImage + 1} of {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
