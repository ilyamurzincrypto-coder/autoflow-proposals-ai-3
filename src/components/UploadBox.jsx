export default function UploadBox({ label, desc, icon: Icon }) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <div
        style={{
          height: 90, borderRadius: 10, border: "2px dashed #cbd5e1",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", color: "#94a3b8", gap: 4, cursor: "pointer",
        }}
      >
        <Icon size={22} />
        <span style={{ fontSize: 12 }}>{desc}</span>
        <span style={{ fontSize: 10, color: "#cbd5e1" }}>PNG, JPG · до 2 МБ</span>
      </div>
    </div>
  );
}
