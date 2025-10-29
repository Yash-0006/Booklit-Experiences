import mongoose, { Schema, Document } from 'mongoose'

export interface IExperience extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  about: {
    type: String,
    required: [true, 'Please provide about information'],
    maxlength: [1000, 'About cannot be more than 1000 characters']
  },
  availableDates: [{
    type: String,
    required: true
  }],
  availableSlots: [{
    time: {
      type: String,
      required: true
    },
    available: {
      type: Number,
      required: true,
      min: 0
    }
  }]
}, {
  timestamps: true
})

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema)