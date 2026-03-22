const SCAM_LABELS = {
  phishing: "Phishing Attack",
  upi_fraud: "UPI Fraud",
  job_scam: "Job Scam",
  lottery_scam: "Lottery Scam",
  unknown: "Suspicious Message",
};

const SCAM_ICONS = {
  phishing: "🎣",
  upi_fraud: "💸",
  job_scam: "💼",
  lottery_scam: "🎰",
  unknown: "⚠️",
};

const RISK_CONFIG = {
  HIGH: { badge: "badge-high", bar: "bg-accent", label: "High Risk", width: "w-full" },
  MEDIUM: { badge: "badge-medium", bar: "bg-warn", label: "Medium Risk", width: "w-2/3" },
  LOW: { badge: "badge-low", bar: "bg-highlight", label: "Low Risk", width: "w-1/3" },
};

export default function ResultCard({ result }) {
  const { scamType, confidence, riskLevel, law, explanation } = result;
  const risk = RISK_CONFIG[riskLevel] || RISK_CONFIG.LOW;
  const label = SCAM_LABELS[scamType] || "Unknown Scam";
  const icon = SCAM_ICONS[scamType] || "⚠️";

  return (
    <div className="flex flex-col gap-4 animate-fade-up">
      {/* Scam Type Header */}
      <div className="card p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="section-label">Detected Scam</span>
            <span className={`badge ${risk.badge}`}>{risk.label}</span>
          </div>
          <h2 className="font-display font-bold text-xl text-white">{label}</h2>
          {explanation && (
            <p className="text-muted text-sm mt-1.5 font-body leading-relaxed">{explanation}</p>
          )}
        </div>
      </div>

      {/* Confidence Score */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="section-label">AI Confidence</span>
          <span className="font-mono text-sm text-slate-300">{confidence}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${risk.bar}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-2 font-body">
          {confidence > 80
            ? "High confidence — strong indicators of fraud detected."
            : confidence > 50
            ? "Moderate confidence — proceed with caution."
            : "Low confidence — may be a false positive, but review carefully."}
        </p>
      </div>

      {/* Legal Section */}
      {law && (
        <div className="card p-5 border-l-2 border-l-accent">
          <span className="section-label block mb-3">Applicable Law</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <span className="font-mono text-accent text-xs mt-0.5">§</span>
              <div>
                <p className="font-display font-semibold text-slate-200 text-sm">{law.section}</p>
                <p className="text-muted text-xs mt-0.5 font-body">{law.description}</p>
              </div>
            </div>
            <div className="mt-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <p className="text-xs font-mono text-slate-400">
                <span className="text-slate-500">Punishment → </span>
                {law.punishment}
              </p>
            </div>
            {law.acts && law.acts.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-1">
                {law.acts.map((act) => (
                  <span key={act} className="badge bg-slate-800 text-slate-500 border border-border text-xs">
                    {act}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Where to Report */}
      {law?.reportTo && law.reportTo.length > 0 && (
        <div className="card p-5">
          <span className="section-label block mb-3">Report To</span>
          <div className="flex flex-col gap-2">
            {law.reportTo.map((r) => (
              <div key={r} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-safe flex-shrink-0" />
                <span className="text-sm text-slate-300 font-body">{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
