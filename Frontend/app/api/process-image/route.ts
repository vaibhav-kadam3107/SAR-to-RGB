import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Forward the request to the Flask backend
    const response = await fetch(`${API_URL}/process`, {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Failed to process image" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

