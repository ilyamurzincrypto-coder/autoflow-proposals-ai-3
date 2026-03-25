import { Image, Sparkles, Table } from "lucide-react";
import { ESTIMATE_ROWS } from "../data/mockProposals";

export default function CanvasBlock({ block, selected }) {
  const b = block;
  return (
    <div
      style={{
        padding: 10, borderRadius: 8, marginBottom: 10,
        cursor: "pointer", transition: "all 0.15s",
        border: selected ? "2px solid #3b82f6" : "2px solid transparent",
        background: selected ? "rgba(59,130,246,0.02)" : "transparent",
      }}
    >
      {b.type === "heading" && (
        <h2
          contentEditable suppressContentEditableWarning
          style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", outline: "none", letterSpacing: "-0.01em" }}
        >
          {b.content}
        </h2>
      )}

      {b.type === "text" && (
        <p
          contentEditable suppressContentEditableWarning
          style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, outline: "none" }}
        >
          {b.content}
        </p>
      )}

      {b.type === "table" && (
        <div style={{ borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["№", "Наименование работ", "Ед.", "Кол-во", "Цена, ₽", "Сумма, ₽"].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: i > 2 ? "right" : "left",
                      padding: "9px 12px", fontWeight: 600,
                      color: "#475569", fontSize: 12,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ESTIMATE_ROWS.map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f1f5f9" }}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "9px 12px",
                        textAlign: j > 2 ? "right" : "left",
                        color: j === 1 ? "#0f172a" : "#475569",
                        fontWeight: j === 5 ? 600 : 400,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {b.type === "price" && (
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 20px", background: "#f8fafc",
            borderRadius: 10, border: "1px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "#475569" }}>Итого с НДС 20%</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#1d4ed8" }}>18 450 000 ₽</span>
        </div>
      )}

      {b.type === "image" && (
        <div
          style={{
            height: 130, borderRadius: 10, border: "2px dashed #cbd5e1",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", color: "#94a3b8", gap: 6,
          }}
        >
          <Image size={22} />
          <span style={{ fontSize: 13 }}>Загрузить чертёж или фото фасада</span>
        </div>
      )}

      {b.type === "ai" && (
        <div
          style={{
            padding: 18, borderRadius: 10,
            background: "rgba(59,130,246,0.04)",
            border: "1px solid rgba(59,130,246,0.12)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div
            style={{
              width: 38, height: 38, borderRadius: 9,
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>AI генерация</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Опишите раздел — AI сгенерирует текст для КП
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
