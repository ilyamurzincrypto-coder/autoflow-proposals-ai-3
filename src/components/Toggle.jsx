import { CheckCircle } from "lucide-react";

export default function Toggle({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "5px 11px", borderRadius: 7,
        border: "1px solid " + (checked ? "#3b82f6" : "#e2e8f0"),
        background: checked ? "rgba(59,130,246,0.06)" : "white",
        color: checked ? "#1d4ed8" : "#64748b",
        fontSize: 12, fontWeight: 500, cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 14, height: 14, borderRadius: 4,
          border: checked ? "none" : "1.5px solid #cbd5e1",
          background: checked ? "#3b82f6" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {checked && <CheckCircle size={10} color="white" />}
      </span>
      {label}
    </button>
  );
}
