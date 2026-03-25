import {
  LayoutDashboard, Building2, FilePlus, FileText,
  ChevronDown, HardHat, DollarSign,
} from "lucide-react";

export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { id: "dashboard", label: "Дашборд",       icon: LayoutDashboard },
    { id: "proposals", label: "КП",             icon: FileText },
    { id: "company",   label: "Компания",       icon: Building2 },
    { id: "pricelist", label: "Прайс услуг",    icon: DollarSign },
  ];

  return (
    <div
      style={{
        width: 256, height: "100vh", background: "#fbfbfd",
        borderRight: "1px solid #ededf0",
        display: "flex", flexDirection: "column",
        position: "fixed", left: 0, top: 0, zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 12px rgba(29,78,216,0.3)",
          }}
        >
          <HardHat size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em" }}>
            AutoFlow
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.06em" }}>
            ПОДРЯДЧИК
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "8px 10px", flex: 1 }}>
        <div
          style={{
            fontSize: 10, fontWeight: 600, color: "#c4c4cc",
            textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "8px 10px 6px", marginBottom: 2,
          }}
        >
          Навигация
        </div>

        {navItems.map((item) => {
          const active =
            currentPage === item.id ||
            (item.id === "proposals" && currentPage.startsWith("proposals"));
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 9, border: "none",
                background: active ? "white" : "transparent",
                color: active ? "#1d4ed8" : "#64748b",
                fontSize: 14, fontWeight: active ? 600 : 500,
                cursor: "pointer", transition: "all 0.15s",
                boxShadow: active ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                marginBottom: 2, textAlign: "left",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}

        <div style={{ height: 1, background: "#ededf0", margin: "12px 10px" }} />

        <button
          onClick={() => onNavigate("proposals/new")}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 9,
            border: "1px dashed #cbd5e1", background: "transparent",
            color: "#1d4ed8", fontSize: 14, fontWeight: 600,
            cursor: "pointer", textAlign: "left",
          }}
        >
          <FilePlus size={18} />
          Создать КП
        </button>
      </nav>

      {/* User */}
      <div style={{ padding: 10, borderTop: "1px solid #ededf0" }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 9, cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 12, fontWeight: 700,
            }}
          >
            ПС
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#18181b" }}>Петров С.Н.</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Директор</div>
          </div>
          <ChevronDown size={14} style={{ color: "#94a3b8" }} />
        </div>
      </div>
    </div>
  );
}
