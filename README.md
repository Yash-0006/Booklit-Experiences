# BookIt - Travel Experience Booking Platform# BookIt: Experiences & Slots

## **Demo** : 


## 🚀 **Features**

- **Experience Browsing**: Browse 12+ curated travel experiences with search functionality## 🌟 Features

- **Real-time Booking**: Interactive date/time slot selection with availability tracking

- **Promo Code System**: Validate and apply discount codes with usage tracking### Frontend

- **Form Validation**: Client-side validation using React Hook Form and Zod- **Modern Stack**: React + TypeScript with Next.js 16

- **Responsive Design**: Mobile-first design with TailwindCSS
- **Database Persistence**: MongoDB integration with auto-generated booking IDs
- **Form Validation**: React Hook Form with Zod validation
- **Loading States**: Smooth yellow loading spinners throughout the app
- **User Experience**: Loading states, error handling, and intuitive navigation
- **Real-time Updates**: Dynamic slot availability and pricing

## 🛠 **Tech Stack**

### Frontend
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS with custom design system

### Backend
- **API Routes**: RESTful APIs built with Next.js API routes
- **Database**: MongoDB with Mongoose ODM

- **Validation**: React Hook Form + Zod schemas- **Validation**: Server-side validation for all endpoints

- **Deployment**: Vercel-ready configuration- **Promo Codes**: Dynamic discount system



## 📁 **Project Structure**### Pages

```1. **Home Page**: Browse and search travel experiences

booklit/2. **Details Page**: View experience details, select dates and time slots

├── app/                     # Next.js app directory3. **Checkout Page**: Complete booking with validated forms

│   ├── api/                 # API routes4. **Result Page**: Booking confirmation with reference ID

│   │   ├── experiences/     # Experience endpoints

│   │   ├── bookings/        # Booking management## 🚀 Live Demo

│   │   └── promo/validate/  # Promo code validation

│   ├── checkout/            # Checkout flow**Live Application**: [https://booklit-experiences.vercel.app](https://booklit-experiences.vercel.app)

│   ├── details/[id]/        # Experience details

│   └── result/              # Booking confirmation## 🛠 Tech Stack

├── components/              # Reusable components

│   ├── ui/                  # UI components (spinner only)- **Frontend**: Next.js 16, React 19, TypeScript

│   └── header.tsx           # Main navigation- **Styling**: TailwindCSS 4, CSS Variables for theming

├── lib/                     # Utility functions- **Form Handling**: React Hook Form + Zod validation

│   ├── mongodb.ts           # Database connection- **Icons**: Lucide React

│   └── seedDatabase.ts      # Data seeding- **Images**: Next.js Image optimization with Unsplash

├── models/                  # Mongoose schemas- **Deployment**: Vercel (recommended) / Render / Railway

│   ├── Experience.ts        # Experience model

│   ├── Booking.ts           # Booking model## 📦 Installation & Setup

│   └── PromoCode.ts         # Promo code model

├── types/                   # TypeScript interfaces### Prerequisites

└── .env.local              # Environment variables- Node.js 18+ 

```- npm, yarn, or pnpm package manager



## ⚙️ **Installation & Setup**### 1. Clone the Repository

```bash

### Prerequisitesgit clone https://github.com/your-username/booklit-experiences.git

- Node.js 18+cd booklit-experiences

- MongoDB (local or MongoDB Atlas)```

- npm or pnpm

### 2. Install Dependencies

### 1. Clone and Install```bash

```bash# Using npm

git clone <repository-url>npm install

cd booklit

npm install# Using yarn

```yarn install



### 2. Environment Setup# Using pnpm (recommended)

Create `.env.local`:pnpm install

```env```

MONGODB_URI=mongodb://localhost:27017/booklit

# OR for MongoDB Atlas:### 3. Environment Setup

# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booklitCreate a `.env.local` file in the root directory:

``````env

# No environment variables required for local development

### 3. Start Development Server# All data is managed in-memory for demo purposes

```bash```

npm run dev

```### 4. Development Server

```bash

Visit `http://localhost:3000`# Using npm

npm run dev

## 🗄️ **Database Features**

- **Auto-seeding**: Automatically populates 12 experiences and 6 promo codes# Using yarn

- **Connection Caching**: Optimized MongoDB connectionsyarn dev

- **Validation**: Schema-level data validation

- **Relationships**: Experience-booking relationships with population# Using pnpm

- **Indexing**: Unique booking IDs and promo codespnpm dev

```

## 🧪 **Available Promo Codes**

- `SAVE10` - ₹100 discountOpen [http://localhost:3000](http://localhost:3000) in your browser.

- `FLAT100` - ₹100 discount  

- `SAVE20` - ₹200 discount## 🏗 Project Structure

- `WELCOME` - ₹50 discount

- `NEWUSER` - ₹150 discount```

- `HOLIDAY` - ₹300 discountbooklit/

├── app/                    # Next.js App Router

## 🚀 **Deployment**│   ├── globals.css        # Global styles and CSS variables

│   ├── layout.tsx         # Root layout component

### Vercel (Recommended)│   ├── page.tsx           # Home page (experiences listing)

```bash│   ├── api/               # API routes

npm run build│   │   ├── experiences/   # Experience data endpoints

vercel --prod│   │   ├── bookings/      # Booking management

```│   │   └── promo/         # Promo code validation

│   ├── details/[id]/      # Experience details page

### Environment Variables│   ├── checkout/          # Booking checkout page

- `MONGODB_URI` - MongoDB connection string│   └── result/            # Booking confirmation page

├── components/            # Reusable UI components

## 🧪 **Production Checklist**│   ├── header.tsx         # Navigation header

- ✅ Database integration complete│   └── ui/                # UI component library

- ✅ Form validation implemented  ├── hooks/                 # Custom React hooks

- ✅ Error handling added├── lib/                   # Utility functions

- ✅ Loading states optimized└── public/                # Static assets

- ✅ Responsive design verified```

- ✅ Unused components removed

- ✅ Performance optimized## 🔧 API Endpoints



## 📱 **Browser Support**### Experiences

- Chrome 90+- `GET /api/experiences` - List all experiences

- Firefox 88+- `GET /api/experiences/[id]` - Get specific experience details

- Safari 14+

- Edge 90+### Bookings  

- `POST /api/bookings` - Create new booking

---

### Promo Codes

**Built with ❤️ using Next.js 16 and React 19**- `POST /api/promo/validate` - Validate promo code

## 🎯 Key Features

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

## 💾 Data Model

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

## 🎨 Design System

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

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on every push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables
No additional environment variables required for production deployment.

## 🧪 Testing the Application

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

## 🔧 Development Commands

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

## 📱 Mobile Optimization

- Responsive grid layouts (1-2-4 columns)
- Touch-friendly buttons and inputs
- Optimized images with Next.js Image component
- Mobile-first CSS approach

## 🔒 Security Features

- Input validation on both client and server
- XSS protection through React's built-in security
- SQL injection prevention (no database queries)
- Form validation with Zod schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for high-quality experience images
- [Lucide React](https://lucide.dev) for beautiful icons
- [TailwindCSS](https://tailwindcss.com) for utility-first styling
- [Next.js](https://nextjs.org) for the amazing React framework

---

**Built with ❤️ for seamless travel experience bookings**