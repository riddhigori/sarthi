import { NextResponse } from "next/server"

// GET handler to fetch all companies
export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/companies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch companies")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

