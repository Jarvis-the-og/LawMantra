import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import ActionList from "../components/ActionList";
import { downloadComplaintPDF } from "../services/api";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, fileName } = location.state || {};

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Guard: if accessed directly without state
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted font-body">No analysis result found.</p>
        <button onClick={() => navigate("/")} className="btn-primary">
          ← Go Back
        </button>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!name.trim()) return;
    setPdfError("");
    setPdfLoading(true);
    try {
      await downloadComplaintPDF({
        scamType: result.scamType,
        description: description.trim() || result.explanation,
        name: name.trim(),
        law: result.law,
        actions: result.actions,
      });
    } catch (err) {
      setPdfError("Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const riskColors = {
    HIGH: "text-accent",
    MEDIUM: "text-warn",
    LOW: "text-highlight",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50 sticky top-0 bg-ink/90 backdrop-blur-sm z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted hover:text-slate-300 transition-colors font-body"
        >
          ← New Analysis
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-mono font-semibold ${riskColors[result.riskLevel] || "text-muted"}`}>
            {result.riskLevel} RISK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8 flex flex-col gap-5">
        {/* File info */}
        {fileName && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/40 border border-border w-fit">
            <span className="text-xs font-mono text-muted">Analyzed:</span>
            <span className="text-xs font-mono text-slate-400 truncate max-w-xs">{fileName}</span>
          </div>
        )}

        {/* Main result card */}
        <ResultCard result={result} />

        {/* Action checklist */}
        <ActionList actions={result.actions} />

        {/* Extracted text (collapsible) */}
        {result.extractedText && (
          <details className="card group">
            <summary className="p-5 cursor-pointer flex items-center justify-between list-none hover:bg-slate-800/30 rounded-2xl transition-colors">
              <span className="section-label">Extracted Text from Image</span>
              <span className="text-muted text-xs font-mono group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-5 pb-5">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 max-h-48 overflow-y-auto">
                <pre className="text-xs font-mono text-slate-400 whitespace-pre-wrap leading-relaxed">
                  {result.extractedText}
                </pre>
              </div>
            </div>
          </details>
        )}

        {/* PDF Complaint Section */}
        <div className="card p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="section-label block mb-1">Generate Complaint</span>
              <p className="text-sm text-slate-400 font-body">
                Download a pre-filled cybercrime complaint PDF ready to submit.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-border flex items-center justify-center flex-shrink-0 text-lg">
              📄
            </div>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn-outline w-full justify-center"
            >
              Fill Details & Download PDF
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-mono text-muted block mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-border text-slate-200 text-sm font-body
                             placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted block mb-1.5">
                  Brief Description <span className="text-slate-600">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. I received this WhatsApp message on March 20, 2025..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-border text-slate-200 text-sm font-body
                             placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                />
              </div>

              {pdfError && (
                <p className="text-accent text-sm font-body flex items-center gap-2">
                  <span>⚠</span> {pdfError}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={!name.trim() || pdfLoading}
                  className={`flex-1 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200
                    ${name.trim()
                      ? "bg-accent text-white hover:bg-red-600 active:scale-[0.98] shadow-lg shadow-accent/20"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed"
                    }`}
                >
                  {pdfLoading ? "Generating..." : "⬇ Download PDF"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="btn-outline px-4"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-muted font-body text-center">
                This PDF can be submitted to your local cyber crime cell or at{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 underline underline-offset-2 hover:text-slate-300"
                >
                  cybercrime.gov.in
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Emergency callout */}
        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-center gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="text-sm font-display font-semibold text-slate-200">
              Financial loss? Call immediately.
            </p>
            <p className="text-sm text-muted font-body">
              National Cyber Crime Helpline:{" "}
              <a href="tel:1930" className="text-accent font-mono font-medium hover:underline">
                1930
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-4">
        <p className="text-xs text-muted font-body text-center">
          Legal information provided is for guidance only. Consult a legal professional for advice specific to your case.
        </p>
      </footer>
    </div>
  );
}
