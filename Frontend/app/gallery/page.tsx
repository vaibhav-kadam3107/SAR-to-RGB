"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, X, Calendar, Clock, MapPin, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ImageItem {
  id: string
  title: string
  originalSrc: string
  convertedSrc: string
  date: string
  time: string
  location: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [activeTab, setActiveTab] = useState<"converted" | "original">("converted")
  const [galleryItems, setGalleryItems] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGalleryData()
  }, [])

  const fetchGalleryData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/gallery")

      if (!response.ok) {
        throw new Error("Failed to fetch gallery data")
      }

      const data = await response.json()

      // Transform the data into the format we need
      const transformedData: ImageItem[] = data.images.map((item: any, index: number) => ({
        id: `img-${index}`,
        title: item.filename || `SAR Image ${index + 1}`,
        originalSrc: `${API_URL}${item.original}`,
        convertedSrc: `${API_URL}${item.processed}`,
        date: item.date || new Date().toLocaleDateString(),
        time: item.time || new Date().toLocaleTimeString(),
        location: item.location || "ISRO, India",
      }))

      setGalleryItems(transformedData)
    } catch (error) {
      console.error("Error fetching gallery data:", error)
      setError(error instanceof Error ? error.message : "Failed to load gallery")
    } finally {
      setLoading(false)
    }
  }

  const openImageDetails = (image: ImageItem) => {
    setSelectedImage(image)
  }

  const closeImageDetails = () => {
    setSelectedImage(null)
  }

  const handleDownload = (url: string, isOriginal: boolean) => {
    const link = document.createElement("a")
    link.href = url
    link.download = `${isOriginal ? "original" : "rgb"}_${selectedImage?.title || "image.jpg"}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-[#0066b3] animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading gallery...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Image Gallery</h1>
        </div>
        <Card className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Error Loading Gallery</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button onClick={fetchGalleryData} className="bg-[#0066b3] hover:bg-[#004c8c]">
            Try Again
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Image Gallery</h1>
        <p className="text-gray-600">Browse your converted SAR to RGB images</p>
      </div>

      {galleryItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openImageDetails(item)}
            >
              <div className="relative h-48">
                <Image
                  src={item.convertedSrc || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized // Use this for external images
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{item.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Image src="/placeholder.svg?height=32&width=32" alt="Empty gallery" width={32} height={32} />
          </div>
          <h3 className="text-xl font-medium mb-2">No images yet</h3>
          <p className="text-gray-500 mb-6">Start converting SAR images to see them in your gallery</p>
          <Button asChild className="bg-[#0066b3] hover:bg-[#004c8c]">
            <Link href="/convert">Convert Images</Link>
          </Button>
        </Card>
      )}

      {/* Image Details Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && closeImageDetails()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 flex flex-row items-center justify-between">
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={closeImageDetails}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "converted" | "original")}>
            <div className="px-4 border-b">
              <TabsList>
                <TabsTrigger value="converted">RGB Image</TabsTrigger>
                <TabsTrigger value="original">Original SAR</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="converted" className="m-0">
              <div className="relative h-[60vh]">
                {selectedImage && (
                  <Image
                    src={selectedImage.convertedSrc || "/placeholder.svg"}
                    alt={`${selectedImage.title} (RGB)`}
                    fill
                    className="object-contain"
                    unoptimized // Use this for external images
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="original" className="m-0">
              <div className="relative h-[60vh]">
                {selectedImage && (
                  <Image
                    src={selectedImage.originalSrc || "/placeholder.svg"}
                    alt={`${selectedImage.title} (SAR)`}
                    fill
                    className="object-contain"
                    unoptimized // Use this for external images
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Processed on: {selectedImage?.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Time: {selectedImage?.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Location: {selectedImage?.location}</span>
                </div>
              </div>

              <div className="flex justify-end items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => selectedImage && handleDownload(selectedImage.originalSrc, true)}
                >
                  <Download className="mr-2 h-4 w-4" /> Download Original
                </Button>
                <Button
                  className="bg-[#0066b3] hover:bg-[#004c8c]"
                  onClick={() => selectedImage && handleDownload(selectedImage.convertedSrc, false)}
                >
                  <Download className="mr-2 h-4 w-4" /> Download RGB
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

