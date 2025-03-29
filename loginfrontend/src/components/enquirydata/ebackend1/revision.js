import { NextResponse } from "next/server"

// POST handler to create a new revision
export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch("http://localhost:5000/candidates3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Failed to create revision")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating revision:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

