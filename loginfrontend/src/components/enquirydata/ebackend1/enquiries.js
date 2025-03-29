import { NextResponse } from "next/server"

// GET handler to fetch all enquiries
export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/enquiries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch enquiries")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching enquiries:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST handler to create a new enquiry
export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch("http://localhost:5000/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Failed to create enquiry")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating enquiry:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

