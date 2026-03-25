export default function StatCard({ icon: Icon, label, value, iconBg, iconColor }) {
  return (
    <div
      style={{
        background: "white", borderRadius: 14,
        padding: "18px 22px", border: "1px solid #f0f0f3",
        overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: iconBg || "rgba(59,130,246,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} style={{ color: iconColor || "#3b82f6" }} />
        </div>
        <span style={{ fontSize: 13, color: "#71717a", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em" }}>
        {value}
      </div>
    </div>
  );
}
