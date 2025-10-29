import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Booking from "@/models/Booking"
import PromoCode from "@/models/PromoCode"

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    
    console.log('Received booking data:', body)
    
    // Validate required fields
    const { experienceId, experienceTitle, date, time, quantity, fullName, email } = body
    
    console.log('Extracted fields:', { experienceId, experienceTitle, date, time, quantity, fullName, email })
    
    if (!experienceId || !experienceTitle || !date || !time || !quantity || !fullName || !email) {
      console.log('Missing required fields validation failed')
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      )
    }

    // Generate unique booking ID
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase()
    const bookingId = `BK${timestamp}${randomStr}`

    // Create new booking
    const newBooking = new Booking({
      bookingId,
      experienceId,
      experienceTitle,
      date,
      time,
      quantity,
      fullName,
      email,
      phone: body.phone || '',
      promoCode: body.promoCode || null,
      subtotal: body.subtotal || 0,
      taxes: body.taxes || 0,
      discount: body.discount || 0,
      total: body.total || 0
    })

    const savedBooking = await newBooking.save()

    // If promo code was used, increment usage count
    if (body.promoCode) {
      await PromoCode.findOneAndUpdate(
        { code: body.promoCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      )
    }

    return NextResponse.json({
      success: true,
      booking: savedBooking,
      message: "Booking created successfully"
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: "Failed to create booking" }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find()
      .populate('experienceId', 'title location price')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" }, 
      { status: 500 }
    )
  }
}
