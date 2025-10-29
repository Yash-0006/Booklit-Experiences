export interface Experience {
  id: string
  title: string
  location: string
  description: string
  price: number
  image: string
  about: string
  availableDates: string[]
  availableSlots: {
    time: string
    available: number
  }[]
}

export interface Booking {
  id: string
  bookingId: string
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  quantity: number
  fullName: string
  email: string
  phone?: string
  promoCode?: string
  subtotal: number
  taxes: number
  discount: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface PromoCode {
  code: string
  discount: number
  valid: boolean
  message?: string
}