"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { SocialLinks } from "@/components/ui/SocialLinks";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; email: string; message: string };

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(values: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) errors.email = "An email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "That doesn't look like a valid email.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.trim().length < 10) errors.message = "A little more detail, please.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  function update(field: keyof Fields, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (status === "sent" || status === "error") setStatus("idle");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!configured) {
      setStatus("error");
      setErrorMessage(
        "The contact form isn't configured yet. Please email me directly instead.",
      );
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, { ...values }, PUBLIC_KEY!);
      setStatus("sent");
      setValues(EMPTY);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong sending that. Please try again, or email me directly.",
      );
    }
  }

  return (
    <section id="contact" className="section overflow-hidden">
      <GlowOrb className="-bottom-40 left-1/2 size-144 -translate-x-1/2" color="deep" />

      <div className="shell relative">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="text-gradient">something</span>
            </>
          }
          description="Have a project, a role, or just a question? My inbox is open — I usually reply within a day."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* ---------- Form ---------- */}
          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="card p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={status === "sending"}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={status === "sending"}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell me a bit about what you have in mind…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={status === "sending"}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send />
                    </>
                  )}
                </Button>

                {/* Status is announced to screen readers as well as shown */}
                <p aria-live="polite" className="text-sm">
                  {status === "sent" && (
                    <span className="inline-flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="size-4" />
                      Thanks — your message is on its way.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="inline-flex items-center gap-2 text-red-400">
                      <AlertCircle className="size-4 shrink-0" />
                      {errorMessage}
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>

          {/* ---------- Direct details ---------- */}
          <Reveal delay={120}>
            <div className="card flex h-full flex-col justify-between p-7 sm:p-9">
              <div className="space-y-7">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group flex items-start gap-4 transition-colors"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-bg">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                      Email
                    </span>
                    <span className="mt-1 block text-sm break-all transition-colors group-hover:text-brand-bright">
                      {PROFILE.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-bg">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm transition-colors group-hover:text-brand-bright">
                      {PROFILE.phone}
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-10 border-t border-border pt-7">
                <p className="mb-4 font-mono text-[11px] tracking-wider text-muted-2 uppercase">
                  Elsewhere
                </p>
                <SocialLinks />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
