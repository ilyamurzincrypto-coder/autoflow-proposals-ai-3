import { useState } from "react";
import {
  ArrowLeft, Send, Download, Eye, GripVertical, Trash2, FileText,
} from "lucide-react";
import { BLOCK_TYPES, BLOCK_ICON_MAP } from "../data/mockProposals";
import Pill from "../components/Pill";
import Toggle from "../components/Toggle";
import CanvasBlock from "../components/CanvasBlock";
import PreviewBlock from "../components/PreviewBlock";

export default function CreateProposalPage({ onNavigate }) {
  const [blocks, setBlocks] = useState([
    { id: "b1", type: "heading", content: "Коммерческое предложение на монтаж вентилируемого фасада" },
    { id: "b2", type: "text",    content: "Предлагаем выполнить работы по монтажу навесного вентилируемого фасада на объекте ЖК Парус, корпус 3. В состав работ входит монтаж подсистемы, утепление минераловатными плитами 150 мм, монтаж ветрозащиты и облицовка фасадными кассетами." },
    { id: "b3", type: "table",   content: "Смета работ и материалов" },
    { id: "b4", type: "price",   content: "18 450 000 ₽" },
  ]);
  const [selectedBlock, setSelectedBlock] = useState("b1");
  const [calcType, setCalcType]           = useState("works_materials_system");
  const [priceStrategy, setPriceStrategy] = useState("medium");
  const [deadline, setDeadline]           = useState("tz");
  const [role, setRole]                   = useState("sub");
  const [includes, setIncludes]           = useState({
    delivery: true, unloading: false, scaffolding: true,
    ppr: false, docs: true, warranty: true,
  });

  const toggleInclude = (key) => setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));

  const addBlock = (type) => {
    const defaults = {
      heading: "Новый раздел", text: "Описание работ...", table: "Смета",
      price: "0 ₽", image: "Фасадная схема", ai: "AI генерация раздела КП...",
    };
    const nb = { id: "b" + Date.now(), type, content: defaults[type] || "" };
    setBlocks([...blocks, nb]);
    setSelectedBlock(nb.id);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(blocks[0]?.id);
  };

  const calcTypes = [
    ["works", "Только работы"],
    ["works_materials", "Работы + материалы"],
    ["works_materials_system", "Работы + мат. + подсистема"],
    ["turnkey", "Под ключ"],
  ];
  const priceStrategies = [
    ["min", "Минимальная"], ["below", "Ниже рынка"],
    ["medium", "Средняя"],  ["high", "Высокая"],
  ];
  const deadlines      = [["tz", "По ТЗ"], ["custom", "Свой срок"], ["urgent", "Срочно"]];
  const roles          = [["sub", "Субподрядчик"], ["gen", "Генподряд"]];
  const includeOptions = [
    ["delivery", "Доставка"],    ["unloading", "Разгрузка"],
    ["scaffolding", "Леса"],     ["ppr", "ППР"],
    ["docs", "Исп. документация"], ["warranty", "Гарантия"],
  ];
  const fields = [
    ["Название КП", "КП на монтаж вентфасада"],
    ["Заказчик", 'ООО "СтройИнвест"'],
    ["Объект", "ЖК Парус, корпус 3"],
  ];

  return (
    <>
      {/* Editor header */}
      <div
        style={{
          height: 54, borderBottom: "1px solid #ededf0",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", position: "sticky", top: 0, zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => onNavigate("dashboard")}
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: "1px solid #ededf0", background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#64748b",
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>Новое КП</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Черновик · не сохранено</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              padding: "6px 14px", borderRadius: 8,
              border: "1px solid #ededf0", background: "white",
              color: "#52525b", fontSize: 13, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
            }}
          >
            <Download size={14} /> PDF
          </button>
          <button
            style={{
              padding: "6px 14px", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "white", fontSize: 13, fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              boxShadow: "0 2px 10px rgba(29,78,216,0.2)",
            }}
          >
            <Send size={14} /> Отправить
          </button>
        </div>
      </div>

      {/* Three-column layout */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "252px 1fr 288px",
          height: "calc(100vh - 54px)", overflow: "hidden",
        }}
      >
        {/* LEFT: Block palette + Structure */}
        <div
          style={{
            borderRight: "1px solid #ededf0", background: "#fbfbfd",
            padding: 14, overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 10, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
            }}
          >
            Блоки
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.id}
                onClick={() => addBlock(bt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: 9,
                  border: "1px solid #ededf0", background: "white",
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#bfdbfe";
                  e.currentTarget.style.background = "#eff6ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#ededf0";
                  e.currentTarget.style.background = "white";
                }}
              >
                <div
                  style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: "rgba(59,130,246,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#3b82f6", flexShrink: 0,
                  }}
                >
                  <bt.icon size={15} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#18181b" }}>{bt.label}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{bt.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ height: 1, background: "#ededf0", margin: "14px 0" }} />

          <div
            style={{
              fontSize: 10, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
            }}
          >
            Структура КП
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {blocks.map((b) => {
              const BI = BLOCK_ICON_MAP[b.type] || FileText;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBlock(b.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 8px", borderRadius: 7,
                    background: selectedBlock === b.id ? "rgba(59,130,246,0.08)" : "transparent",
                    color: selectedBlock === b.id ? "#1d4ed8" : "#64748b",
                    fontSize: 12, fontWeight: selectedBlock === b.id ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  <GripVertical size={11} style={{ color: "#cbd5e1" }} />
                  <BI size={14} />
                  <span
                    style={{
                      flex: 1, overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}
                  >
                    {b.content}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeBlock(b.id); }}
                    style={{
                      width: 18, height: 18, border: "none",
                      background: "transparent", cursor: "pointer",
                      color: "#cbd5e1", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      borderRadius: 4, flexShrink: 0,
                    }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER: Canvas */}
        <div
          style={{
            background: "#f1f5f9", padding: 28, overflowY: "auto",
            display: "flex", justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%", maxWidth: 680, background: "white",
              borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              padding: "44px 48px", minHeight: 800,
            }}
          >
            {blocks.map((b) => (
              <div key={b.id} onClick={() => setSelectedBlock(b.id)}>
                <CanvasBlock block={b} selected={selectedBlock === b.id} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Settings + Preview */}
        <div
          style={{
            borderLeft: "1px solid #ededf0", background: "#fbfbfd",
            padding: 14, overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 10, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
            }}
          >
            Параметры КП
          </div>

          {/* Fields */}
          <div
            style={{
              background: "white", borderRadius: 10, padding: 14,
              border: "1px solid #ededf0",
              display: "flex", flexDirection: "column", gap: 12, marginBottom: 14,
            }}
          >
            {fields.map(([l, v]) => (
              <div key={l}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 3 }}>
                  {l}
                </label>
                <input
                  defaultValue={v}
                  style={{
                    width: "100%", height: 32, padding: "0 10px",
                    borderRadius: 7, border: "1px solid #e2e8f0",
                    fontSize: 13, color: "#0f172a", outline: "none",
                    background: "#fbfbfd", boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Calc type */}
          <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #ededf0", marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Тип расчёта</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {calcTypes.map(([k, l]) => (
                <Pill key={k} label={l} active={calcType === k} onClick={() => setCalcType(k)} />
              ))}
            </div>
          </div>

          {/* Price strategy */}
          <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #ededf0", marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Стратегия цены</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {priceStrategies.map(([k, l]) => (
                <Pill key={k} label={l} active={priceStrategy === k} onClick={() => setPriceStrategy(k)} />
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #ededf0", marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Срок</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {deadlines.map(([k, l]) => (
                <Pill key={k} label={l} active={deadline === k} onClick={() => setDeadline(k)} />
              ))}
            </div>
          </div>

          {/* Includes */}
          <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #ededf0", marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Включить в КП</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {includeOptions.map(([k, l]) => (
                <Toggle key={k} label={l} checked={includes[k]} onClick={() => toggleInclude(k)} />
              ))}
            </div>
          </div>

          {/* Role */}
          <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #ededf0", marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Роль</label>
            <div style={{ display: "flex", gap: 5 }}>
              {roles.map(([k, l]) => (
                <Pill key={k} label={l} active={role === k} onClick={() => setRole(k)} />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              fontSize: 10, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 10, marginTop: 4,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <span>Превью</span>
            <Eye size={12} />
          </div>
          <div
            style={{
              background: "white", borderRadius: 10, padding: 16,
              border: "1px solid #ededf0", boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                width: "100%", height: 3, borderRadius: 2,
                background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #93c5fd)",
                marginBottom: 16,
              }}
            />
            {blocks.map((b) => (
              <PreviewBlock key={b.id} block={b} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
