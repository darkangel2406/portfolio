/**
 * FolioVerse Central Template Registry
 * Complete 55 Template Specifications
 * All 55 Templates 100% Free Lifetime Access
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Templates' },
  { id: 'book', name: 'Interactive Books' },
  { id: 'developer', name: 'Developer & Tech' },
  { id: 'student', name: 'Student & Fresher' },
  { id: 'design', name: 'UI/UX & Design' },
  { id: 'freelance', name: 'Freelance & Brand' },
  { id: 'creative', name: 'Photography & Arts' },
  { id: 'business', name: 'Business & Corp' },
  { id: 'creator', name: 'Content Creator' },
  { id: 'cybersecurity', name: 'Cyber & Systems' },
  { id: 'services', name: 'Services & Studio' },
  { id: 'modern', name: 'Modern & Experimental' }
];

export const TEMPLATES = [
  // ==========================================
  // Category K: Book-Style Portfolios (51-55)
  // ==========================================
  {
    id: 'open-book',
    number: 51,
    name: 'OpenBook Portfolio',
    category: 'book',
    categoryName: 'Book-Style Portfolios',
    description: 'Realistic open-book portfolio with 3D cover, dual-page desktop spread, biography & skills on opposing pages, and smooth page turns.',
    isPremium: false,
    isSignature: true,
    accentColor: '#3b82f6',
    bgType: 'book',
    layoutType: 'book-3d',
    tags: ['Interactive Book', '3D Transforms', 'Signature', 'Dual Page'],
    features: ['3D Page Flipping', 'Hardbound Cover', 'Dual Spread', 'Audio Sound Effect', 'Table of Contents'],
    previewImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vintage-journal',
    number: 52,
    name: 'Vintage Journal',
    category: 'book',
    categoryName: 'Book-Style Portfolios',
    description: 'A journal-inspired portfolio with warm paper textures, classic serif typography, and personal story chapters.',
    isPremium: false,
    accentColor: '#d97706',
    bgType: 'book',
    layoutType: 'book-3d',
    tags: ['Vintage', 'Journal', 'Paper Texture', 'Serif'],
    features: ['Parchment Theme', 'Handcrafted Feel', 'Chapter Bookmarks', 'Ink Accents'],
    previewImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'the-biography',
    number: 53,
    name: 'The Biography',
    category: 'book',
    categoryName: 'Book-Style Portfolios',
    description: 'An elegant professional hardcover book with table of contents, numbered pages, career history, projects, and contact details.',
    isPremium: false,
    accentColor: '#8b5cf6',
    bgType: 'book',
    layoutType: 'book-3d',
    tags: ['Hardcover', 'Executive', 'Biography', '3D Book'],
    features: ['Hardcover Binding', 'Ribbon Bookmark', 'Executive Layout', 'Numbered Pages'],
    previewImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mystic-pages',
    number: 54,
    name: 'Mystic Pages',
    category: 'book',
    categoryName: 'Book-Style Portfolios',
    description: 'A dark fantasy-inspired book portfolio with atmospheric midnight backgrounds, glowing accents, and creative chapter transitions.',
    isPremium: false,
    accentColor: '#06b6d4',
    bgType: 'book',
    layoutType: 'book-3d',
    tags: ['Dark Fantasy', 'Glowing', 'Atmospheric', '3D Book'],
    features: ['Dark Leather Cover', 'Luminous Glyphs', 'Smooth Transitions', 'Aesthetic Spreads'],
    previewImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'flipfolio',
    number: 55,
    name: 'Flipfolio',
    category: 'book',
    categoryName: 'Book-Style Portfolios',
    description: 'An interactive digital book with two-page spreads on desktop and clean single-page reading mode on mobile devices.',
    isPremium: false,
    accentColor: '#10b981',
    bgType: 'book',
    layoutType: 'book-3d',
    tags: ['Responsive Book', 'Flipfolio', 'Mobile Optimized', 'Modern'],
    features: ['Auto-adapts to Mobile', 'Keyboard Controls', 'Clean Layout', 'Quick Navigation'],
    previewImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category A: Developer & Software Engineer (1-5)
  // ==========================================
  {
    id: 'neon-dev',
    number: 1,
    name: 'Neon Dev',
    category: 'developer',
    categoryName: 'Developer and Software Engineer',
    description: 'Dark developer portfolio with neon accents, technical skills grid, GitHub projects, and interactive tech stack.',
    isPremium: false,
    accentColor: '#00ffcc',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Cyberpunk', 'Neon', 'GitHub', 'Tech Stack'],
    features: ['Neon Glow Effects', 'Terminal Snippets', 'Live Links', 'Skill Badges'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'minimal-engineer',
    number: 2,
    name: 'Minimal Engineer',
    category: 'developer',
    categoryName: 'Developer and Software Engineer',
    description: 'Crisp white and monochrome aesthetic, clean typography, experience timeline, and fast resume download.',
    isPremium: false,
    accentColor: '#18181b',
    bgType: 'light',
    layoutType: 'clean-timeline',
    tags: ['Minimal', 'Monochrome', 'Typography', 'Timeline'],
    features: ['High Contrast', 'Resume Link', 'Career Timeline', 'Fast Loading'],
    previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'terminal-pro',
    number: 3,
    name: 'Terminal Pro',
    category: 'developer',
    categoryName: 'Developer and Software Engineer',
    description: 'Terminal-inspired command-line layout with matrix green accents, interactive commands, and technical projects.',
    isPremium: false,
    accentColor: '#22c55e',
    bgType: 'dark',
    layoutType: 'terminal-cli',
    tags: ['Terminal', 'CLI', 'Hacker', 'Shell'],
    features: ['CLI Simulation', 'Prompt Header', 'Code Blocks', 'Monospace'],
    previewImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fullstack-studio',
    number: 4,
    name: 'FullStack Studio',
    category: 'developer',
    categoryName: 'Developer and Software Engineer',
    description: 'Structured showcase for frontend, backend, database systems, and full-stack architecture diagrams.',
    isPremium: false,
    accentColor: '#6366f1',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Full Stack', 'Architecture', 'API', 'Database'],
    features: ['Stack Layers', 'Architecture Cards', 'Metrics', 'Live Previews'],
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pixel-coder',
    number: 5,
    name: 'Pixel Coder',
    category: 'developer',
    categoryName: 'Developer and Software Engineer',
    description: 'Creative vibrant gradients, responsive project cards, component showcases, and lively micro-interactions.',
    isPremium: false,
    accentColor: '#ec4899',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['Gradients', 'Vibrant', 'Components', 'Creative'],
    features: ['Mesh Gradients', 'Component Cards', 'Tag Badges', 'Smooth Hover'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category B: Student & Fresher (6-10)
  // ==========================================
  {
    id: 'campus-launch',
    number: 6,
    name: 'Campus Launch',
    category: 'student',
    categoryName: 'Student and Fresher',
    description: 'Highlight education, academic achievements, CGPA, certifications, hackathons, and foundational coursework.',
    isPremium: false,
    accentColor: '#2563eb',
    bgType: 'light',
    layoutType: 'academic-grid',
    tags: ['Student', 'Academic', 'CGPA', 'Fresher'],
    features: ['CGPA Badge', 'Coursework Chips', 'Education First', 'Verified Certs'],
    previewImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'first-impression',
    number: 7,
    name: 'First Impression',
    category: 'student',
    categoryName: 'Student and Fresher',
    description: 'Polished introduction, career objective statement, highlighted core skills, and direct resume download.',
    isPremium: false,
    accentColor: '#0284c7',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Fresher', 'Resume', 'Objective', 'Clean'],
    features: ['Hero Objective', 'Download Resume CTA', 'Quick Skills', 'Contact Modal'],
    previewImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'engineer-start',
    number: 8,
    name: 'Engineer Start',
    category: 'student',
    categoryName: 'Student and Fresher',
    description: 'Showcases engineering capstone projects, lab internships, technical workshops, and coding challenges.',
    isPremium: false,
    accentColor: '#059669',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['Engineering', 'Capstone', 'Labs', 'Workshops'],
    features: ['Capstone Showcase', 'Workshop Timeline', 'Skills Grid', 'GitHub Links'],
    previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'internship-ready',
    number: 9,
    name: 'Internship Ready',
    category: 'student',
    categoryName: 'Student and Fresher',
    description: 'Emphasizes internship availability date, relevant college coursework, personal projects, and immediate contact info.',
    isPremium: false,
    accentColor: '#f59e0b',
    bgType: 'light',
    layoutType: 'clean-timeline',
    tags: ['Internship', 'Availability', 'Coursework', 'Fresher'],
    features: ['Availability Pill', 'Fast Contact', 'Course Highlights', 'Project Demos'],
    previewImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'scholar-space',
    number: 10,
    name: 'Scholar Space',
    category: 'student',
    categoryName: 'Student and Fresher',
    description: 'Academic history, university research interests, publications, conference presentations, and awards.',
    isPremium: false,
    accentColor: '#7c3aed',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Research', 'Scholar', 'Publications', 'Academic'],
    features: ['Publications List', 'Research Fields', 'Citation Links', 'Academic Awards'],
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category C: UI/UX & Graphic Designer (11-15)
  // ==========================================
  {
    id: 'design-atelier',
    number: 11,
    name: 'Design Atelier',
    category: 'design',
    categoryName: 'UI/UX and Graphic Designer',
    description: 'Editorial layout with deep UX case studies, user research highlights, wireframes, and design thinking workflows.',
    isPremium: false,
    accentColor: '#f43f5e',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['UX Case Study', 'Design Thinking', 'Wireframes', 'Atelier'],
    features: ['Case Study Hero', 'Design Steps', 'Figma Embeds', 'Before/After'],
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'color-theory',
    number: 12,
    name: 'Color Theory',
    category: 'design',
    categoryName: 'UI/UX and Graphic Designer',
    description: 'Bold colorful typography, illustrations, branding palettes, and playful creative image galleries.',
    isPremium: false,
    accentColor: '#f97316',
    bgType: 'light',
    layoutType: 'cards-gradient',
    tags: ['Color Palette', 'Branding', 'Illustration', 'Vibrant'],
    features: ['Color Swatches', 'Creative Grid', 'Typography Play', 'Visual Assets'],
    previewImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'product-canvas',
    number: 13,
    name: 'Product Canvas',
    category: 'design',
    categoryName: 'UI/UX and Graphic Designer',
    description: 'Tailored for Product Designers: wireframes, user journey maps, product prototypes, and impact metrics.',
    isPremium: false,
    accentColor: '#0ea5e9',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Product Design', 'Prototypes', 'Journeys', 'Metrics'],
    features: ['Prototype Links', 'Metrics Banner', 'Flow Diagrams', 'Clean UI'],
    previewImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'brutalist-bold',
    number: 14,
    name: 'Brutalist Bold',
    category: 'design',
    categoryName: 'UI/UX and Graphic Designer',
    description: 'High-contrast typography, thick black borders, neo-brutalist cards, and expressive creative composition.',
    isPremium: false,
    accentColor: '#e11d48',
    bgType: 'light',
    layoutType: 'neon-tech',
    tags: ['Neo-Brutalism', 'High Contrast', 'Bold', 'Trend'],
    features: ['Thick Borders', 'Hard Drop Shadows', 'Stark Fonts', 'Playful Tags'],
    previewImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'brand-story',
    number: 15,
    name: 'Brand Story',
    category: 'design',
    categoryName: 'UI/UX and Graphic Designer',
    description: 'Showcases branding identities, logos, print packaging, visual guidelines, and brand narratives.',
    isPremium: false,
    accentColor: '#d946ef',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Brand Identity', 'Logos', 'Packaging', 'Story'],
    features: ['Logo Carousel', 'Mockup Frames', 'Brand Guidelines', 'Client Praise'],
    previewImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category D: Freelancer & Personal Brand (16-20)
  // ==========================================
  {
    id: 'freelance-pro',
    number: 16,
    name: 'Freelance Pro',
    category: 'freelance',
    categoryName: 'Freelancer and Personal Brand',
    description: 'Offered services, portfolio work samples, client testimonials, rates, and direct inquiry booking.',
    isPremium: false,
    accentColor: '#10b981',
    bgType: 'light',
    layoutType: 'clean-timeline',
    tags: ['Freelancer', 'Services', 'Rates', 'Inquiries'],
    features: ['Service Packages', 'Testimonials', 'Booking Form', 'Deliverables'],
    previewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'signature',
    number: 17,
    name: 'Signature',
    category: 'freelance',
    categoryName: 'Freelancer and Personal Brand',
    description: 'Personal biography focus, prominent portrait, career milestones, featured press, and direct contact.',
    isPremium: false,
    accentColor: '#3b82f6',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Personal Brand', 'Speaker', 'Bio', 'Press'],
    features: ['Signature Header', 'Press Logos', 'Milestone List', 'Newsletter CTA'],
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'consultant-elite',
    number: 18,
    name: 'Consultant Elite',
    category: 'freelance',
    categoryName: 'Freelancer and Personal Brand',
    description: 'Strategy advisory, client business outcomes, advisory packages, and premium consultation booking.',
    isPremium: false,
    accentColor: '#eab308',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Consultant', 'Advisory', 'Strategy', 'Executive'],
    features: ['ROI Metrics', 'Consulting Packages', 'Client Logos', 'Calendar Booking'],
    previewImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'remote-ready',
    number: 19,
    name: 'Remote Ready',
    category: 'freelance',
    categoryName: 'Freelancer and Personal Brand',
    description: 'Timezone availability, async communication tools, remote work achievements, and client contract options.',
    isPremium: false,
    accentColor: '#06b6d4',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['Remote Work', 'Async', 'Timezone', 'Global'],
    features: ['Timezone Indicator', 'Async Stack', 'Contract Ready', 'Global Clients'],
    previewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'influence',
    number: 20,
    name: 'Influence',
    category: 'freelance',
    categoryName: 'Freelancer and Personal Brand',
    description: 'Keynote speaking engagements, podcast appearances, mentorship programs, and media endorsements.',
    isPremium: false,
    accentColor: '#ec4899',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Keynote', 'Speaking', 'Podcasts', 'Influence'],
    features: ['Speaking Topics', 'Video Reels', 'Past Events', 'Booking Manager'],
    previewImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category E: Photography & Creative Arts (21-25)
  // ==========================================
  {
    id: 'frame-one',
    number: 21,
    name: 'Frame One',
    category: 'creative',
    categoryName: 'Photography and Creative Arts',
    description: 'Immersive full-width photo galleries, EXIF data support, photo categories, and booking inquiries.',
    isPremium: false,
    accentColor: '#f43f5e',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['Photography', 'Galleries', 'EXIF', 'Visuals'],
    features: ['Full-bleed Images', 'Lightbox View', 'EXIF Specs', 'Print Store Link'],
    previewImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dream-canvas',
    number: 22,
    name: 'Dream Canvas',
    category: 'creative',
    categoryName: 'Photography and Creative Arts',
    description: 'Digital artwork, original collections, client commissions status, and artist biography story.',
    isPremium: false,
    accentColor: '#8b5cf6',
    bgType: 'dark',
    layoutType: 'editorial',
    tags: ['Digital Art', 'Commissions', 'Canvas', 'Artist'],
    features: ['Artwork Series', 'Commission Status', 'Art Prints', 'Creative Process'],
    previewImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sketchbook',
    number: 23,
    name: 'Sketchbook',
    category: 'creative',
    categoryName: 'Photography and Creative Arts',
    description: 'Illustrations, conceptual sketches, character designs, WIP progress, and creative drafting videos.',
    isPremium: false,
    accentColor: '#f59e0b',
    bgType: 'light',
    layoutType: 'cards-gradient',
    tags: ['Illustration', 'Sketch', 'Concept Art', 'Characters'],
    features: ['Rough to Final Slider', 'Art Collections', 'Tool Stack', 'Social Gallery'],
    previewImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'motion-lab',
    number: 24,
    name: 'Motion Lab',
    category: 'creative',
    categoryName: 'Photography and Creative Arts',
    description: 'Animation showreels, video preview cards, motion design case studies, and studio credits.',
    isPremium: false,
    accentColor: '#06b6d4',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Animation', 'Motion Design', 'Showreel', 'Video'],
    features: ['Showreel Player', 'GIF Previews', 'Frame Timeline', 'Production Roles'],
    previewImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dimension-3d',
    number: 25,
    name: 'Dimension 3D',
    category: 'creative',
    categoryName: 'Photography and Creative Arts',
    description: '3D renders, wireframe shaders, Blender/C4D modeling projects, and interactive turntables.',
    isPremium: false,
    accentColor: '#3b82f6',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['3D Modeling', 'Blender', 'C4D', 'Creative'],
    features: ['3D Render Sliders', 'Wireframe Toggle', 'Poly Counts', 'Asset Downloads'],
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category F: Business & Corporate (26-30)
  // ==========================================
  {
    id: 'executive-prime',
    number: 26,
    name: 'Executive Prime',
    category: 'business',
    categoryName: 'Business and Corporate',
    description: 'Executive leadership experience, corporate governance, board roles, and high-impact revenue achievements.',
    isPremium: false,
    accentColor: '#1e3a8a',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['C-Suite', 'Executive', 'Leadership', 'Business'],
    features: ['Board History', 'Key Metrics', 'P&L Scale', 'Formal Bio'],
    previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'founder-mode',
    number: 27,
    name: 'Founder Mode',
    category: 'business',
    categoryName: 'Business and Corporate',
    description: 'Startup venture journey, fundraising milestones, user growth graphs, and tech product launches.',
    isPremium: false,
    accentColor: '#f97316',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Startup', 'Founder', 'Milestones', 'Ventures'],
    features: ['Venture Roadmap', 'Investor Updates', 'Traction Metrics', 'Pitch Deck CTA'],
    previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'insight-analyst',
    number: 28,
    name: 'Insight Analyst',
    category: 'business',
    categoryName: 'Business and Corporate',
    description: 'Data analytics, SQL queries, interactive dashboards, business intelligence, and quantifiable outcomes.',
    isPremium: false,
    accentColor: '#0284c7',
    bgType: 'light',
    layoutType: 'academic-grid',
    tags: ['Data Analytics', 'SQL', 'Dashboards', 'BI'],
    features: ['Dashboard Cards', 'Impact KPIs', 'Tool Badges', 'Methodology'],
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'growth-strategist',
    number: 29,
    name: 'Growth Strategist',
    category: 'business',
    categoryName: 'Business and Corporate',
    description: 'Marketing campaigns, CAC/LTV case studies, funnel conversion funnels, and organic growth flywheels.',
    isPremium: false,
    accentColor: '#10b981',
    bgType: 'light',
    layoutType: 'clean-timeline',
    tags: ['Growth', 'Marketing', 'Funnels', 'Metrics'],
    features: ['Campaign Stats', 'Channel Flywheel', 'Case Studies', 'Results Grid'],
    previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'finance-focus',
    number: 30,
    name: 'Finance Focus',
    category: 'business',
    categoryName: 'Business and Corporate',
    description: 'Financial modeling, CFA qualifications, analytical valuation frameworks, and audit/risk expertise.',
    isPremium: false,
    accentColor: '#0f766e',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Finance', 'Valuation', 'CFA', 'Modeling'],
    features: ['Credentials', 'Sector Focus', 'Financial Models', 'Contact'],
    previewImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category G: Content Creator & Media (31-35)
  // ==========================================
  {
    id: 'creator-hub',
    number: 31,
    name: 'Creator Hub',
    category: 'creator',
    categoryName: 'Content Creator and Media',
    description: 'Featured videos, YouTube channel stats, content categories, brand sponsors, and collaboration inquiries.',
    isPremium: false,
    accentColor: '#ef4444',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['YouTube', 'Video Creator', 'Brand Deals', 'Channel'],
    features: ['Subscriber Counter', 'Video Embeds', 'Brand Kit', 'Sponsorship Form'],
    previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'social-star',
    number: 32,
    name: 'Social Star',
    category: 'creator',
    categoryName: 'Content Creator and Media',
    description: 'Influencer media kit, verified audience demographics, sponsored past campaigns, and social handles.',
    isPremium: false,
    accentColor: '#d946ef',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Media Kit', 'Influencer', 'Demographics', 'Social'],
    features: ['Media Kit PDF', 'Demographics Chart', 'Reach Metrics', 'Rates'],
    previewImage: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wordsmith',
    number: 33,
    name: 'Wordsmith',
    category: 'creator',
    categoryName: 'Content Creator and Media',
    description: 'Writing clips, published essays, blog archive, poetry collections, and author biography.',
    isPremium: false,
    accentColor: '#475569',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Writer', 'Author', 'Essays', 'Journalism'],
    features: ['Article Previews', 'Reading Time', 'Publication Badges', 'Book Links'],
    previewImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'audio-identity',
    number: 34,
    name: 'Audio Identity',
    category: 'creator',
    categoryName: 'Content Creator and Media',
    description: 'Podcast episodes list, embedded Spotify/Apple audio players, guest appearances, and sponsorship slots.',
    isPremium: false,
    accentColor: '#10b981',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Podcast', 'Audio', 'Episodes', 'Music'],
    features: ['Audio Player UI', 'Episode Notes', 'Platform Badges', 'Guest Booking'],
    previewImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cine-portfolio',
    number: 35,
    name: 'Cine Portfolio',
    category: 'creator',
    categoryName: 'Content Creator and Media',
    description: 'Film festival projects, cinematography reels, color grading previews, and full crew production credits.',
    isPremium: false,
    accentColor: '#e11d48',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Cinema', 'Film', 'Reels', 'Media'],
    features: ['Cinematic Letterbox', 'Credit Rolls', 'Gear List', 'Festival Laurels'],
    previewImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category H: Cybersecurity & Technology (36-40)
  // ==========================================
  {
    id: 'cyber-shield',
    number: 36,
    name: 'Cyber Shield',
    category: 'cybersecurity',
    categoryName: 'Cybersecurity and Technology',
    description: 'Security certifications (OSCP, CEH), bug bounty discoveries, lab write-ups, CTF scores, and defensive tools.',
    isPremium: false,
    accentColor: '#10b981',
    bgType: 'dark',
    layoutType: 'terminal-cli',
    tags: ['Cybersecurity', 'CTF', 'Pentesting', 'Defensive'],
    features: ['CVE / Bug Reports', 'CTF Rank Badges', 'Tool Repository', 'Security Advisories'],
    previewImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'data-sphere',
    number: 37,
    name: 'Data Sphere',
    category: 'cybersecurity',
    categoryName: 'Cybersecurity and Technology',
    description: 'Data science models, Jupyter notebook walkthroughs, interactive charts, and predictive analytics benchmarks.',
    isPremium: false,
    accentColor: '#3b82f6',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Data Science', 'Notebooks', 'Python', 'ML'],
    features: ['Notebook Embeds', 'Chart Visuals', 'Model Evaluation', 'Datasets'],
    previewImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cloud-architect',
    number: 38,
    name: 'Cloud Architect',
    category: 'cybersecurity',
    categoryName: 'Cybersecurity and Technology',
    description: 'Cloud architecture diagrams, AWS/GCP/Azure infrastructure, Terraform stacks, and reliability metrics.',
    isPremium: false,
    accentColor: '#f59e0b',
    bgType: 'dark',
    layoutType: 'split-architecture',
    tags: ['Cloud', 'AWS', 'Terraform', 'DevOps'],
    features: ['Architecture Nodes', 'Infra Badges', 'Cost Optimizations', 'Uptime Stats'],
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'model-builder',
    number: 39,
    name: 'Model Builder',
    category: 'cybersecurity',
    categoryName: 'Cybersecurity and Technology',
    description: 'Machine learning projects, neural network architectures, HuggingFace model cards, and training benchmarks.',
    isPremium: false,
    accentColor: '#8b5cf6',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Machine Learning', 'PyTorch', 'HuggingFace', 'AI'],
    features: ['Model Card Specs', 'Loss Curves', 'HuggingFace Links', 'Research Papers'],
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'app-craft',
    number: 40,
    name: 'App Craft',
    category: 'cybersecurity',
    categoryName: 'Cybersecurity and Technology',
    description: 'Mobile app device mockups, App Store/Play Store badges, tech stack, release changelogs, and user reviews.',
    isPremium: false,
    accentColor: '#06b6d4',
    bgType: 'light',
    layoutType: 'cards-gradient',
    tags: ['Mobile App', 'iOS', 'Android', 'Flutter'],
    features: ['Phone Mockups', 'Store Badges', 'Release Notes', 'User Rating Pill'],
    previewImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category I: Professional Services (41-45)
  // ==========================================
  {
    id: 'arch-form',
    number: 41,
    name: 'Arch Form',
    category: 'services',
    categoryName: 'Professional Services',
    description: 'Architectural structural blueprints, floor plans, spatial visualizations, project materials, and studio philosophy.',
    isPremium: false,
    accentColor: '#475569',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Architecture', 'Blueprints', 'Interiors', 'Design'],
    features: ['Floor Plan Gallery', 'Material Palette', 'Location Tags', 'Concept Notes'],
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'living-space',
    number: 42,
    name: 'Living Space',
    category: 'services',
    categoryName: 'Professional Services',
    description: 'Interior design portfolio: room before/after transformations, mood boards, custom furniture, and textures.',
    isPremium: false,
    accentColor: '#ca8a04',
    bgType: 'light',
    layoutType: 'cards-gradient',
    tags: ['Interior Design', 'Decor', 'Mood Boards', 'Transforms'],
    features: ['Before/After Slider', 'Moodboard Grid', 'Vendor Credits', 'Booking'],
    previewImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'couture-studio',
    number: 43,
    name: 'Couture Studio',
    category: 'services',
    categoryName: 'Professional Services',
    description: 'Fashion design collections, runway sketches, fabric swatches, seasonal lookbooks, and styling press.',
    isPremium: false,
    accentColor: '#ec4899',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Fashion', 'Runway', 'Lookbook', 'Studio'],
    features: ['Seasonal Lookbook', 'Fabric Samples', 'Runway Credits', 'Private Viewing'],
    previewImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fit-identity',
    number: 44,
    name: 'Fit Identity',
    category: 'services',
    categoryName: 'Professional Services',
    description: 'Fitness coaching programs, nutrition certifications, client transformation milestones, and class schedules.',
    isPremium: false,
    accentColor: '#ef4444',
    bgType: 'dark',
    layoutType: 'clean-timeline',
    tags: ['Fitness', 'Trainer', 'Nutrition', 'Coaching'],
    features: ['Program Plans', 'Client Milestones', 'Certifications', 'Consult Form'],
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chefs-table',
    number: 45,
    name: 'Chef’s Table',
    category: 'services',
    categoryName: 'Professional Services',
    description: 'Culinary experience, signature gastronomy dishes, restaurant tasting menus, and culinary accolades.',
    isPremium: false,
    accentColor: '#b45309',
    bgType: 'dark',
    layoutType: 'editorial',
    tags: ['Chef', 'Gastronomy', 'Menu', 'Culinary'],
    features: ['Signature Dishes', 'Tasting Menus', 'Kitchen History', 'Private Events'],
    previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },

  // ==========================================
  // Category J: Modern & Experimental (46-50)
  // ==========================================
  {
    id: 'retro-future',
    number: 46,
    name: 'Retro Future',
    category: 'modern',
    categoryName: 'Modern and Experimental',
    description: 'Synthwave cyber aesthetics, chrome typography, glowing grid lines, and 80s futuristic retro styling.',
    isPremium: false,
    accentColor: '#f43f5e',
    bgType: 'dark',
    layoutType: 'neon-tech',
    tags: ['Retro Wave', 'Cyber', 'Synthwave', 'Chrome'],
    features: ['Chrome Text Effects', 'Scanline Overlay', 'Glowing Grid', 'Interactive Synth Badges'],
    previewImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'glass-horizon',
    number: 47,
    name: 'Glass Horizon',
    category: 'modern',
    categoryName: 'Modern and Experimental',
    description: 'Frosted glassmorphism cards, blurred glowing backdrops, fluid soft gradients, and modern Apple-inspired aesthetics.',
    isPremium: false,
    accentColor: '#38bdf8',
    bgType: 'dark',
    layoutType: 'cards-gradient',
    tags: ['Glassmorphism', 'Backdrop Blur', 'iOS Style', 'Glass'],
    features: ['Frosted Glass Layers', 'Iridescent Glows', 'Micro-Interactions', 'Floating Elements'],
    previewImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'swiss-grid',
    number: 48,
    name: 'Swiss Grid',
    category: 'modern',
    categoryName: 'Modern and Experimental',
    description: 'Precision International Typographic Style: strict geometric grid, authoritative Helvetica, and structured whitespace.',
    isPremium: false,
    accentColor: '#e11d48',
    bgType: 'light',
    layoutType: 'clean-timeline',
    tags: ['Swiss Design', 'Grid', 'Typography', 'Minimal'],
    features: ['Mathematical Grid', 'Red Accent Rules', 'Pure Hierarchy', 'Clean Index'],
    previewImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'onepage-flow',
    number: 49,
    name: 'OnePage Flow',
    category: 'modern',
    categoryName: 'Modern and Experimental',
    description: 'Ultra-fast single-page portfolio with sticky anchored progress navigation, quick jumps, and compact cards.',
    isPremium: false,
    accentColor: '#6366f1',
    bgType: 'dark',
    layoutType: 'clean-timeline',
    tags: ['One Page', 'Sticky Nav', 'Compact', 'Fast'],
    features: ['Floating Dock', 'Smooth Anchor Scroll', 'Quick Summary', 'Compact Sections'],
    previewImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'editorial-luxe',
    number: 50,
    name: 'Editorial Luxe',
    category: 'modern',
    categoryName: 'Modern and Experimental',
    description: 'High-end luxury magazine visual hierarchy, serif headlines, editorial layout, and sophisticated aesthetics.',
    isPremium: false,
    accentColor: '#ca8a04',
    bgType: 'light',
    layoutType: 'editorial',
    tags: ['Editorial', 'Magazine', 'Luxury', 'Vogue Style'],
    features: ['Magazine Layout', 'Large Display Serif', 'Fashionable Spacing', 'Signature Quote'],
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper utilities for the template system
export const getTemplateById = (id) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0];

export const getTemplatesByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return TEMPLATES;
  return TEMPLATES.filter(t => t.category === categoryId);
};

export const getFreeTemplates = () => TEMPLATES;
export const getPremiumTemplates = () => [];

export const PREMIUM_PACK_PRICE = 0; // 100% Free - all 55 templates completely unlocked
export const TOTAL_TEMPLATES_COUNT = TEMPLATES.length; // 55
export const FREE_TEMPLATES_COUNT = TEMPLATES.length; // 55
export const PREMIUM_TEMPLATES_COUNT = 0;
