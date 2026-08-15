/**
 * Reusable SVG ornaments — inline so they inherit currentColor and stay
 * crisp at any size. Lightweight (no image requests).
 */

/** A small lotus / diamond motif used to centre divider rules. */
export function LotusMark({ className = '', size = 34 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.1" fill="none">
        <path d="M24 8c2.6 4 2.6 9 0 13-2.6-4-2.6-9 0-13Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M24 21c-3-3-8-4-12-3 2 3.6 6 5.6 12 5" />
        <path d="M24 21c3-3 8-4 12-3-2 3.6-6 5.6-12 5" />
        <path d="M24 22c-5-1-10 1-13 5 4 2.4 9 2 13-2" />
        <path d="M24 22c5-1 10 1 13 5-4 2.4-9 2-13-2" />
        <circle cx="24" cy="27" r="2.2" fill="currentColor" fillOpacity="0.25" />
      </g>
    </svg>
  );
}

/** Horizontal flourish that trails off to both sides. */
export function DividerFlourish({ className = '', width = 220 }) {
  return (
    <svg
      className={className}
      width={width}
      height="24"
      viewBox="0 0 220 24"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M2 12h60" opacity="0.5" />
        <path d="M62 12c6 0 8-5 14-5s8 5 14 5" />
        <path d="M218 12h-60" opacity="0.5" />
        <path d="M158 12c-6 0-8-5-14-5s-8 5-14 5" />
        <circle cx="110" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
        <circle cx="96" cy="12" r="1.4" fill="currentColor" />
        <circle cx="124" cy="12" r="1.4" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Corner paisley bracket. Flip with CSS transforms per corner. */
export function CornerBracket({ className = '', size = 90 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M6 40c0-18 16-34 34-34" opacity="0.6" />
        <path d="M6 26C6 15 15 6 26 6" />
        <path d="M14 46c8-2 14-8 16-16 2 8 8 14 16 16-8 2-14 8-16 16-2-8-8-14-16-16Z" fillOpacity="0.1" fill="currentColor" />
        <circle cx="30" cy="30" r="1.8" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Peacock-feather eye accent. */
export function FeatherEye({ className = '', size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="20" rx="11" ry="15" fill="#25406b" fillOpacity="0.18" />
      <ellipse cx="20" cy="22" rx="6.5" ry="8.5" fill="#2f6b52" fillOpacity="0.5" />
      <circle cx="20" cy="23" r="3.4" fill="#7c2b33" fillOpacity="0.7" />
      <circle cx="20" cy="23" r="1.4" fill="#c9a24b" />
    </svg>
  );
}

export default { LotusMark, DividerFlourish, CornerBracket, FeatherEye };
