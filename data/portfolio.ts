/**
 * Single source of truth for portfolio content.
 *
 * Last synced against the CV (Feb 2026 revision), which added the Marktecs
 * full-stack role, the Marfah Technologies internship, and MAIL-AI. Projects
 * the CV folds into "Flutter Mini-Apps" are kept as individual entries here
 * because each one has its own case-study page under /projects/[slug].
 */

export const PROFILE = {
  name: "Mohammad Sajeel Hasan",
  shortName: "Sajeel Hasan",
  initials: "SH",
  title: "Software Engineering Student & Full-Stack Developer",
  tagline: "Building scalable web apps, backend systems and AI-powered products",
  location: "Karachi, Pakistan",
  bio: "I'm a Software Engineering student and full-stack developer. I build web apps end to end — the interface, the APIs under it, and increasingly the AI layer on top. Most of my work is server-side: schemas, auth, caching, the parts that decide whether a product holds up under real traffic.",
  bioSecondary:
    "Right now I'm going deep on agentic AI and RAG. Building MAIL-AI showed me the gap between a chatbot wrapper and a real agent — one that picks its own tool calls, grounded in pgvector embeddings so it retrieves by meaning, not keyword. The interesting engineering is around the model, not in it.",
  email: "sajeel.hasan14@gmail.com",
  phone: "+92 333 2263110",
  availability: "Open to full-stack & backend roles",
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/sajeelhasan14", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sajeelhasan14/", icon: "linkedin" },
  { label: "Email", url: `mailto:${PROFILE.email}`, icon: "email" },
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Experience", href: "/#experience" },
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
  { value: 6, label: "Projects Shipped" },
  { value: 3, label: "Roles Held" },
  { value: 5, label: "Tech Stacks" },
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
    title: "Full-stack web apps",
    description:
      "Next.js and React front ends in TypeScript, wired to services I build myself. At Marktecs that meant a multi-tenant CRM of 60+ screens and 200+ components — App Router structure, org-scoped routing, and a component system the rest of the team builds on.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: "backend",
    title: "APIs & backend services",
    description:
      "REST APIs on Node and Express over PostgreSQL — schema design, auth flows, and Backend-for-Frontend layers that keep API keys server-side. Plus the unglamorous parts: caching, revalidation, and cutting redundant round-trips.",
    tags: ["Node.js", "Express.js", "PostgreSQL", "REST APIs"],
  },
  {
    icon: "ai",
    title: "AI agents & RAG",
    description:
      "Agentic systems on the OpenAI Agents SDK, where the model decides which tools to call rather than following a script. Semantic search over your own data with pgvector embeddings, and human-in-the-loop approval wherever an agent acts on your behalf.",
    tags: ["OpenAI Agents SDK", "Gemini", "RAG", "pgvector"],
  },
  {
    icon: "mobile",
    title: "Mobile apps",
    description:
      "Cross-platform Android and iOS apps in Flutter, where I started out. Multi-screen navigation, Provider state management, REST integration through Dio, and Firebase for auth and storage.",
    tags: ["Flutter", "Dart", "Firebase", "Provider"],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
export const TECHNOLOGIES = [
  {
    category: "Frontend / Web",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend & Data",
    skills: ["Node.js", "Express.js", "PostgreSQL", "REST APIs", "Supabase", "Python"],
  },
  {
    category: "AI & Agents",
    skills: ["OpenAI Agents SDK", "Gemini", "RAG", "pgvector", "Chatbots"],
  },
  {
    category: "Mobile",
    skills: ["Flutter", "Dart", "Firebase", "Provider", "Secure Storage"],
  },
  {
    category: "Tools & Deploy",
    skills: ["Git & GitHub", "Vercel", "Railway", "Postman", "VS Code", "Figma"],
  },
] as const;

export const INTERESTS = [
  "Backend Architecture",
  "System Design",
  "Agentic AI & RAG",
  "Full Stack Web Development",
  "Mobile App Development",
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
  /**
   * Intrinsic aspect ratio of `screenshot` (width / height). The card sizes its
   * frame to this, so the image fills it exactly — never cropped, never
   * letterboxed. The Flutter contact sheets are much wider than the web
   * captures, which is why one fixed ratio never suited all of them.
   */
  imageRatio?: number;
  /**
   * Full-resolution, untrimmed capture for the case-study page, where the
   * image is shown large and people zoom into it. `screenshot` is a trimmed
   * ~1366px crop tuned for card size; that source softens badly when scaled
   * up. Falls back to `screenshot` when there is no larger original.
   */
  screenshotFull?: string;
  screenshotFullRatio?: number;
  year: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "mail-ai",
    title: "MAIL-AI",
    summary:
      "Agentic AI email assistant. A two-agent Writer and Reviewer pipeline on the OpenAI Agents SDK that decides its own tool calls, grounded in your past emails through semantic search.",
    overview:
      "MAIL-AI is a multi-user email assistant built on the OpenAI Agents SDK running on Gemini. The distinction that matters is that it is genuinely agentic rather than a chatbot wrapped around an inbox: a Writer agent and a Reviewer agent pass work between them, and the agent decides which tools to call on its own. Drafts are grounded in what you have actually written before — past emails are embedded with pgvector, so relevant prior conversations are retrieved by meaning rather than keyword. It reads and sends from each user's own Gmail account through OAuth, and nothing leaves the outbox without an explicit human approval step.",
    highlights: [
      "Two-agent Writer and Reviewer pipeline on the OpenAI Agents SDK, running on Gemini, with autonomous tool-use",
      "RAG semantic search over past emails using pgvector embeddings, grounding drafts in relevant prior threads",
      "Google OAuth via Supabase and the Gmail API, with per-user token management and least-privilege scopes",
      "Direct PostgreSQL data layer (node-postgres) with per-user scoping and human-in-the-loop send approval",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI Agents SDK",
      "Gemini",
      "Supabase",
      "PostgreSQL",
      "pgvector",
    ],
    liveUrl: "https://mail-ai-by-sajeel.vercel.app",
    screenshot: "/images/MailAI.png",
    imageRatio: 1366 / 768,
    year: "2026",
    featured: true,
  },
  {
    slug: "georate",
    title: "GeoRate",
    summary:
      "Full-stack PERN application for persisting and exploring location-based reviews, built around a real-time interactive map.",
    overview:
      "GeoRate is my first full-stack web project, and the one that pushed me from writing front ends to owning an entire application. It pairs an interactive Leaflet map with a Node and Express API backed by PostgreSQL, so places, ratings and reviews all persist and update without a page reload. Building it meant designing the schema for users, locations and reviews, exposing a REST API over it, and working out how map state stays in sync with the data underneath — then getting the whole thing deployed across three services with CI/CD.",
    highlights: [
      "Full-stack PERN architecture for persisting and exploring location-based reviews",
      "Interactive Leaflet and OpenStreetMap interface for marking and browsing locations",
      "REST APIs and schemas covering users, locations and reviews",
      "CI/CD pipelines for automated deployment — frontend on Vercel, backend on Railway, database on Supabase",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Leaflet",
      "Vercel",
      "Railway",
      "Supabase",
    ],
    repo: "https://github.com/sajeelhasan14/rate-map",
    liveUrl: "https://georate.vercel.app/",
    screenshot: "/images/GeoRate.png",
    imageRatio: 1366 / 768,
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
    screenshot: "/images/BookFinder.jpg",
    imageRatio: 1366 / 682,
    screenshotFull: "/images/BookFinder-full.jpeg",
    screenshotFullRatio: 1920 / 960,
    year: "2025",
    featured: true,
  },
  {
    slug: "daily-stories",
    title: "Daily Stories",
    summary:
      "Flutter blogging app with secure login and signup, full CRUD across multiple REST APIs, and Secure Storage. State handled with Provider for a responsive UI.",
    overview:
      "Daily Stories is a blogging app where you can write, edit and delete posts behind a real login. The interesting part was the plumbing: it talks to more than one API, so I had to keep a consistent model on the device while requests came back from different places, cache what I could locally, and make sure the UI never sat in an unexplained loading state.",
    highlights: [
      "Secure login and signup flow guarding the authoring screens",
      "Full create, read, update and delete against multiple REST APIs",
      "Secure Storage so drafts and session data survive an app restart",
      "Provider state management keeping list and detail views consistent",
    ],
    technologies: ["Flutter", "Dart", "Secure Storage", "Provider"],
    repo: "https://github.com/sajeelhasan14/blogs_app",
    screenshot: "/images/BlogApp.jpg",
    imageRatio: 1353 / 469,
    screenshotFull: "/images/BlogApp-full.jpeg",
    screenshotFullRatio: 5321 / 2160,
    year: "2025",
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
    screenshot: "/images/NoteIt.jpg",
    imageRatio: 1366 / 508,
    screenshotFull: "/images/NoteIt-full.jpeg",
    screenshotFullRatio: 3840 / 2160,
    year: "2025",
    featured: false,
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
    position: "Full Stack Developer",
    duration: "January 2026 – July 2026",
    current: false,
    description:
      "Architected and led frontend development of a multi-tenant e-commerce CRM — 60+ screens and 200+ components in Next.js 15, React 19 and TypeScript — and designed the Backend-for-Frontend layer underneath it.",
    highlights: [
      "Defined the App Router structure, org-scoped routing and component system for a 60+ screen, 200+ component multi-tenant CRM.",
      "Designed a Backend-for-Frontend layer of 150+ Next.js route handlers proxying a FastAPI service, with shared auth, error and response primitives and server-only API-key injection that kept backend secrets out of the client bundle.",
      "Implemented caching and revalidation across analytics, product and customer routes, removing redundant backend round-trips on dashboard navigation.",
      "Built the real-time WhatsApp inbox (WebSockets with auto-reconnect), global search, CSV import/export, and Shopify, WooCommerce and WhatsApp Cloud API integrations.",
    ],
  },
  {
    id: 2,
    company: "Marfah Technologies",
    position: "Flutter Developer Intern",
    duration: "July 2025 – September 2025",
    current: false,
    description:
      "Built responsive mobile interfaces in Flutter and integrated REST APIs for dynamic data handling, working remotely with the team to ship features on schedule.",
    highlights: [
      "Built responsive mobile UIs using Flutter and integrated REST APIs for dynamic data handling.",
      "Collaborated remotely to implement features, fix bugs, and meet project deadlines efficiently.",
    ],
  },
  {
    id: 3,
    company: "Aga Khan University’s CIME",
    position: "Tech Analyst Intern",
    duration: "May 2024 – May 2025",
    current: false,
    description:
      "Developed a Python-based chatbot guiding visitors and students around the CIME facility, later integrated into a robotic prototype, alongside supporting the simulation systems used in medical training.",
    highlights: [
      "Developed a Python-based chatbot to guide users about CIME facilities, later integrated into a robotic prototype for interactive use.",
      "Assisted in configuring and troubleshooting simulation systems, ensuring smooth technical operations during training sessions.",
    ],
  },
] as const;

export const EDUCATION = [
  {
    id: 1,
    school: "University of Karachi (UBIT)",
    degree: "B.Sc. in Software Engineering",
    field: "Software Engineering",
    year: "2023 – 2027 (Expected)",
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
