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

## Section 2: Hero Section & Advanced Live Search ✅

### Features Implemented

✅ **Professional Hero Banner**
- Large gradient background (dark blue with subtle pattern overlay)
- Prominent "JOB SEARCH" heading in secondary green color
- Descriptive subtitle with compelling call-to-action
- Full-width responsive layout

✅ **Advanced 4-Field Search Form**
- **Job Title/Keywords** - Text input with search icon
- **Location/City** - Dropdown with 8 major cities/regions:
  - Islamabad, Karachi, Lahore, Peshawar, Quetta, Gilgit, Muzaffarabad, All Pakistan
- **Job Category/Industry** - Dropdown with 10 job categories:
  - IT, Engineering, Education, Healthcare, Administration, Finance, Marketing, HR, Legal, Agriculture
- **Experience Level** - Dropdown with 5 levels:
  - Entry Level, Mid Level, Senior Level, Executive, Any Experience
- **Search Button** - Prominent green button with icon and hover effects

✅ **Popular Tags/Trending Searches**
- Interactive tags below search form
- Click any tag to auto-fill keywords field
- Tags: Software Engineer, Civil Engineer, Teacher, Healthcare, Administration

✅ **Design Features**
- Glassmorphism effect (backdrop blur + semi-transparent background)
- Custom dropdown styling with icons
- Smooth transitions and hover effects
- Focus states for accessibility
- Professional color scheme integration

✅ **Fully Responsive**
- Mobile: Stacked single-column layout
- Tablet: 2-3 column grid
- Desktop: Full 3-column search row with 4-column second row
- Popular tags wrap responsively
- Touch-friendly spacing and tap targets

### Component Details

**HeroSection Component** (`src/components/HeroSection.jsx`)

**State Management:**
- `searchData` - Manages all four search input values (keywords, location, jobCategory, experience)

**Key Features:**
- Gradient background with SVG pattern overlay for depth
- Custom dropdown styling with icons
- Smooth animations on button hover (scale + shadow)
- Focus ring states on all inputs
- Icons from lucide-react and inline SVG

**Data Structure:**
- 8 location options
- 10 job category options
- 5 experience level options
- 5 popular tags

---

## Ready for Next Sections

The project structure is set up and ready for adding:
- Section 3: Statistics/KPI counter section
- Section 4: Featured jobs grid
- Section 5: Success stories / testimonials
- Section 6: Footer

## Scripts Available

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

**Ready for Section 3?** Just let me know what you'd like to build next!
