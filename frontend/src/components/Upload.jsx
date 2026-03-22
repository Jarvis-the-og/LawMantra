import { useState, useRef, useCallback } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;

export default function Upload({ onFileSelect, disabled }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validate = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, PNG, WEBP, or GIF images are accepted.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Max size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const err = validate(file);
      if (err) {
        setError(err);
        setPreview(null);
        return;
      }
      setError("");
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const clear = (e) => {
    e.stopPropagation();
    setPreview(null);
    setError("");
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
          ${dragging ? "border-accent bg-accent/5 scale-[1.01]" : "border-border hover:border-slate-500 hover:bg-slate-800/30"}
          ${disabled ? "pointer-events-none opacity-50" : ""}
          ${preview ? "border-solid border-border" : ""}
        `}
        style={{ minHeight: 220 }}
      >
        {preview ? (
          /* Preview State */
          <div className="relative w-full h-56 group">
            <img
              src={preview}
              alt="Uploaded screenshot"
              className="w-full h-full object-contain bg-slate-900/60"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={clear}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-border text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                ✕ Remove
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-border text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                ↺ Replace
              </button>
            </div>
            {/* Checkmark badge */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-safe/20 border border-safe/40 flex items-center justify-center">
              <span className="text-safe text-xs">✓</span>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center gap-4 py-14 px-8 text-center">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${dragging ? "bg-accent/20 scale-110" : "bg-slate-800"}`}>
              <svg className={`w-7 h-7 transition-colors ${dragging ? "text-accent" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <p className={`font-display font-semibold text-base transition-colors ${dragging ? "text-accent" : "text-slate-300"}`}>
                {dragging ? "Drop it here" : "Upload scam screenshot"}
              </p>
              <p className="text-muted text-sm mt-1 font-body">
                Drag & drop or <span className="text-slate-400 underline underline-offset-2">browse files</span>
              </p>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {["JPG", "PNG", "WEBP", "GIF"].map((t) => (
                <span key={t} className="badge bg-slate-800 text-slate-500 border border-border">
                  {t}
                </span>
              ))}
              <span className="badge bg-slate-800 text-slate-500 border border-border">max 10MB</span>
            </div>
          </div>
        )}

        {/* Drag glow effect */}
        {dragging && (
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_40px_rgba(239,68,68,0.1)]" />
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={onInputChange}
      />

      {/* Error message */}
      {error && (
        <p className="mt-2 text-accent text-sm font-body flex items-center gap-2">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
