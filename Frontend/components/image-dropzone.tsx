"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void
}

export default function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles)
    },
    [onDrop],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "image/*": [".tif", ".tiff", ".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
    maxSize: 16 * 1024 * 1024, // 16MB max file size
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium mb-1">Drag & drop your SAR image here</p>
      <p className="text-sm text-gray-500 mb-4">or click to browse files (TIF, JPEG, PNG)</p>
      <p className="text-xs text-gray-400">Maximum file size: 16MB</p>
    </div>
  )
}

