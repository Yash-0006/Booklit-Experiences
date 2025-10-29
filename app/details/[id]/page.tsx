"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { Experience } from "@/types"
import { LoadingWithText } from "@/components/ui/spinner"

export default function DetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      fetchExperience()
    }
  }, [id])

  const fetchExperience = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/experiences/${id}`)
      const data = await response.json()
      setExperience(data)
      if (data.availableDates.length > 0) {
        setSelectedDate(data.availableDates[0])
      }
      if (data.availableSlots.length > 0) {
        setSelectedTime(data.availableSlots[0].time)
      }
    } catch (error) {
      console.error("Failed to fetch experience:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time")
      return
    }

    // Check if selected slot is available
    const selectedSlot = experience?.availableSlots.find(slot => slot.time === selectedTime)
    if (!selectedSlot || selectedSlot.available === 0) {
      alert("Selected time slot is sold out. Please choose another time.")
      return
    }

    if (quantity > selectedSlot.available) {
      alert(`Only ${selectedSlot.available} spots available for this slot. Please reduce quantity.`)
      return
    }

    const bookingData = {
      experienceId: id,
      experienceTitle: experience?.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      price: experience?.price || 0,
    }

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))
    router.push("/checkout")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-96">
          <LoadingWithText text="Loading experience details..." />
        </div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-2xl text-muted-foreground mb-4">😕</div>
          <div className="text-lg text-foreground mb-2">Experience not found</div>
          <div className="text-muted-foreground mb-4">The experience you're looking for doesn't exist.</div>
          <button onClick={() => router.push("/")} className="btn-yellow">
            Browse Experiences
          </button>
        </div>
      </div>
    )
  }

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground mb-6 hover:text-muted-foreground"
        >
          <ChevronLeft size={20} />
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 sm:h-80 w-full bg-gray-200 rounded-lg overflow-hidden mb-6">
              <Image
                src={experience.image || "/placeholder.svg"}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{experience.title}</h1>
            <p className="text-foreground mb-6 text-sm sm:text-base">{experience.description}</p>

            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Choose date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {experience.availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-3 py-2 rounded font-medium transition text-sm ${
                      selectedDate === date
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-gray-200 text-foreground hover:bg-gray-300"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Choose time</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {experience.availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={slot.available === 0}
                    className={`p-3 rounded-lg font-medium transition relative ${
                      selectedTime === slot.time
                        ? "bg-secondary text-secondary-foreground"
                        : slot.available === 0
                          ? "bg-gray-200 text-muted-foreground cursor-not-allowed opacity-50"
                          : "bg-gray-100 text-foreground hover:bg-gray-200 border border-border"
                    }`}
                  >
                    <div className="text-sm font-semibold">{slot.time}</div>
                    <div className="text-xs mt-1">
                      {slot.available === 0 ? (
                        <span className="text-red-500">Sold Out</span>
                      ) : (
                        <span className="text-green-600">{slot.available} spots left</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">All times are in IST (GMT +5:30)</p>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">About</h2>
              <p className="text-foreground text-sm sm:text-base">{experience.about}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg sticky top-8">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Starts at</span>
                  <span className="font-bold text-foreground">₹{experience.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-bold text-foreground">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-foreground">₹{total}</span>
                  </div>
                </div>
              </div>
              <button onClick={handleConfirm} className="w-full btn-yellow">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
