export default function CompanyField({ label, value, half }) {
  return (
    <div style={{ flex: half ? "1 1 calc(50% - 8px)" : "1 1 100%" }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 4 }}>
        {label}
      </label>
      <input
        defaultValue={value}
        style={{
          width: "100%", height: 38, padding: "0 12px",
          borderRadius: 9, border: "1px solid #e2e8f0",
          fontSize: 13, color: "#0f172a", outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );
}
