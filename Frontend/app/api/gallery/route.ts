import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/gallery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch gallery data" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

