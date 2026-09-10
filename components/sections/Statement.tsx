/**
 * The statement beat.
 *
 * 440vh of runway for one sticky screen. ScrollFx reads progress through the
 * section and drives three things off it: the words fill in left to right,
 * the whole line zooms up through the viewport, and the ground crossfades
 * from near-black to the cream that the About slab continues.
 *
 * `data-statement` is the hook globals.css uses to collapse the runway to a
 * single screen under `prefers-reduced-motion`.
 */
const STATEMENT =
  "I write the part users never see — APIs, data models and infrastructure that stay fast when the traffic isn’t polite.";

export function Statement() {
  return (
    <section data-statement="" className="relative h-[440vh] bg-cream">
      <div
        data-fx="stage"
        className="gutter sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-bg"
      >
        <div
          data-fx="grow"
          className="absolute top-0 left-0 w-[min(1300px,92vw)] text-center"
        >
          <p
            data-fill="1"
            className="m-0 text-[clamp(26px,4.2vw,72px)] leading-[1.12] font-medium tracking-[-0.035em] text-balance text-[#34383E]"
          >
            {STATEMENT.split(" ").map((word, i) => (
              // Each word is its own span so the fill can light them in turn.
              <span key={`${word}-${i}`}>{`${word} `}</span>
            ))}
          </p>
        </div>

        <div
          data-fx="ui"
          className="absolute right-[clamp(20px,4vw,56px)] bottom-[34px] left-[clamp(20px,4vw,56px)] flex justify-between font-mono text-[11px] tracking-[0.18em] text-dim"
        >
          <span>SHIPPING SINCE 2024</span>
          <span>FLUTTER → FULL-STACK</span>
        </div>
      </div>
    </section>
  );
}
