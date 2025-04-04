"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface ImageComparisonProps {
  originalSrc: string
  convertedSrc: string
}

export default function ImageComparison({ originalSrc, convertedSrc }: ImageComparisonProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setPosition(newPosition)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setPosition(newPosition)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] select-none cursor-col-resize rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className="absolute inset-0 z-10">
        <Image src={originalSrc || "/placeholder.svg"} alt="Original SAR Image" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 z-20 overflow-hidden" style={{ width: `${position}%` }}>
        <Image
          src={convertedSrc || "/placeholder.svg"}
          alt="Converted RGB Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-col-resize" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
          <div className="w-0.5 h-4 bg-gray-400 mx-0.5"></div>
          <div className="w-0.5 h-4 bg-gray-400 mx-0.5"></div>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 z-40 bg-black/60 text-white text-xs px-2 py-1 rounded">Original SAR</div>

      <div className="absolute bottom-2 right-2 z-40 bg-black/60 text-white text-xs px-2 py-1 rounded">
        Converted RGB
      </div>
    </div>
  )
}

