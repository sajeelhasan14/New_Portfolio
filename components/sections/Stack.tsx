import { TECHNOLOGIES } from "@/data/portfolio";

/** Alternating direction and speed per row, so the rows never march in step. */
const TRACKS = [
  { name: "mq", seconds: 34 },
  { name: "mqr", seconds: 40 },
  { name: "mq", seconds: 30 },
  { name: "mqr", seconds: 36 },
];

export function Stack() {
  return (
    <section id="stack" className="overflow-hidden py-[clamp(80px,9vw,160px)]">
      <div className="gutter mb-[clamp(32px,4vw,60px)] flex flex-wrap items-baseline justify-between gap-6">
        <span className="eyebrow">(04) Technologies</span>
        <h2 className="m-0 text-[clamp(28px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.035em]">
          Tech stack
        </h2>
      </div>

      <div className="flex flex-col gap-3.5">
        {TECHNOLOGIES.map((group, i) => {
          const track = TRACKS[i % TRACKS.length];
          return (
            <div
              key={group.category}
              // A 220px label column would leave the track ~150px on a phone,
              // so the label sits above the marquee until there is room.
              className="grid grid-cols-1 items-center gap-2 pl-[clamp(20px,4vw,56px)] md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-[clamp(14px,2vw,32px)]"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted-2 uppercase">
                {group.category}
              </span>

              <div className="mask-fade-x relative overflow-hidden">
                <div
                  className="flex w-max gap-3 hover:[animation-play-state:paused]"
                  style={{ animation: `${track.name} ${track.seconds}s linear infinite` }}
                >
                  {/* Doubled: the keyframes translate by -50%, so the seam
                      lands exactly where the first copy began. */}
                  {[...group.skills, ...group.skills].map((skill, j) => (
                    <span
                      key={`${skill}-${j}`}
                      className="border border-brand/34 px-5 py-2.5 text-[clamp(15px,1.6vw,22px)] tracking-[-0.01em] whitespace-nowrap text-brand"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
