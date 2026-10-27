export function Squiggle({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 20" className={className} fill="none">
      <path
        d="M2 14C10 4 18 4 26 14C34 24 42 24 50 14C58 4 66 4 74 14C82 24 90 24 98 14C104 6 112 6 118 12"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleUnderline({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 16" className={className} fill="none" preserveAspectRatio="none">
      <path
        d="M2 10C30 2 55 2 75 8C95 14 120 14 145 6C165 0 185 4 198 8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleBurst({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <path
        d="M30 2L34 24L56 28L34 32L30 58L26 32L4 28L26 24L30 2Z"
        fill={color}
      />
    </svg>
  );
}

export function ComicBurst({
  className = "",
  color = "currentColor",
  children,
}: {
  className?: string;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d="M50 2L60 20L80 8L76 30L98 34L80 46L94 64L72 60L70 82L54 66L38 86L34 64L12 70L20 50L2 38L24 32L18 12L40 22L50 2Z"
          fill={color}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </div>
  );
}

export function DashedArrow({
  className = "",
  color = "currentColor",
  flip = false,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M4 8C30 4 55 44 94 48"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="7 8"
      />
      <path d="M80 40L96 49L84 58" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function DoodleStar({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <path
        d="M20 3L23 16L36 20L23 24L20 37L17 24L4 20L17 16L20 3Z"
        fill={color}
      />
    </svg>
  );
}

export function HalftoneDots({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => {
          const r = 1.4 + ((row + col) % 3) * 0.5;
          return (
            <circle
              key={`${row}-${col}`}
              cx={col * 15 + 6}
              cy={row * 15 + 6}
              r={r}
              fill={color}
              opacity={0.5}
            />
          );
        }),
      )}
    </svg>
  );
}

export function TapeStrip({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <div
      className={`h-6 w-16 rotate-[-6deg] rounded-[2px] opacity-90 ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)",
      }}
    />
  );
}

export function WavyDivider({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1440 40" className={className} fill="none" preserveAspectRatio="none">
      <path
        d="M0 20C120 0 240 40 360 20C480 0 600 40 720 20C840 0 960 40 1080 20C1200 0 1320 40 1440 20"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
    </svg>
  );
}
