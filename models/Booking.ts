import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const BookingSchema: Schema = new Schema({
  bookingId: {
    type: String,
    unique: true,
    required: false // Generated via API route
  },
  experienceId: {
    type: String,
    required: [true, 'Experience ID is required'],
    ref: 'Experience'
  },
  experienceTitle: {
    type: String,
    required: [true, 'Experience title is required']
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  promoCode: {
    type: String,
    trim: true,
    uppercase: true
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  taxes: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

// Create compound index for email, experienceId, date, and time to prevent duplicates
BookingSchema.index({ email: 1, experienceId: 1, date: 1, time: 1 }, { unique: true })

// Create a unique booking ID when saving
BookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase()
    this.bookingId = `BK${timestamp}${randomStr}`
  }
  next()
})

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)