"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Senior Researcher, ISRO",
    image: "/testimonial-1.png",
    quote:
      "This SAR to RGB conversion tool has revolutionized how we analyze terrain data. The accuracy and speed are unmatched by any other solution we've tried.",
    stars: 5,
  },
  {
    id: 2,
    name: "Prof. Rajesh Kumar",
    role: "Remote Sensing Expert, IIT Delhi",
    image: "/testimonial-2.png",
    quote:
      "My research team has been able to identify critical geographical features much faster with this tool. The intuitive interface makes it accessible even to junior researchers.",
    stars: 5,
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Environmental Scientist, NRSC",
    image: "/testimonial-3.png",
    quote:
      "We've been using this technology to monitor forest cover changes across the Western Ghats. The RGB conversion provides clarity that was previously impossible with raw SAR data.",
    stars: 4,
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    role: "Disaster Management, NDMA",
    image: "/testimonial-4.png",
    quote:
      "During the recent flood response, this tool helped us quickly assess affected areas through cloud cover. It's become an essential part of our emergency response toolkit.",
    stars: 5,
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextTestimonial()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="p-8 h-full">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#0066b3]/20 flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.stars ? "text-[#FF9933] fill-[#FF9933]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              activeIndex === index ? "bg-[#0066b3]" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border border-gray-200 shadow-md md:flex hidden"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous testimonial</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-white border border-gray-200 shadow-md md:flex hidden"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next testimonial</span>
      </Button>
    </div>
  )
}

