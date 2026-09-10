import { ScrollFx } from "@/components/fx/ScrollFx";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* Drives every [data-fx] element below. Sections stay server-rendered. */}
      <ScrollFx />

      <Hero />
      <Statement />
      <About />
      <Services />
      <Work />
      <Stack />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
