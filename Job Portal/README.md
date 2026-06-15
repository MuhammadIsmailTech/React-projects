# National Jobs Portal

A professional job portal application built with React and Tailwind CSS, inspired by njp.gov.pk.

## Project Structure

```
Job Portal/
├── src/
│   ├── components/
│   │   └── Header.jsx          # Navigation header component
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles with Tailwind
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory:**
```bash
cd "Job Portal"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Section 1: Header & Navigation Bar ✅

### Features Implemented

✅ **Dual Logo Display**
- Organization logo (NJP) on the left with organization name
- Government brand logo on the right (visible on desktop)
- Responsive design that hides on smaller screens

✅ **Navigation Links**
- Home
- Find a Job
- Training
- About Us
- Contact
- FAQs

✅ **Action Buttons**
- Sign In button (outlined style)
- Register button with dropdown menu
  - Register as Candidate
  - Register as Employer

✅ **Mobile Responsiveness**
- Hamburger menu for mobile devices
- Hamburger appears on screens smaller than 1024px (lg breakpoint)
- Full menu visible on desktop
- Dropdown menus work on both desktop and mobile

✅ **Code Quality**
- Well-commented code explaining each section
- Clean component structure
- Smooth transitions and hover effects
- Accessibility considerations (aria labels)

## Component Details

### Header Component (`src/components/Header.jsx`)

**State Management:**
- `isMobileMenuOpen` - Controls mobile menu visibility
- `isRegisterDropdownOpen` - Controls register dropdown visibility

**Key Features:**
- Sticky header that stays at top while scrolling
- Icons from `lucide-react` for menu and chevron icons
- Tailwind CSS for styling and responsiveness
- Smooth animations for menu toggles and hover effects
- Custom color scheme defined in `tailwind.config.js`

**Color Scheme:**
- Primary Blue: `#0ea5e9` - #0369a1
- Secondary Green: `#a3e635` - #84cc16
- Dark Blue Background: `#0c2d57`

## Technologies Used

- **React 18.2** - UI library
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Vite 4.3** - Modern frontend build tool
- **Lucide React** - Beautiful SVG icons
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## Ready for Next Sections

The project structure is set up and ready for adding:
- Section 2: Hero banner with job search
- Section 3: Featured jobs/opportunities
- Section 4: Statistics section
- Section 5: About us section
- Section 6: Contact/footer

## Scripts Available

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

**Ready for Section 2?** Just let me know what you'd like to build next!
