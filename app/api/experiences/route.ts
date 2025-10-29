import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience from "@/models/Experience"
import seedDatabase from "@/lib/seedDatabase"

export async function GET() {
  try {
    await connectDB()
    
    // Check if experiences exist, if not seed the database
    const count = await Experience.countDocuments()
    if (count === 0) {
      await seedDatabase()
    }
    
    const experiences = await Experience.find({}).sort({ createdAt: -1 })
    
    // Transform _id to id for frontend compatibility
    const transformedExperiences = experiences.map(exp => ({
      id: exp._id.toString(),
      title: exp.title,
      location: exp.location,
      description: exp.description,
      price: exp.price,
      image: exp.image,
      about: exp.about,
      availableDates: exp.availableDates,
      availableSlots: exp.availableSlots
    }))
    
    return NextResponse.json(transformedExperiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: "Failed to fetch experiences" }, 
      { status: 500 }
    )
  }
}
