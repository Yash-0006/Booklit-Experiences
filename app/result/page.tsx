"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { CheckCircle } from "lucide-react"
import { LoadingWithText } from "@/components/ui/spinner"

interface BookingResult {
  id: string
  success: boolean
  message: string
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<BookingResult | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("bookingResult")
    if (data) {
      setResult(JSON.parse(data))
    } else {
      router.push("/")
    }
  }, [router])

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-96">
          <LoadingWithText text="Loading booking details..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <CheckCircle size={80} className="text-green-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Booking Confirmed</h1>
          <p className="text-lg text-muted-foreground mb-8">Ref ID: {result.id}</p>
          <button
            onClick={() => {
              sessionStorage.removeItem("bookingResult")
              router.push("/")
            }}
            className="btn-gray"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  )
}
