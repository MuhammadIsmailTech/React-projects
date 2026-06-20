export const categories = [
  { id: 1, name: "Web Development", icon: "💻", count: 120 },
  { id: 2, name: "Data Science", icon: "📊", count: 80 },
  { id: 3, name: "Design", icon: "🎨", count: 95 },
  { id: 4, name: "Marketing", icon: "📈", count: 60 },
];

export const courses = [
  {
    id: 1,
    title: "The Complete React Developer Course",
    instructor: "John Doe",
    instructorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 49.99,
    rating: 4.8,
    reviews: 2450,
    students: 15400,
    duration: "42 hours",
    category: "Web Development",
    level: "Beginner",
    description: "Learn React from scratch, build real-world projects, and master hooks, context, and Redux.",
    outcomes: ["Build powerful, fast, user-friendly web apps", "Master React Hooks & Context API", "Understand Redux for state management"],
    curriculum: ["Introduction to React", "JSX and Components", "State and Props", "Hooks Deep Dive", "Routing with React Router"]
  },
  {
    id: 2,
    title: "Python for Data Science and Machine Learning",
    instructor: "Jane Smith",
    instructorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 59.99,
    rating: 4.9,
    reviews: 3200,
    students: 21000,
    duration: "55 hours",
    category: "Data Science",
    level: "Intermediate",
    description: "Complete course on Data Science, NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn.",
    outcomes: ["Master Python for Data Analysis", "Implement Machine Learning Algorithms", "Build Data Visualization Dashboards"],
    curriculum: ["Python Crash Course", "NumPy & Pandas", "Data Visualization", "Machine Learning Basics", "Deep Learning Intro"]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emily Chen",
    instructorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 39.99,
    rating: 4.7,
    reviews: 1800,
    students: 9200,
    duration: "30 hours",
    category: "Design",
    level: "Beginner",
    description: "Learn Figma, UI design principles, UX research, and prototyping.",
    outcomes: ["Master Figma completely", "Understand User Experience principles", "Build a professional portfolio"],
    curriculum: ["Design Basics", "Figma Interface", "Typography & Colors", "Prototyping", "User Research"]
  }
];

export const testimonials = [
  { id: 1, name: "Alex Johnson", text: "This platform completely changed my career. I learned React in just two months and landed my dream job!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Sarah Williams", text: "The instructors are world-class. The Data Science course was thorough and highly practical.", img: "https://randomuser.me/api/portraits/women/44.jpg" }
];