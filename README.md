# REVURA - Private Auto Auctions

An exclusive, invitation-only auction platform for rare and limited supercars, built with Next.js 14 and a luxury aesthetic inspired by high-end watch catalogs.

## 🎯 Project Overview

REVURA is a private auction platform designed for high-net-worth individuals and serious collectors. The platform operates on an invitation-only basis, with public access limited to teaser content and application forms.

### Key Features (Planned)
- **Private Access Control**: KYC-verified, invitation-only membership
- **Cinematic Content**: High-quality video and photography for each lot
- **AI-Powered Features**: Concierge chat, buyer matching, fraud detection
- **Luxury UX**: Minimal design with deep blacks and muted golds/silver
- **Global Reach**: Multi-currency, multi-language support

## 🚀 Current Status - Phase 0 Complete

### ✅ What's Built
- **Luxury Design System**: Deep black/gold color palette with Playfair Display + Inter fonts
- **Public Teaser Site**: Home, About, News, and Request Access pages
- **Responsive Navigation**: Mobile-first luxury navigation component
- **Form Handling**: Concierge application form with validation
- **Component Library**: shadcn/ui components with luxury styling

### 🎨 Design Philosophy
- **Minimal Copy**: Let visuals tell the story
- **Product-First**: Cars as the hero, not marketing copy
- **Cinematic Feel**: High-impact imagery with subtle animations
- **Luxury Aesthetic**: Inspired by Designa Individual watch catalog approach

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom luxury color system
- **shadcn/ui** for component library
- **Framer Motion** for animations
- **Lucide React** for icons

### Planned Backend
- **FastAPI** (Python) for API
- **PostgreSQL** for primary database
- **Redis** for caching and sessions
- **S3-compatible** storage for media
- **Mux/Cloudflare Stream** for video DRM

### Planned AI Features
- **Vector Database**: FAISS/pgvector for buyer matching
- **AI Concierge**: Context-aware chat per lot
- **Fraud Detection**: Anomaly detection on bidding patterns
- **Content Generation**: Auto-catalog text in house style

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page (craft, provenance, discretion)
│   ├── news/              # Post-event highlights (anonymized)
│   ├── request-access/    # Concierge application form
│   ├── globals.css        # Luxury color system & typography
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page with cinematic hero
├── components/
│   └── ui/                # shadcn/ui components
│       ├── navigation.tsx # Luxury navigation component
│       └── ...            # Other UI components
└── lib/
    └── utils.ts           # Utility functions
```

## 🎯 Next Steps - Phase 1: Private Catalog MVP

### Immediate Tasks
1. **Backend Setup**
   - FastAPI project structure
   - Database schema for users, lots, auctions
   - Authentication system (Auth0/Clerk)

2. **Private Routes**
   - `/marketplace` - Public catalog grid
   - `/lot/{slug}` - Individual lot pages
   - Authentication guards and middleware

3. **Media System**
   - Image upload and management
   - Video processing pipeline
   - DRM implementation

4. **Admin Panel**
   - RBAC system for different user roles
   - Lot management interface
   - KYC verification dashboard

### Development Priorities
1. **Security First**: Implement robust authentication and access control
2. **Media Pipeline**: Build the cinematic content delivery system
3. **Database Design**: Create the foundation for lots, users, and auctions
4. **Admin Tools**: Enable content management and user verification

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd revura

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3004
# Add other environment variables as needed
```

## 🎨 Design System

### Color Palette
- **Primary**: Muted gold (`oklch(0.65 0.15 85)`)
- **Background**: Deep black (`oklch(0.05 0.001 49.25)`)
- **Accent**: Medium gold (`oklch(0.75 0.08 85)`)
- **Muted**: Dark gray (`oklch(0.12 0.003 49.25)`)

### Typography
- **Display**: Playfair Display (serif) for headlines
- **Body**: Inter (sans-serif) for body text
- **Spacing**: Generous letter-spacing for luxury feel

### Animations
- **Fade-in-up**: Subtle entrance animations
- **Luxury hover**: Scale effects on interactive elements
- **Smooth transitions**: 300-500ms duration for elegance

## 🔒 Security Considerations

### Planned Implementation
- **MFA**: Mandatory multi-factor authentication
- **Device Fingerprinting**: FingerprintJS integration
- **Rate Limiting**: API and form submission protection
- **Media Protection**: Signed URLs, watermarking, DRM
- **KYC/AML**: Integration with Sumsub/Onfido

## 📊 Performance Goals

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for luxury user experience
- **Image Optimization**: Next.js Image component with lazy loading
- **Video Performance**: HLS streaming with adaptive bitrate

## 🌍 Internationalization

### Planned Support
- **Languages**: English, Chinese (Simplified), Arabic
- **Currencies**: MYR base, user-selectable FX display
- **Regions**: Malaysia focus with global buyer support

## 📈 Success Metrics

### Phase 1 KPIs
- Qualified buyer applications per month
- KYC approval rate
- Media upload and processing success rate
- Admin panel efficiency metrics

### Long-term KPIs
- Auction participation rates
- Sell-through percentages
- Buyer satisfaction scores
- Platform security incidents

## 🤝 Contributing

This is a private project with specific design and security requirements. All contributions must align with the luxury aesthetic and security-first approach outlined in the project brief.

## 📄 License

Private project - All rights reserved.

---

**REVURA** - Where exceptional automobiles meet exceptional collectors.
