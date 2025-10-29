import connectDB from '../lib/mongodb'
import Experience from '../models/Experience'
import PromoCode from '../models/PromoCode'

const seedData = [
  {
    title: "River Rafting Adventure",
    location: "Rishikesh, Uttarakhand",
    description: "Experience the thrill of white water rafting on the Ganges with professional guides.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&h=600&fit=crop&q=80",
    about: "Experience the thrill of white water rafting on the Ganges. Professional guides, safety equipment, and scenic routes through the Himalayas. Minimum age 12.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01", "2025-11-02"],
    availableSlots: [
      { time: "08:00 am", available: 4 },
      { time: "10:00 am", available: 2 },
      { time: "12:00 pm", available: 5 },
      { time: "2:00 pm", available: 0 },
    ],
  },
  {
    title: "Kayaking Experience",
    location: "Udupi, Karnataka", 
    description: "Peaceful kayaking through backwaters. Perfect for beginners and families.",
    price: 899,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    about: "Explore serene backwaters with experienced guides. Equipment provided, safety briefing included. Minimum age 8.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "07:00 am", available: 3 },
      { time: "9:00 am", available: 5 },
      { time: "11:00 am", available: 2 },
      { time: "1:00 pm", available: 1 },
    ],
  },
  {
    title: "Nandi Hills Sunrise Trek",
    location: "Bangalore, Karnataka",
    description: "Early morning trek to catch the magnificent sunrise. Photography friendly experience.",
    price: 699,
    image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop&q=80",
    about: "Watch the sunrise from the hills with expert guides. Includes breakfast and photography tips. All fitness levels welcome.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31"],
    availableSlots: [
      { time: "04:30 am", available: 5 },
      { time: "05:00 am", available: 3 },
      { time: "05:30 am", available: 2 },
    ],
  },
  {
    title: "Coffee Plantation Tour",
    location: "Coorg, Karnataka",
    description: "Immersive coffee plantation experience with local farmers and tasting sessions.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688bcf566?w=800&h=600&fit=crop&q=80",
    about: "Explore coffee plantations with local experts. Includes coffee tasting, lunch, and plantation walk. Learn about coffee processing.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "08:00 am", available: 4 },
      { time: "10:00 am", available: 5 },
      { time: "2:00 pm", available: 3 },
    ],
  },
  {
    title: "Mangrove Boat Safari",
    location: "Sundarbans, West Bengal",
    description: "Wildlife boat safari through the famous Sundarbans mangrove forests.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
    about: "Scenic boat cruise through mangroves. Wildlife spotting including tigers, crocodiles, and birds. Includes lunch and guide.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31"],
    availableSlots: [
      { time: "06:00 am", available: 2 },
      { time: "8:00 am", available: 4 },
      { time: "10:00 am", available: 5 },
    ],
  },
  {
    title: "Bungee Jumping",
    location: "Manali, Himachal Pradesh",
    description: "Ultimate adrenaline rush with professional bungee jumping from 83 meters height.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=800&h=600&fit=crop&q=80",
    about: "Thrilling bungee jumping experience with certified instructors. Medical clearance required. Minimum age 18.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "09:00 am", available: 3 },
      { time: "11:00 am", available: 4 },
      { time: "2:00 pm", available: 2 },
    ],
  },
  {
    title: "Desert Camel Safari",
    location: "Jaisalmer, Rajasthan",
    description: "Traditional camel safari through the golden sand dunes of the Thar Desert.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop&q=80",
    about: "Experience the desert on camelback. Includes cultural performances, traditional dinner, and overnight camping under stars.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31"],
    availableSlots: [
      { time: "03:00 pm", available: 5 },
      { time: "04:00 pm", available: 3 },
      { time: "05:00 pm", available: 4 },
    ],
  },
  {
    title: "Scuba Diving",
    location: "Andaman Islands",
    description: "Professional scuba diving experience in crystal clear waters with marine life.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop&q=80",
    about: "Explore underwater coral reefs and marine life. PADI certified instructors, all equipment provided. Basic swimming required.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "08:00 am", available: 2 },
      { time: "11:00 am", available: 3 },
      { time: "2:00 pm", available: 1 },
    ],
  },
  {
    title: "Mountain Biking",
    location: "Leh, Ladakh",
    description: "High-altitude mountain biking adventure through scenic Himalayan landscapes.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    about: "Challenging mountain biking routes through breathtaking landscapes. Bikes and safety gear provided. Good fitness level required.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31"],
    availableSlots: [
      { time: "07:00 am", available: 4 },
      { time: "09:00 am", available: 3 },
      { time: "11:00 am", available: 2 },
    ],
  },
  {
    title: "Wildlife Photography Safari",
    location: "Jim Corbett, Uttarakhand",
    description: "Professional wildlife photography tour in India's oldest national park.",
    price: 2899,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop&q=80",
    about: "Guided wildlife photography experience with professional photographers. Spot tigers, elephants, and exotic birds. Camera tips included.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "05:30 am", available: 4 },
      { time: "06:00 am", available: 2 },
      { time: "3:30 pm", available: 3 },
    ],
  },
  {
    title: "Rock Climbing",
    location: "Hampi, Karnataka",
    description: "Rock climbing adventure among ancient boulder formations and historical ruins.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1551524164-6cf23ac8025f?w=800&h=600&fit=crop&q=80",
    about: "Climb ancient granite boulders with certified instructors. All equipment provided. Beginner to advanced routes available.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31"],
    availableSlots: [
      { time: "07:00 am", available: 5 },
      { time: "09:00 am", available: 4 },
      { time: "4:00 pm", available: 3 },
    ],
  },
  {
    title: "Paragliding Adventure",
    location: "Bir Billing, Himachal Pradesh",
    description: "Tandem paragliding from one of the world's best paragliding destinations.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&q=80",
    about: "Soar through the skies with experienced pilots. Breathtaking views of the Himalayas. GoPro footage included.",
    availableDates: ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"],
    availableSlots: [
      { time: "09:00 am", available: 3 },
      { time: "11:00 am", available: 5 },
      { time: "1:00 pm", available: 2 },
    ],
  },
]

const promoData = [
  { code: "SAVE10", discount: 100, isActive: true },
  { code: "FLAT100", discount: 100, isActive: true },
  { code: "SAVE20", discount: 200, isActive: true },
  { code: "WELCOME", discount: 50, isActive: true },
  { code: "NEWUSER", discount: 150, isActive: true },
  { code: "HOLIDAY", discount: 300, isActive: true }
]

export default async function seedDatabase() {
  try {
    await connectDB()
    
    // Check if data already exists
    const existingExperiences = await Experience.countDocuments()
    const existingPromoCodes = await PromoCode.countDocuments()
    
    if (existingExperiences === 0) {
      // Clear and seed experiences
      await Experience.deleteMany({})
      await Experience.insertMany(seedData)
      console.log('Experiences seeded successfully!')
    }
    
    if (existingPromoCodes === 0) {
      // Clear and seed promo codes
      await PromoCode.deleteMany({})
      await PromoCode.insertMany(promoData)
      console.log('Promo codes seeded successfully!')
    }
    
    console.log('Database seeding completed!')
    return { success: true }
  } catch (error) {
    console.error('Error seeding database:', error)
    return { success: false, error }
  }
}