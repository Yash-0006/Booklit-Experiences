"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { Spinner, LoadingWithText } from "@/components/ui/spinner"

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits").optional(),
  promoCode: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and safety policy"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface BookingData {
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  quantity: number
  price: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoMessage, setPromoMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      termsAccepted: false,
    },
  })

  const promoCode = watch("promoCode")

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData")
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      router.push("/")
    }
  }, [router])

  const validatePromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoMessage("Please enter a promo code")
      return
    }

    try {
      setPromoLoading(true)
      setPromoMessage("")
      const response = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      })
      const data = await response.json()

      if (data.valid) {
        setDiscount(data.discount)
        setPromoMessage(`✅ Promo code applied! Discount: ₹${data.discount}`)
      } else {
        setPromoMessage("❌ Invalid promo code")
        setDiscount(0)
      }
    } catch (error) {
      console.error("Failed to validate promo code:", error)
      setPromoMessage("❌ Error validating promo code")
    } finally {
      setPromoLoading(false)
    }
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (!bookingData) return

    try {
      setLoading(true)
      setErrorMessage("") // Clear previous errors
      const subtotal = bookingData.price * bookingData.quantity
      const taxes = Math.round(subtotal * 0.06)
      const total = subtotal + taxes - discount

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: bookingData.experienceId,
          experienceTitle: bookingData.experienceTitle,
          date: bookingData.date,
          time: bookingData.time,
          quantity: bookingData.quantity,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          promoCode: data.promoCode || null,
          subtotal,
          taxes,
          discount,
          total,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        const bookingResult = {
          id: result.booking.bookingId,
          success: true,
          message: result.message
        }
        sessionStorage.setItem("bookingResult", JSON.stringify(bookingResult))
        sessionStorage.removeItem("bookingData")
        router.push("/result")
      } else {
        // Handle different error types
        if (response.status === 409) {
          setErrorMessage(result.error || "You have already booked this experience for the selected date and time.")
        } else {
          setErrorMessage(result.error || "Booking failed. Please try again.")
        }
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setErrorMessage("Error processing booking. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-96">
          <LoadingWithText text="Loading checkout..." />
        </div>
      </div>
    )
  }

  const subtotal = bookingData.price * bookingData.quantity
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes - discount

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground mb-6 hover:text-muted-foreground"
        >
          <ChevronLeft size={20} />
          Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 bg-input border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.fullName ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 bg-input border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.email ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-3 bg-input border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary ${
                      errors.phone ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Promo code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      {...register("promoCode")}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 bg-input border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button 
                      type="button"
                      onClick={validatePromoCode} 
                      disabled={promoLoading}
                      className="btn-black disabled:opacity-50 flex items-center gap-2"
                    >
                      {promoLoading && <Spinner variant="white" size="sm" />}
                      {promoLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`mt-1 text-sm ${promoMessage.includes("✅") ? "text-green-600" : "text-red-500"}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("termsAccepted")}
                    className="w-4 h-4 mt-1 rounded border-border"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground">
                    I agree to the terms and safety policy <span className="text-red-500">*</span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="hidden"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg sticky top-8">
              <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{bookingData.experienceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Qty</span>
                  <span className="font-medium text-foreground">{bookingData.quantity}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium text-foreground">₹{taxes}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-green-600">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-foreground">₹{total}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleSubmit(onSubmit)} 
                disabled={loading} 
                className="w-full btn-yellow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Spinner variant="white" size="sm" />}
                {loading ? "Processing..." : "Pay and Confirm"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
