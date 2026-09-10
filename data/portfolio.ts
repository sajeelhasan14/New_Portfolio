/**
 * Single source of truth for portfolio content.
 * Ported from the previous Vite app's src/data/constants.js, with three additions:
 *   - `slug`, `overview` and `highlights` on projects, to drive /projects/[slug]
 *   - `screenshot` split out from `liveUrl` (the old `demo` field pointed at .jpeg
 *     files for the Flutter apps, so "Demo" links just opened an image)
 *   - STATS and SERVICES, both derived from the data already here
 */

export const PROFILE = {
  name: "Mohammad Sajeel Hasan",
  shortName: "Sajeel Hasan",
  initials: "SH",
  title: "Software Engineering Student & Aspiring Full-Stack Developer",
  tagline: "Building Real-World Apps While Growing Into a Full-Stack Engineer",
  location: "Karachi, Pakistan",
  bio: "I'm a Software Engineering student passionate about turning ideas into real applications. My journey started with Flutter development and is now expanding into full-stack web development, where I'm learning React for building modern user interfaces and Node.js, Express, and PostgreSQL for backend systems. I enjoy learning new technologies, building practical projects, and exploring AI to create smarter and more impactful software.",
  bioSecondary:
    "I'm passionate about building scalable applications with clean and maintainable code. When I'm not coding, I'm exploring new technologies, strengthening my problem-solving skills, and building projects in React and backend development to grow as a full-stack engineer.",
  email: "sajeel.hasan14@gmail.com",
  phone: "+92 333 2263110",
  availability: "Open to internships & junior roles",
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/sajeelhasan14", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sajeelhasan14/", icon: "linkedin" },
  { label: "Email", url: `mailto:${PROFILE.email}`, icon: "email" },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
] as const;

/* ------------------------------------------------------------------ */
/* Stats — every number below is counted from the data in this file    */
/* ------------------------------------------------------------------ */
export const STATS: {
  value: number;
  suffix?: string;
  label: string;
  /** Render verbatim instead of counting up — a year shouldn't tick from zero. */
  raw?: boolean;
}[] = [
  { value: 5, label: "Projects Shipped" },
  { value: 2, label: "Internships" },
  { value: 4, label: "Tech Stacks" },
  { value: 2027, label: "Graduating", raw: true },
];

/* ------------------------------------------------------------------ */
/* What I Do                                                           */
/* ------------------------------------------------------------------ */
export type ServiceIcon = "web" | "mobile" | "backend" | "ai";

