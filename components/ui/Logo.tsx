/**
 * Pixel SH mark (option 2c). Letters use currentColor, so the ScrollFx
 * repaint of [data-bar-ink] recolors it on the cream slab automatically.
 */
type Kind = "i" | "a" | "0" | "1" | "2";
const CELLS: [number, number, Kind][] = [[0,0,"i"],[1,0,"i"],[2,0,"a"],[3,0,"1"],[4,0,"i"],[5,0,"2"],[6,0,"i"],[0,1,"i"],[1,1,"2"],[2,1,"1"],[3,1,"0"],[4,1,"i"],[5,1,"1"],[6,1,"i"],[0,2,"i"],[1,2,"i"],[2,2,"i"],[3,2,"2"],[4,2,"i"],[5,2,"a"],[6,2,"i"],[0,3,"1"],[1,3,"2"],[2,3,"i"],[3,3,"0"],[4,3,"i"],[5,3,"2"],[6,3,"i"],[0,4,"i"],[1,4,"i"],[2,4,"i"],[3,4,"1"],[4,4,"i"],[5,4,"1"],[6,4,"i"]];
const OPACITY: Record<Kind, number> = { i: 1, a: 1, "0": 0.07, "1": 0.13, "2": 0.2 };

export function Logo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="13 23 74 54"
      width={size * (74 / 54)}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {CELLS.map(([c, r, k]) => (
        <rect
          key={`${c}-${r}`}
          x={15.5 + c * 10}
          y={25.5 + r * 10}
          width={9}
          height={9}
          rx={1.2}
          fill={k === "a" ? "var(--color-brand)" : "currentColor"}
          opacity={OPACITY[k]}
        />
      ))}
    </svg>
  );
}
