import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, experienceId, date, time } = await request.json()
    
    if (!email || !experienceId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      )
    }

    const existingBooking = await Booking.findOne({
      email: email.toLowerCase(),
      experienceId,
      date,
      time
    })

    return NextResponse.json({
      exists: !!existingBooking,
      booking: existingBooking ? {
        bookingId: existingBooking.bookingId,
        createdAt: existingBooking.createdAt
      } : null
    })

  } catch (error) {
    console.error('Error checking booking:', error)
    return NextResponse.json(
      { error: "Failed to check booking" }, 
      { status: 500 }
    )
  }
}