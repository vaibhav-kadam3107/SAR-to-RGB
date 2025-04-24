"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, AlertCircle, ImageIcon } from "lucide-react"
import ImageDropzone from "@/components/image-dropzone"
import { useToast } from "@/components/ui/use-toast"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

type ProcessingStatus = "idle" | "uploading" | "processing" | "complete" | "error"

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [comparisonHeight, setComparisonHeight] = useState(50)
  const { toast } = useToast()

  const handleFileDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setFile(file)
      setError(null)
      await processImage(file)
    }
  }

  const processImage = async (file: File) => {
    setStatus("uploading")
    setProgress(0)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      })

      clearInterval(uploadInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process image")
      }

      const data = await response.json()
      setProgress(100)
      setStatus("complete")
      setOriginalImage(`${API_URL}${data.original}`)
      setResultImage(`${API_URL}${data.processed}`)

      toast({
        title: "Image processed successfully",
        description: "Your SAR image has been converted to RGB",
      })
    } catch (error) {
      console.error("Error processing image:", error)
      setStatus("error")
      setError(error instanceof Error ? error.message : "An unknown error occurred")

      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process image",
      })
    }
  }

  const handleReset = () => {
    setFile(null)
    setStatus("idle")
    setProgress(0)
    setError(null)
    setOriginalImage(null)
    setResultImage(null)
  }

  const handleAddToGallery = () => {
    toast({
      title: "Added to gallery",
      description: "The image has been added to your gallery",
    })
  }

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a")
      link.href = resultImage
      link.download = `rgb_${file?.name || "converted_image.jpg"}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl bg-white">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 text-[#FF9933]">
          ISRO SAR to RGB Image Converter
        </h1>
        <div className="flex justify-center items-center space-x-2 text-xl font-medium">
          <span className="text-[#FF9933]">सत्यमेव</span>
          <span className="text-[#000080]">जयते</span>
          <span className="text-[#138808]">India</span>
        </div>
        <p className="text-gray-600 mt-2">Upload your SAR image and our AI will convert it to RGB format</p>
        <div className="w-full h-1 mt-4 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded" />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 border-2 border-[#FF9933] rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#FF9933]">Upload Image</h2>

          {status === "idle" ? (
            <ImageDropzone onDrop={handleFileDrop} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{file?.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0") + " MB"}
                  </p>
                </div>
              </div>

              {(status === "uploading" || status === "processing") && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{status === "uploading" ? "Uploading..." : "Processing..."}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-[#138808]/30" />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-[#FF9933] text-[#FF9933]"
                  disabled={status === "processing"}
                >
                  {status === "complete" ? "Process Another Image" : "Cancel"}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 border-2 border-[#138808] rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#138808]">Results</h2>

          {status === "complete" && originalImage && resultImage ? (
            <div className="space-y-6">
              <div
                className="relative w-full h-[400px] overflow-hidden rounded-lg border shadow-md bg-gray-100"
                onMouseMove={(e) => {
                  if (e.buttons !== 1) return
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
                  setComparisonHeight((x / rect.width) * 100)
                }}
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
                  setComparisonHeight((x / rect.width) * 100)
                }}
                onTouchMove={(e) => {
                  e.preventDefault()
                  const touch = e.touches[0]
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left))
                  setComparisonHeight((x / rect.width) * 100)
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  const touch = e.touches[0]
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left))
                  setComparisonHeight((x / rect.width) * 100)
                }}
              >
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100">
                  {/* Original Image (Before - SAR) */}
                  <img
                    src={originalImage}
                    alt="SAR Image (Before)"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Processed Image (After - RGB) with clip-path */}
                  <img
                    src={resultImage}
                    alt="RGB Image (After)"
                    className="absolute inset-0 w-full h-full object-contain z-10"
                    style={{
                      clipPath: `inset(0 ${100 - comparisonHeight}% 0 0)`,
                    }}
                  />
                </div>

                {/* Vertical divider line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#FF9933] z-20 cursor-col-resize"
                  style={{ left: `${comparisonHeight}%` }}
                />

                {/* Slider Handle */}
                <div
                  className="absolute flex items-center justify-center w-8 h-8 -ml-4 bg-white rounded-full shadow-md cursor-col-resize z-40 border-2 border-[#FF9933] hover:border-[#138808] transition-colors"
                  style={{
                    left: `${comparisonHeight}%`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 7L2 12L8 17"
                      stroke="#000080"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 7L22 12L16 17"
                      stroke="#138808"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* "Before" label */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium z-20">
                  Before (SAR)
                </div>

                {/* "After" label */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium z-20">
                  After (RGB)
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-[#000080] hover:bg-[#000066] text-white" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download RGB Image
                </Button>
                <Button
                  variant="outline"
                  className="border-[#138808] text-[#138808]"
                  onClick={handleAddToGallery}
                >
                  Add to Gallery
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-[300px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                <p>Processed image will appear here</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}