import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    
    const experience = await Experience.findById(id)
    
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    // Transform _id to id for frontend compatibility
    const transformedExperience = {
      id: experience._id.toString(),
      title: experience.title,
      location: experience.location,
      description: experience.description,
      price: experience.price,
      image: experience.image,
      about: experience.about,
      availableDates: experience.availableDates,
      availableSlots: experience.availableSlots
    }

    return NextResponse.json(transformedExperience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json(
      { error: "Failed to fetch experience" }, 
      { status: 500 }
    )
  }
}
