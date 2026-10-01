"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * The hero's zsh card, and the hero's navigation: in place of buttons,
 * visitors type — or tap — commands. The intro session renders as a static
 * card (nothing types itself out), so it only comes alive when used.
 *
 * Directories behave like directories: `flutter-apps/` lists its apps here
 * rather than navigating, and each project entry links to its case study.
 */

type Seg = { label: string; href?: string; run?: string; tone?: "dim" | "err" };
type Line = Seg[];
type Entry = { id: number; cmd: string; lines: Line[] };

type Props = {
  /** Project slugs, listed at the top level of ./projects */
  web: string[];
  /** Flutter project slugs, listed under ./projects/flutter-apps */
  flutter: string[];
  links: { label: string; href: string }[];
  email: string;
};

const SECTIONS = ["about", "services", "work", "stack", "experience", "education", "contact"];
const FOCUS = "backend architecture, system design";
const CHIPS = ["help", "ls", "cd work", "contact"];

export function Terminal({ web, flutter, links, email }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(4);

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [past, setPast] = useState<string[]>([]);
  const [recall, setRecall] = useState<number | null>(null);

  const projectsLine: Line = [
    ...web.map((slug) => ({ label: `${slug}/`, href: `/projects/${slug}` })),
    { label: "flutter-apps/", run: "ls flutter-apps" },
  ];
  const flutterLine: Line = flutter.map((slug) => ({
    label: `${slug}/`,
    href: `/projects/${slug}`,
  }));
  const linksLine: Line = links.map((l) => ({ label: `${l.label} ↗`, href: l.href }));
  const mailLine: Line = [{ label: email, href: `mailto:${email}` }];

  const [history, setHistory] = useState<Entry[]>(() => [
    { id: 0, cmd: "whoami", lines: [[{ label: "full-stack dev · se student" }]] },
    { id: 1, cmd: "ls ./projects", lines: [projectsLine] },
    { id: 2, cmd: "echo $FOCUS", lines: [[{ label: FOCUS }]] },
    { id: 3, cmd: "cat links.txt", lines: [linksLine] },
  ]);

  // Keep the newest output in view. scrollTop, not scrollIntoView — the
  // latter would also scroll the page.
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const jump = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    // Drops the on-screen keyboard on phones.
    inputRef.current?.blur();
  };

  const exec = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    const [name = "", ...rest] = cmd.split(" ");
    const arg = rest.join(" ");
    const target = arg
      .toLowerCase()
      .replace(/^(\.\/|~\/)/, "")
      .replace(/^projects\//, "")
      .replace(/^flutter-apps\//, "")
      .replace(/\/$/, "");

    let lines: Line[] = [];
    let then: (() => void) | undefined;

    switch (name.toLowerCase()) {
      case "":
        break;

      case "help":
        lines = [
          [{ label: "ls", run: "ls" }, { label: "list projects", tone: "dim" }],
          [{ label: "ls flutter-apps", run: "ls flutter-apps" }, { label: "mobile apps", tone: "dim" }],
          [{ label: `open ${web[0] ?? "<project>"}`, run: `open ${web[0] ?? ""}` }, { label: "read a case study", tone: "dim" }],
          [{ label: "cd about", run: "cd about" }, { label: "jump to a section", tone: "dim" }],
          [{ label: "contact", run: "contact" }, { label: "email & links", tone: "dim" }],
          [{ label: "clear", run: "clear" }, { label: "wipe the screen", tone: "dim" }],
        ];
        break;

      case "whoami":
        lines = [[{ label: "sajeel hasan — full-stack dev · se student" }]];
        break;

      case "ls":
      case "ll":
        if (["", ".", "~", "projects"].includes(target)) lines = [projectsLine];
        else if (target === "flutter-apps") lines = [flutterLine];
        else lines = [[{ label: `ls: ${arg}: no such file or directory`, tone: "err" }]];
        break;

      case "cd":
      case "open": {
        const slug = [...web, ...flutter].find((s) => s === target);
        if (["", "~", "..", "/", "top"].includes(target)) {
          then = () => jump("top");
        } else if (SECTIONS.includes(target) || target === "projects") {
          const id = target === "projects" ? "work" : target;
          lines = [[{ label: `→ #${id}`, tone: "dim" }]];
          then = () => jump(id);
        } else if (target === "flutter-apps") {
          lines = [flutterLine];
        } else if (slug) {
          lines = [[{ label: `opening ${slug}…`, tone: "dim" }]];
          then = () => router.push(`/projects/${slug}`);
        } else {
          lines = [[{ label: `${name}: no such file or directory: ${arg}`, tone: "err" }]];
        }
        break;
      }

      case "echo":
        lines = [[{ label: arg.toLowerCase() === "$focus" ? FOCUS : arg }]];
        break;

      case "cat":
        lines =
          target === "links.txt"
            ? [linksLine]
            : [[{ label: `cat: ${arg || "missing file"}: no such file or directory`, tone: "err" }]];
        break;

      case "links":
        lines = [linksLine];
        break;

      case "contact":
      case "email":
      case "mail":
        lines = [mailLine, linksLine];
        break;

      case "pwd":
        lines = [[{ label: "~/sajeel/portfolio" }]];
        break;

      case "sudo":
        lines = [[{ label: "permission denied — but you can hire me the normal way:", tone: "dim" }], mailLine];
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        lines = [
          [{ label: `zsh: command not found: ${name}`, tone: "err" }],
          [{ label: "try", tone: "dim" }, { label: "help", run: "help" }],
        ];
    }

    const id = nextId.current++;
    setHistory((h) => [...h, { id, cmd, lines }]);
    then?.();
  };

  const submit = (raw: string) => {
    if (raw.trim()) setPast((p) => [...p, raw.trim()]);
    setRecall(null);
    setValue("");
    exec(raw);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    } else if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const i = recall === null ? past.length - 1 : Math.max(0, recall - 1);
      setRecall(i);
      setValue(past[i]);
    } else if (e.key === "ArrowDown" && recall !== null) {
      e.preventDefault();
      const i = recall + 1;
      setRecall(i >= past.length ? null : i);
      setValue(i >= past.length ? "" : past[i]);
    }
  };

  // A click anywhere on the screen puts you at the prompt — unless it landed
  // on a link or button, or the visitor is selecting text.
  const focusPrompt = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, input")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      // mr-3 leaves room for the 12px offset inside the gutter.
      className="mr-3 w-full max-w-110 rotate-[-1.5deg] justify-self-start rounded-lg bg-bg font-mono text-[13px] text-fg shadow-ember lg:justify-self-end"
    >
      <div aria-hidden className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-brand" />
        <span className="ml-auto text-[11px] text-dim">zsh</span>
      </div>

      <div className="px-5 pt-5 pb-4" onClick={focusPrompt}>
        <div
          ref={screenRef}
          role="log"
          aria-label="Terminal output"
          className="flex max-h-[min(300px,45vh)] flex-col gap-3 overflow-y-auto pb-3 [scrollbar-width:thin]"
        >
          {history.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-1">
              <span>
                <span aria-hidden className="mr-2.5 text-brand-bright">
                  $
                </span>
                {entry.cmd}
              </span>
              {entry.lines.map((line, i) => (
                <span key={i} className="flex flex-wrap gap-x-4 gap-y-1 pl-5 text-muted">
                  {line.map((seg) => (
                    <SegView key={seg.label} seg={seg} onRun={submit} />
                  ))}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <span aria-hidden className="mr-2.5 text-brand-bright">
            $
          </span>
          <div className="relative flex-1">
            {!value && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2 text-dim"
              >
                {!focused && <span className="inline-block h-4 w-2 animate-blink bg-brand" />}
                type “help”
              </span>
            )}
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Terminal command. Type help for a list of commands."
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              // 16px below sm stops iOS zooming the page on focus.
              className="w-full bg-transparent text-base text-fg caret-brand-bright outline-none sm:text-[13px]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-3.5">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => submit(chip)}
              className="cursor-pointer border border-ink/15 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-brand hover:text-fg"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SegView({ seg, onRun }: { seg: Seg; onRun: (cmd: string) => void }) {
  const link =
    "text-brand-bright underline decoration-brand-bright/40 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg";

  if (seg.run !== undefined) {
    const cmd = seg.run;
    return (
      <button type="button" onClick={() => onRun(cmd)} className={`cursor-pointer ${link}`}>
        {seg.label}
      </button>
    );
  }

  if (seg.href?.startsWith("/")) {
    return (
      <Link href={seg.href} className={link}>
        {seg.label}
      </Link>
    );
  }

  if (seg.href) {
    const external = seg.href.startsWith("http");
    return (
      <a
        href={seg.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={link}
      >
        {seg.label}
      </a>
    );
  }

  const tone = seg.tone === "dim" ? "text-dim" : seg.tone === "err" ? "text-brand-bright" : "";
  return <span className={tone}>{seg.label}</span>;
}
