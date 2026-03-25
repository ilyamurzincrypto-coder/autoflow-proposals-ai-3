import { FileText, ClipboardList, Send, Eye, CheckCircle, DollarSign } from "lucide-react";
import Header from "../layout/Header";
import StatCard from "../components/StatCard";
import ProposalsTable from "../components/ProposalsTable";
import { PROPOSALS } from "../data/mockProposals";
import { fmt } from "../utils/format";

export default function DashboardPage({ onNavigate }) {
  const total        = PROPOSALS.length;
  const drafts       = PROPOSALS.filter((p) => p.status === "draft").length;
  const sent         = PROPOSALS.filter((p) => p.status === "sent").length;
  const viewed       = PROPOSALS.filter((p) => p.status === "viewed").length;
  const accepted     = PROPOSALS.filter((p) => p.status === "accepted").length;
  const activeAmount = PROPOSALS
    .filter((p) => p.status !== "rejected" && p.status !== "draft")
    .reduce((s, p) => s + p.amount, 0);

  const kpis = [
    { icon: FileText,      label: "Всего КП",         value: total,             iconBg: "rgba(59,130,246,0.08)",  iconColor: "#3b82f6" },
    { icon: ClipboardList, label: "Черновики",         value: drafts,            iconBg: "rgba(113,113,122,0.08)", iconColor: "#71717a" },
    { icon: Send,          label: "Отправлено",        value: sent,              iconBg: "rgba(59,130,246,0.08)",  iconColor: "#2563eb" },
    { icon: Eye,           label: "Открыто",           value: viewed,            iconBg: "rgba(245,158,11,0.08)", iconColor: "#d97706" },
    { icon: CheckCircle,   label: "Согласовано",       value: accepted,          iconBg: "rgba(16,185,129,0.08)", iconColor: "#059669" },
    { icon: DollarSign,    label: "Сумма активных КП", value: fmt(activeAmount), iconBg: "rgba(99,102,241,0.08)", iconColor: "#6366f1" },
  ];

  const filters = ["Все", "Черновики", "Активные"];

  return (
    <>
      <Header title="Дашборд" subtitle="Коммерческие предложения — обзор" onNavigate={onNavigate} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        {/* KPI row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 14, marginBottom: 28,
          }}
        >
          {kpis.map((k) => (
            <StatCard key={k.label} {...k} />
          ))}
        </div>

        {/* Section header */}
        <div
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 14,
          }}
        >
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>Все КП</h2>
            <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
              {total} коммерческих предложений
            </p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {filters.map((f, i) => (
              <button
                key={f}
                style={{
                  padding: "5px 14px", borderRadius: 8,
                  border: "1px solid " + (i === 0 ? "#3b82f6" : "#ededf0"),
                  background: i === 0 ? "rgba(59,130,246,0.06)" : "white",
                  color: i === 0 ? "#1d4ed8" : "#64748b",
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ProposalsTable proposals={PROPOSALS} onNavigate={onNavigate} />
      </div>
    </>
  );
}