export const SERVICES: {
  icon: ServiceIcon;
  title: string;
  description: string;
  tags: string[];
}[] = [
  {
    icon: "web",
    title: "Full-Stack Web",
    description:
      "Responsive interfaces in React and Next.js, wired to my own Node and Express services. I build the whole path — from the component on screen to the query that feeds it.",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
  },
  {
    icon: "mobile",
    title: "Mobile Apps",
    description:
      "Cross-platform Android and iOS apps in Flutter, where I started out. Multi-screen navigation, Provider state management, offline storage and Firebase auth.",
    tags: ["Flutter", "Dart", "Firebase", "Provider"],
  },
  {
    icon: "backend",
    title: "Backend & APIs",
    description:
      "REST APIs on Express with PostgreSQL behind them — schema design, auth flows, and integrating third-party APIs so the frontend has something solid to talk to.",
    tags: ["Express.js", "PostgreSQL", "REST APIs", "Python"],
  },
  {
    icon: "ai",
    title: "AI & Automation",
    description:
      "Python assistants that answer real questions from real users. At CIME I built one that guided visitors around the facility and ran it on a robotic prototype.",
    tags: ["Python", "Chatbots", "Agentic AI", "Automation"],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
export const TECHNOLOGIES = [
  {
    category: "Frontend / Web",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Python", "PostgreSQL", "REST APIs"],
  },
  {
    category: "Mobile / Flutter",
    skills: ["Flutter", "Dart", "Provider", "Firebase", "CarouselSlider", "SharedPreferences"],
  },
  {
    category: "Tools & Others",
    skills: ["VS Code", "Antigravity", "Figma", "Postman", "Git", "Terminal", "Vercel"],
  },
] as const;

export const INTERESTS = [
  "Mobile App Development",
  "Full Stack Web Development",
  "Backend Engineering",
  "AI Automation & Agentic AI",
  "Problem Solving",
] as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  highlights: string[];
  technologies: string[];
  repo?: string;
  /** A real, visitable deployment. Only set when one actually exists. */
  liveUrl?: string;
  /** A screenshot to render — never linked as though it were a live demo. */
  screenshot?: string;
  year: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "georate",
    title: "GeoRate",
    summary:
      "Location-based platform with real-time updates and interactive maps. Users can discover local businesses, share reviews, and explore nearby places.",
    overview:
      "GeoRate is my first full-stack web project, and the one that pushed me from writing frontends to owning an entire application. It pairs an interactive Leaflet map with a Node and Express API backed by PostgreSQL, so places, ratings and reviews all persist and update without a page reload. Building it meant designing the database schema, exposing a REST API over it, and figuring out how map state stays in sync with the data underneath.",
    highlights: [
      "Interactive Leaflet map for browsing and discovering nearby places",
      "Express REST API over PostgreSQL for places, ratings and reviews",
      "Real-time updates to listings without a full page refresh",
      "Responsive React interface styled with Tailwind CSS",
    ],
    technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Leaflet"],
    repo: "https://github.com/sajeelhasan14/rate-map",
    liveUrl: "https://georate.vercel.app/",
    year: "2026",
    featured: true,
  },
  {
    slug: "book-finder",
    title: "Book Finder",
    summary:
      "Flutter app to search, view and save favourite books. Firebase Authentication, Cloud Firestore, Dio for API calls, and Provider for state management.",
    overview:
      "Book Finder lets you search a public books API, read the details of any result, and keep a personal shelf of favourites that survives logout and reinstall. It was my introduction to putting a real backend behind a Flutter app: accounts through Firebase Authentication, saved books in Cloud Firestore, network calls through Dio, and Provider holding the whole thing together so the UI reacts to data instead of managing it.",
    highlights: [
      "Email and password accounts via Firebase Authentication",
      "Per-user favourites persisted in Cloud Firestore",
      "Book search against a public API using Dio, with loading and error states",
      "Provider-driven state so search results and favourites stay in sync",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Provider", "Dio"],
    repo: "https://github.com/sajeelhasan14/book_finder",
    screenshot: "/images/BookFinder.jpeg",
    year: "2025",
    featured: true,
  },
  {
    slug: "daily-stories",
    title: "Daily Stories",
    summary:
      "Flutter blogging app with secure login and signup, full CRUD across multiple APIs, and local storage. State handled with Provider for a responsive UI.",
    overview:
      "Daily Stories is a blogging app where you can write, edit and delete posts behind a real login. The interesting part was the plumbing: it talks to more than one API, so I had to keep a consistent model on the device while requests came back from different places, cache what I could locally, and make sure the UI never sat in an unexplained loading state.",
    highlights: [
      "Secure login and signup flow guarding the authoring screens",
      "Full create, read, update and delete against multiple REST APIs",
      "Local storage so drafts and session data survive an app restart",
      "Provider state management keeping list and detail views consistent",
    ],
    technologies: ["Flutter", "Dart", "Local Storage", "Provider"],
    repo: "https://github.com/sajeelhasan14/blogs_app",
    screenshot: "/images/DailyStories.jpeg",
    year: "2025",
    featured: true,
  },
  {
    slug: "covid-tracker",
    title: "COVID Tracker",
    summary:
      "Flutter app tracking global and country-wise COVID-19 statistics, with search, filtering and smooth async data handling.",
    overview:
      "COVID Tracker pulls live global and per-country statistics from a public REST API and makes them searchable. It is a small app, but it is where async in Dart finally clicked for me — handling loading, empty and error states properly, and keeping a long country list responsive while it filters.",
    highlights: [
      "Live global and country-level statistics from a public REST API",
      "Search and filtering across the full country list",
      "Careful async handling with explicit loading and error states",
      "Clean list and detail layout for dense numeric data",
    ],
    technologies: ["Flutter", "Dart", "REST API"],
    repo: "https://github.com/sajeelhasan14/covid_19",
    year: "2024",
    featured: true,
  },
  {
    slug: "noteit",
    title: "NoteIt",
    summary:
      "Notes and task manager with pinned notes, multi-select, search, light and dark themes, and persistent local storage.",
    overview:
      "NoteIt combines a notepad and a to-do list in one Flutter app. It is the most feature-dense thing I have built on mobile: pinning, selecting several notes at once to act on them together, searching as you type, and a theme toggle — all persisted with SharedPreferences so the app opens exactly as you left it.",
    highlights: [
      "Pinned notes kept at the top of the list",
      "Multi-select mode for acting on several notes at once",
      "Live search across note titles and bodies",
      "Light and dark themes, with everything persisted via SharedPreferences",
    ],
    technologies: ["Flutter", "Dart", "Local Storage", "Provider", "SharedPreferences"],
    repo: "https://github.com/sajeelhasan14/notepad_app",
    screenshot: "/images/NoteIt.jpeg",
    year: "2025",
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Wraps around, so every project page has both a previous and a next link. */
export function getProjectNeighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */
export const EXPERIENCE = [
  {
    id: 1,
    company: "Marktecs",
    position: "Intern",
    duration: "January 2026 – Present",
    current: true,
    description:
      "Contributing to full-stack development projects, gaining hands-on experience in React, Node.js, and backend workflows while assisting the team in building scalable applications.",
    highlights: [
      "Assisting in frontend and backend development tasks.",
      "Learning and applying full-stack best practices in real-world projects.",
      "Collaborating with team members on debugging, testing, and feature development.",
    ],
  },
  {
    id: 2,
    company: "Aga Khan University's Centre for Innovation in Medical Education (CIME)",
    position: "Tech Analyst Intern",
    duration: "May 2024 – May 2025",
    current: false,
    description:
      "Contributed to simulation-based healthcare education by preparing and supporting high-tech simulators for medical training sessions. Developed a Python-based interactive assistant that guides visitors and students through CIME, providing real-time information about rooms, classes, instructors, and facilities. Integrated the assistant into a robotic prototype to create an interactive experience.",
    highlights: [
      "Designed and implemented a Python-based assistant (chatbot-like system) to provide real-time guidance to visitors and students, enhancing navigation and accessibility.",
      "Engineered backend logic for handling queries about classrooms, floors, instructors, and facility information, showcasing problem-solving and software development skills.",
      "Integrated the assistant with a robotic interface to allow interactive, user-friendly experiences.",
      "Maintained and supported simulation software and equipment for smooth operation during medical training sessions.",
      "Collaborated with educators and technical staff to customize simulation setups, ensuring both technical accuracy and usability.",
    ],
  },
] as const;

export const EDUCATION = [
  {
    id: 1,
    school: "University of Karachi (UBIT)",
    degree: "B.Sc. in Software Engineering",
    field: "Software Engineering",
    year: "Expected 2027",
    current: true,
    description: "Focused on full-stack development, databases, and software architecture.",
  },
  {
    id: 2,
    school: "Fazaia Degree College Faisal",
    degree: "Intermediate",
    field: "Pre-University",
    year: "2021 – 2023",
    current: false,
    description: "Completed intermediate studies with a focus on science subjects.",
  },
  {
    id: 3,
    school: "V.M Public School",
    degree: "Matriculation",
    field: "Secondary Education",
    year: "2019 – 2021",
    current: false,
    description:
      "Completed matriculation with foundational education in sciences and mathematics.",
  },
] as const;

export const SITE_URL = "https://sajeelhasan.vercel.app";
