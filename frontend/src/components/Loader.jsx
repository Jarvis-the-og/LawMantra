const STEPS = [
  { label: "Extracting text from image", icon: "◈" },
  { label: "Classifying scam pattern", icon: "◎" },
  { label: "Mapping legal sections", icon: "§" },
  { label: "Generating action plan", icon: "→" },
];

export default function Loader({ step = 0 }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-10">
      {/* Scanner visual */}
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-2xl border border-accent/30 bg-surface overflow-hidden">
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scanline opacity-80" />
          {/* Grid dots */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0 p-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-slate-700 mx-auto my-auto"
                style={{
                  animationDelay: `${i * 80}ms`,
                  opacity: i % 3 === 0 ? 0.6 : 0.2,
                }}
              />
            ))}
          </div>
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse-slow" />
      </div>

      {/* Status steps */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500 ${
                active
                  ? "bg-accent/10 border border-accent/30"
                  : done
                  ? "opacity-50"
                  : "opacity-20"
              }`}
            >
              <span
                className={`font-mono text-sm ${
                  active ? "text-accent" : done ? "text-safe" : "text-muted"
                }`}
              >
                {done ? "✓" : s.icon}
              </span>
              <span
                className={`text-sm font-body ${
                  active ? "text-slate-200" : done ? "text-slate-500" : "text-slate-600"
                }`}
              >
                {s.label}
              </span>
              {active && (
                <span className="ml-auto flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1 h-1 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-muted text-xs font-mono tracking-widest uppercase animate-pulse">
        Analyzing...
      </p>
    </div>
  );
}
