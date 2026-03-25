import { useState } from "react";
import { Plus, Trash2, DollarSign, Save } from "lucide-react";
import Header from "../layout/Header";

const DEFAULT_SERVICES = [
  { id: 1, name: "Монтаж подсистемы", unit: "м²", price: 900 },
  { id: 2, name: "Монтаж утеплителя", unit: "м²", price: 250 },
  { id: 3, name: "Монтаж облицовки", unit: "м²", price: 800 },
  { id: 4, name: "Монтаж откосов", unit: "м.п.", price: 450 },
  { id: 5, name: "Монтаж парапетов", unit: "м.п.", price: 600 },
  { id: 6, name: "Монтаж углов", unit: "м.п.", price: 400 },
  { id: 7, name: "Монтаж примыканий", unit: "м.п.", price: 350 },
  { id: 8, name: "Леса строительные", unit: "м²", price: 120 },
  { id: 9, name: "Подъем материала", unit: "м²", price: 90 },
  { id: 10, name: "Демонтаж фасада", unit: "м²", price: 300 },
];

const fmt = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

export default function PriceListPage({ onNavigate }) {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [saved, setSaved] = useState(false);

  const updateService = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, [field]: field === "price" ? Number(value) || 0 : value }
          : s
      )
    );
    setSaved(false);
  };

  const addService = () => {
    const newId = Date.now();
    setServices((prev) => [
      ...prev,
      { id: newId, name: "", unit: "м²", price: 0 },
    ]);
    setSaved(false);
  };

  const removeService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalServices = services.length;
  const avgPrice = totalServices > 0
    ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / totalServices)
    : 0;

  return (
    <>
      <Header title="Прайс услуг" subtitle="Управление ценами на монтажные работы" onNavigate={onNavigate} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        {/* Stats row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
          <div
            style={{
              background: "white", borderRadius: 14, padding: "16px 22px",
              border: "1px solid #f0f0f3", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(59,130,246,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <DollarSign size={18} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Всего услуг</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#18181b" }}>{totalServices}</div>
            </div>
          </div>
          <div
            style={{
              background: "white", borderRadius: 14, padding: "16px 22px",
              border: "1px solid #f0f0f3", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(16,185,129,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <DollarSign size={18} style={{ color: "#059669" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Средняя цена</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#18181b" }}>{fmt(avgPrice)}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: "white", borderRadius: 14,
            border: "1px solid #f0f0f3", overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Table header bar */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid #f4f4f5",
            }}
          >
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Услуги и расценки</h2>
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                Редактируйте цены — они будут использоваться при формировании КП
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={addService}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 9,
                  border: "1px dashed #cbd5e1", background: "white",
                  color: "#1d4ed8", fontSize: 13, fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Plus size={15} /> Добавить услугу
              </button>
              <button
                onClick={handleSave}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 16px", borderRadius: 9, border: "none",
                  background: saved
                    ? "linear-gradient(135deg, #059669, #10b981)"
                    : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                  color: "white", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 2px 10px rgba(29,78,216,0.2)",
                  transition: "all 0.2s",
                }}
              >
                <Save size={14} /> {saved ? "Сохранено" : "Сохранить"}
              </button>
            </div>
          </div>

          {/* Table content */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
                  <th
                    style={{
                      textAlign: "left", padding: "10px 20px", fontSize: 11,
                      fontWeight: 600, color: "#94a3b8", textTransform: "uppercase",
                      letterSpacing: "0.05em", width: 40,
                    }}
                  >
                    №
                  </th>
                  <th
                    style={{
                      textAlign: "left", padding: "10px 14px", fontSize: 11,
                      fontWeight: 600, color: "#94a3b8", textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Название услуги
                  </th>
                  <th
                    style={{
                      textAlign: "left", padding: "10px 14px", fontSize: 11,
                      fontWeight: 600, color: "#94a3b8", textTransform: "uppercase",
                      letterSpacing: "0.05em", width: 160,
                    }}
                  >
                    Единица измерения
                  </th>
                  <th
                    style={{
                      textAlign: "right", padding: "10px 14px", fontSize: 11,
                      fontWeight: 600, color: "#94a3b8", textTransform: "uppercase",
                      letterSpacing: "0.05em", width: 160,
                    }}
                  >
                    Цена, ₽
                  </th>
                  <th style={{ width: 60, padding: "10px 14px" }} />
                </tr>
              </thead>
              <tbody>
                {services.map((service, idx) => (
                  <tr
                    key={service.id}
                    style={{
                      borderBottom: idx < services.length - 1 ? "1px solid #fafafa" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td
                      style={{
                        padding: "10px 20px", fontSize: 13, color: "#94a3b8",
                        fontWeight: 500, fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td style={{ padding: "8px 14px" }}>
                      <input
                        value={service.name}
                        onChange={(e) => updateService(service.id, "name", e.target.value)}
                        placeholder="Название услуги..."
                        style={{
                          width: "100%", height: 36, padding: "0 12px",
                          borderRadius: 8, border: "1px solid #e2e8f0",
                          fontSize: 14, color: "#0f172a", outline: "none",
                          background: "transparent", boxSizing: "border-box",
                          transition: "border-color 0.15s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                    </td>
                    <td style={{ padding: "8px 14px" }}>
                      <select
                        value={service.unit}
                        onChange={(e) => updateService(service.id, "unit", e.target.value)}
                        style={{
                          width: "100%", height: 36, padding: "0 10px",
                          borderRadius: 8, border: "1px solid #e2e8f0",
                          fontSize: 13, color: "#0f172a", outline: "none",
                          background: "white", cursor: "pointer",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="м²">м²</option>
                        <option value="м.п.">м.п.</option>
                        <option value="шт.">шт.</option>
                        <option value="компл.">компл.</option>
                        <option value="т">т</option>
                        <option value="куб.м">куб.м</option>
                      </select>
                    </td>
                    <td style={{ padding: "8px 14px" }}>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateService(service.id, "price", e.target.value)}
                        style={{
                          width: "100%", height: 36, padding: "0 12px",
                          borderRadius: 8, border: "1px solid #e2e8f0",
                          fontSize: 14, color: "#0f172a", outline: "none",
                          background: "transparent", textAlign: "right",
                          fontVariantNumeric: "tabular-nums", fontWeight: 600,
                          boxSizing: "border-box", transition: "border-color 0.15s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                    </td>
                    <td style={{ padding: "8px 14px", textAlign: "center" }}>
                      <button
                        onClick={() => removeService(service.id)}
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          border: "1px solid #f0f0f3", background: "white",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", color: "#d4d4d8",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#fecaca";
                          e.currentTarget.style.color = "#ef4444";
                          e.currentTarget.style.background = "#fef2f2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#f0f0f3";
                          e.currentTarget.style.color = "#d4d4d8";
                          e.currentTarget.style.background = "white";
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom add button */}
          <div
            style={{
              padding: "14px 20px", borderTop: "1px solid #f4f4f5",
              display: "flex", alignItems: "center",
            }}
          >
            <button
              onClick={addService}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8,
                border: "none", background: "transparent",
                color: "#94a3b8", fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              <Plus size={15} /> Добавить услугу
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
