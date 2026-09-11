import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROFILE, SITE_URL } from "@/data/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Software Engineering student and full-stack developer in Karachi. I build multi-tenant web apps in Next.js and TypeScript, the Node and PostgreSQL services under them, and agentic AI with the OpenAI Agents SDK.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.shortName} — ${PROFILE.title}`,
    template: `%s — ${PROFILE.shortName}`,
  },
  description,
  keywords: [
    "Sajeel Hasan",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "OpenAI Agents SDK",
    "RAG",
    "pgvector",
    "Flutter",
    "Karachi",
    "Software Engineer",
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${PROFILE.shortName} — Portfolio`,
    title: `${PROFILE.shortName} — ${PROFILE.title}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.shortName} — ${PROFILE.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Scroll-driven sections start dimmed and are revealed by ScrollFx,
            so without JS they'd never appear. Show everything instead. */}
        <noscript>
          <style>{`[data-reveal],[data-fx],[data-fx="rows"]>*{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
