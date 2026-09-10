import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 text-center">
      <GlowOrb className="top-1/4 left-1/2 size-120 -translate-x-1/2" color="deep" />

      <div className="relative">
        <p className="text-gradient font-mono text-7xl font-bold sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl sm:text-4xl">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          The link may be broken, or the page may have moved.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft />
              Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
