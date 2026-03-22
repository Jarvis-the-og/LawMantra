import { useState } from "react";

export default function ActionList({ actions = [] }) {
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="card p-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="section-label">Immediate Actions</span>
        {actions.length > 0 && (
          <span className="font-mono text-xs text-muted">
            {doneCount}/{actions.length} done
          </span>
        )}
      </div>

      {/* Progress bar */}
      {actions.length > 0 && (
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-safe rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / actions.length) * 100}%` }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {actions.length === 0 ? (
          <p className="text-muted text-sm">No actions available.</p>
        ) : (
          actions.map((action, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`
                flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group
                ${checked[i]
                  ? "bg-safe/5 border border-safe/20 opacity-60"
                  : "bg-slate-900/40 border border-border hover:border-slate-600 hover:bg-slate-800/40"
                }
              `}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Checkbox */}
              <div className={`
                w-5 h-5 mt-0.5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all
                ${checked[i]
                  ? "bg-safe border-safe"
                  : "border-border group-hover:border-slate-500"
                }
              `}>
                {checked[i] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Step number + text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-xs text-muted">Step {i + 1}</span>
                </div>
                <p className={`text-sm font-body leading-snug transition-colors ${checked[i] ? "line-through text-muted" : "text-slate-300"}`}>
                  {action}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      {doneCount === actions.length && actions.length > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-safe/10 border border-safe/20 flex items-center gap-2">
          <span className="text-safe">✓</span>
          <p className="text-safe text-sm font-body">All steps completed. Stay vigilant.</p>
        </div>
      )}
    </div>
  );
}
