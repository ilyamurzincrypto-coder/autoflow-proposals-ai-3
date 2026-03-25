import { STATUS_CONFIG } from "../data/mockProposals";

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 10px", borderRadius: 20,
        fontSize: 12, fontWeight: 500,
        background: cfg.bg, color: cfg.text,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}
