import { Search, Plus, Bell } from "lucide-react";

export default function Header({ title, subtitle, onNavigate }) {
  return (
    <div
      style={{
        height: 60, borderBottom: "1px solid #ededf0",
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", position: "sticky", top: 0, zIndex: 40,
      }}
    >
      <div>
        {title && (
          <h1 style={{ fontSize: 16, fontWeight: 700, color: "#18181b", letterSpacing: "-0.01em" }}>
            {title}
          </h1>
        )}
        {subtitle && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{subtitle}</p>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ position: "relative" }}>
          <Search
            size={15}
            style={{
              position: "absolute", left: 11, top: "50%",
              transform: "translateY(-50%)", color: "#c4c4cc",
            }}
          />
          <input
            placeholder="Поиск КП..."
            style={{
              width: 200, height: 34, paddingLeft: 34, paddingRight: 12,
              borderRadius: 9, border: "1px solid #ededf0",
              background: "#fbfbfd", fontSize: 13, outline: "none", color: "#52525b",
            }}
          />
        </div>

        <button
          style={{
            width: 34, height: 34, borderRadius: 9,
            border: "1px solid #ededf0", background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#94a3b8",
          }}
        >
          <Bell size={17} />
        </button>

        <button
          onClick={() => onNavigate("proposals/new")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
            color: "white", border: "none", borderRadius: 9,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 2px 10px rgba(29,78,216,0.2)",
          }}
        >
          <Plus size={16} /> Создать КП
        </button>
      </div>
    </div>
  );
}
