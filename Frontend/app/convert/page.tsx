"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, AlertCircle, ImageIcon } from "lucide-react"
import ImageDropzone from "@/components/image-dropzone"
import ImageComparison from "@/components/image-comparison"
import { useToast } from "@/components/ui/use-toast"

type ProcessingStatus = "idle" | "uploading" | "processing" | "complete" | "error"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
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

    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Send the file to the backend
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

      // Set progress to 100% and status to complete
      setProgress(100)
      setStatus("complete")

      // Set the original and processed image URLs
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
    // The image is already saved in the gallery by the backend
    toast({
      title: "Added to gallery",
      description: "The image has been added to your gallery",
    })
  }

  const handleDownload = () => {
    if (resultImage) {
      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a")
      link.href = resultImage
      link.download = `rgb_${file?.name || "converted_image.jpg"}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Convert SAR to RGB</h1>
        <p className="text-gray-600">Upload your SAR image and our AI will convert it to RGB format</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

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
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-4">
                {status === "complete" ? (
                  <Button onClick={handleReset} variant="outline">
                    Process Another Image
                  </Button>
                ) : (
                  <Button onClick={handleReset} variant="outline" disabled={status === "processing"}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          {status === "complete" && originalImage && resultImage ? (
            <div className="space-y-6">
              <ImageComparison originalSrc={originalImage} convertedSrc={resultImage} />

              <div className="flex gap-4">
                <Button className="bg-[#0066b3] hover:bg-[#004c8c]" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download RGB Image
                </Button>
                <Button variant="outline" onClick={handleAddToGallery}>
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

