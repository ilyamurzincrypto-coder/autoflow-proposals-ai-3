import { Plus, ClipboardList, MapPin, MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { fmt, fmtDate } from "../utils/format";

function EmptyState({ onAction }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "80px 20px", textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80, height: 80, borderRadius: 20,
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24, boxShadow: "0 8px 32px rgba(59,130,246,0.25)",
        }}
      >
        <ClipboardList size={36} color="white" />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 600, color: "#18181b", marginBottom: 8 }}>
        Нет коммерческих предложений
      </h3>
      <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24, maxWidth: 400 }}>
        Создайте первое КП на фасадные или монтажные работы и отправьте заказчику
      </p>
      <button
        onClick={onAction}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 20px",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "white", border: "none", borderRadius: 10,
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(59,130,246,0.25)",
        }}
      >
        <Plus size={18} /> Создать КП
      </button>
    </div>
  );
}

export default function ProposalsTable({ proposals, onNavigate }) {
  if (proposals.length === 0) {
    return <EmptyState onAction={() => onNavigate("proposals/new")} />;
  }

  const headers = ["Название КП", "Заказчик", "Объект", "Сумма", "Статус", "Дата", ""];

  return (
    <div
      style={{
        background: "white", borderRadius: 14,
        border: "1px solid #f0f0f3", overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    textAlign: "left", padding: "11px 14px",
                    fontSize: 11, fontWeight: 600, color: "#a1a1aa",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proposals.map((p, idx) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: idx < proposals.length - 1 ? "1px solid #fafafa" : "none",
                  cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "13px 14px", fontWeight: 600, color: "#18181b", maxWidth: 260 }}>
                  {p.title}
                </td>
                <td style={{ padding: "13px 14px", color: "#52525b" }}>{p.client}</td>
                <td style={{ padding: "13px 14px", color: "#71717a", fontSize: 13 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={12} style={{ color: "#a1a1aa" }} />
                    {p.object}
                  </span>
                </td>
                <td
                  style={{
                    padding: "13px 14px", fontWeight: 600, color: "#18181b",
                    fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
                  }}
                >
                  {fmt(p.amount)}
                </td>
                <td style={{ padding: "13px 14px" }}>
                  <StatusBadge status={p.status} />
                </td>
                <td style={{ padding: "13px 14px", color: "#a1a1aa", fontSize: 13 }}>
                  {fmtDate(p.date)}
                </td>
                <td style={{ padding: "13px 14px", textAlign: "right" }}>
                  <button
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      border: "1px solid #f0f0f3", background: "white",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "#a1a1aa",
                    }}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
