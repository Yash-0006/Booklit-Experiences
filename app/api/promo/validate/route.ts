import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PromoCode from "@/models/PromoCode"

export async function POST(request: Request) {
  try {
    await connectDB()
    const { code } = await request.json()

    if (!code || typeof code !== "string") {
      return NextResponse.json({ valid: false, message: "Invalid promo code" }, { status: 400 })
    }

    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    })

    if (!promoCode) {
      return NextResponse.json({
        valid: false,
        message: "Promo code not found or expired",
      })
    }

    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return NextResponse.json({
        valid: false,
        message: "Promo code usage limit exceeded",
      })
    }

    return NextResponse.json({
      valid: true,
      code: promoCode.code,
      discount: promoCode.discount,
    })

  } catch (error) {
    console.error('Error validating promo code:', error)
    return NextResponse.json({ valid: false, message: "Error validating promo code" }, { status: 500 })
  }
}
