import { Table } from "lucide-react";

export default function PreviewBlock({ block }) {
  const b = block;
  return (
    <div style={{ marginBottom: 8 }}>
      {b.type === "heading" && (
        <div style={{ fontSize: 10, fontWeight: 700, color: "#0f172a" }}>{b.content}</div>
      )}
      {b.type === "text" && (
        <div style={{ fontSize: 7, color: "#94a3b8", lineHeight: 1.4 }}>{b.content}</div>
      )}
      {b.type === "table" && (
        <div
          style={{
            height: 32, borderRadius: 4, background: "#f1f5f9",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Table size={9} style={{ color: "#94a3b8" }} />
        </div>
      )}
      {b.type === "price" && (
        <div
          style={{
            fontSize: 9, fontWeight: 700, color: "#1d4ed8",
            textAlign: "right", padding: "4px 6px",
            background: "#eff6ff", borderRadius: 4,
          }}
        >
          18 450 000 ₽
        </div>
      )}
      {b.type === "image" && <div style={{ height: 20, borderRadius: 3, background: "#f1f5f9" }} />}
      {b.type === "ai" && (
        <div
          style={{
            height: 16, borderRadius: 3,
            background: "linear-gradient(90deg, rgba(59,130,246,0.1), rgba(99,102,241,0.1))",
          }}
        />
      )}
    </div>
  );
}
