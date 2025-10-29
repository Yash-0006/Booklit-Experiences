# BookIt - Travel Experience Booking Platform 

  
## 🌐 **Live Demo**
**🔗 [View Live Application](https://booklit-experiences.vercel.app/)**


## 🚀 **Features** 

- **Experience Browsing**: Browse 12+ curated travel experiences with search functionality
- **Real-time Booking**: Interactive date/time slot selection with availability tracking
- **Promo Code System**: Validate and apply discount codes with usage tracking
- **Form Validation**: Client-side validation using React Hook Form and Zod
- **Modern Stack**: React + TypeScript with Next.js 16
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Database Persistence**: MongoDB integration with auto-generated booking IDs
- **Duplicate Prevention**: Prevents same email from booking identical slots
- **Loading States**: Smooth yellow loading spinners throughout the app
- **User Experience**: Loading states, error handling, and intuitive navigation
- **Real-time Updates**: Dynamic slot availability and pricing

## 🛠 **Tech Stack**

### Frontend
- **Framework**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS with custom design system
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Images**: Next.js Image optimization with Unsplash

### Backend
- **API Routes**: RESTful APIs built with Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Server-side validation for all endpoints
- **Deployment**: Vercel-ready configuration

## 📁 **Project Structure**

```
booklit/
├── app/                     # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── experiences/     # Experience endpoints
│   │   ├── bookings/        # Booking management
│   │   └── promo/validate/  # Promo code validation
│   ├── checkout/            # Checkout flow
│   ├── details/[id]/        # Experience details
│   └── result/              # Booking confirmation
├── components/              # Reusable components
│   ├── ui/                  # UI components (spinner only)
│   └── header.tsx           # Main navigation
├── lib/                     # Utility functions
│   ├── mongodb.ts           # Database connection
│   └── seedDatabase.ts      # Data seeding
├── models/                  # Mongoose schemas
│   ├── Experience.ts        # Experience model
│   ├── Booking.ts           # Booking model
│   └── PromoCode.ts         # Promo code model
├── types/                   # TypeScript interfaces
└── .env.local              # Environment variables
```

## ⚙️ **Installation & Setup**

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm, yarn, or pnpm

### 1. Clone and Install
```bash
git clone https://github.com/Yash-0006/Booklit-Experiences.git
cd booklit-experiences
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/booklit
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booklit
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ **Database Features**

- **Auto-seeding**: Automatically populates 12 experiences and 6 promo codes
- **Connection Caching**: Optimized MongoDB connections
- **Validation**: Schema-level data validation
- **Relationships**: Experience-booking relationships with population
- **Indexing**: Unique booking IDs and promo codes

## 🧪 **Available Promo Codes**

- `SAVE10` - ₹100 discount
- `FLAT100` - ₹100 discount  
- `SAVE20` - ₹200 discount
- `WELCOME` - ₹50 discount
- `NEWUSER` - ₹150 discount
- `HOLIDAY` - ₹300 discount

## � **API Endpoints**

### Experiences
- `GET /api/experiences` - List all experiences
- `GET /api/experiences/[id]` - Get specific experience details

### Bookings  
- `POST /api/bookings` - Create new booking

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

## 🎯 **Key Features**

### Experience Browsing
- Search and filter experiences
- Responsive grid layout
- High-quality images from Unsplash
- Real-time availability display

### Booking Flow
- Date and time slot selection
- Quantity management with availability checks
- Form validation with error messages
- Promo code system with instant feedback

### User Experience
- Loading skeletons and states
- Error handling with user-friendly messages
- Sold-out indicators
- Mobile-optimized interface

## 💾 **Data Models**

### Experience Object
```typescript
interface Experience {
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
```

### Booking Object
```typescript
interface Booking {
  id: string
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
}
```

## 🎨 **Design System**

### Colors
- **Primary**: Various shades for text and backgrounds
- **Secondary**: Yellow (#FFD700) for CTAs and highlights
- **Accent**: Pink (#FF1493) for branding elements

### Typography
- Clean, readable fonts with proper hierarchy
- Responsive text sizes for mobile compatibility

### Components
- Consistent button styles (`.btn-yellow`, `.btn-black`, `.btn-gray`)
- Form inputs with focus states
- Card layouts with hover effects

## 🚀 **Deployment**

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Environment Variables
- `MONGODB_URI` - MongoDB connection string

## 🧪 **Testing the Application**

### Complete Booking Flow Test
1. **Home Page**: Browse experiences, use search functionality
2. **Details Page**: Select date, time slot, and quantity
3. **Checkout Page**: Fill form, apply promo code (try: SAVE10, FLAT100)
4. **Result Page**: View booking confirmation

### Promo Codes for Testing
- `SAVE10` - ₹100 discount
- `FLAT100` - ₹100 discount  
- `SAVE20` - ₹200 discount
- `WELCOME` - ₹50 discount

## 🔧 **Development Commands**

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 📱 **Mobile Optimization**

- Responsive grid layouts (1-2-4 columns)
- Touch-friendly buttons and inputs
- Optimized images with Next.js Image component
- Mobile-first CSS approach

## 🔒 **Security Features**

- Input validation on both client and server
- XSS protection through React's built-in security
- Duplicate booking prevention
- Form validation with Zod schemas

## 📱 **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🧪 **Production Checklist**

- ✅ Database integration complete
- ✅ Form validation implemented  
- ✅ Error handling added
- ✅ Loading states optimized
- ✅ Responsive design verified
- ✅ Unused components removed
- ✅ Performance optimized

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Built with ❤️ for seamless travel experience bookings**
