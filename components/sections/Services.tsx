import { Bot, Layers, Server, Smartphone } from "lucide-react";
import { SERVICES, type ServiceIcon } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/TechPill";

const ICONS: Record<ServiceIcon, React.ElementType> = {
  web: Layers,
  mobile: Smartphone,
  backend: Server,
  ai: Bot,
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="What I do"
          title={
            <>
              Things I build, <span className="text-gradient">end to end</span>
            </>
          }
          description="Four areas I keep coming back to — each one grounded in projects I've actually shipped."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={i * 90}>
                <article className="card card-hover group h-full p-7">
                  <div className="mb-5 grid size-12 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_10px_28px_-10px_rgba(155,50,250,0.9)]">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted">{service.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <TechPill key={tag}>{tag}</TechPill>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
