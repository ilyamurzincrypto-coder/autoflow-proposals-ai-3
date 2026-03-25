export default function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px", borderRadius: 7,
        border: "1px solid " + (active ? "#3b82f6" : "#e2e8f0"),
        background: active ? "rgba(59,130,246,0.08)" : "white",
        color: active ? "#1d4ed8" : "#64748b",
        fontSize: 12, fontWeight: active ? 600 : 500,
        cursor: "pointer", transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
