import { useState, useCallback } from "react";
import {
  Plus, Trash2, Upload, X, FileSpreadsheet,
  ChevronDown, ChevronRight, PenLine, FileUp, CheckCircle,
} from "lucide-react";
import Header from "../layout/Header";

/* ═══════════════════════════════════════════════════════════════════ */
/*  CONSTANTS                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

const CATEGORIES = ["Подсистема", "Облицовка", "Утеплитель", "Доборные элементы", "Доп работы"];
const UNITS = ["м²", "м.п.", "шт.", "компл.", "т", "куб.м"];

const CATEGORY_FIELDS = {
  "Подсистема": {
    typeLabel: "Система",
    typeOptions: ["U-kon", "Альтернатива", "Татпроф", "NordFox", "Gradas"],
    subtypeLabel: "Тип подсистемы",
    subtypeOptions: ["стандарт", "межэтажная", "усиленная", "рядовая", "угловая"],
    subtypeIsSelect: true,
    defaultUnit: "м²",
  },
  "Облицовка": {
    typeLabel: "Тип облицовки",
    typeOptions: ["Керамогранит", "Композит", "Металлокассеты", "Фиброцемент", "HPL панели"],
    subtypeLabel: "Формат / исполнение",
    subtypePlaceholder: "600x600, 4 мм, кассеты закрытого типа...",
    subtypeIsSelect: false,
    defaultUnit: "м²",
  },
  "Утеплитель": {
    typeLabel: "Тип утеплителя",
    typeOptions: ["Минвата", "PIR", "Пенополистирол", "Каменная вата"],
    subtypeLabel: "Толщина / спецификация",
    subtypePlaceholder: "50 мм, 100 мм, 150 мм...",
    subtypeIsSelect: false,
    defaultUnit: "м²",
  },
  "Доборные элементы": {
    typeLabel: "Тип элемента",
    typeOptions: ["Откос", "Парапет", "Угол", "Примыкание", "Отлив", "Наличник"],
    subtypeLabel: "Материал / исполнение",
    subtypePlaceholder: "оцинковка, алюминий, порошковая окраска...",
    subtypeIsSelect: false,
    defaultUnit: "м.п.",
  },
  "Доп работы": {
    typeLabel: "Вид работ",
    typeOptions: ["Леса строительные", "Подъем материала", "Демонтаж фасада", "Проектирование", "Выезд замерщика", "Разгрузка", "Доставка"],
    subtypeLabel: "Описание / уточнение",
    subtypePlaceholder: "до 10 м, вручную, с автокраном...",
    subtypeIsSelect: false,
    defaultUnit: "м²",
    allowedUnits: ["м²", "м.п.", "шт.", "компл."],
  },
};

const CATEGORY_COLORS = {
  "Подсистема":        { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe", dot: "#3b82f6" },
  "Облицовка":         { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0", dot: "#22c55e" },
  "Утеплитель":        { bg: "#fffbeb", text: "#92400e", border: "#fde68a", dot: "#f59e0b" },
  "Доборные элементы": { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff", dot: "#a855f7" },
  "Доп работы":        { bg: "#fef2f2", text: "#991b1b", border: "#fecaca", dot: "#ef4444" },
};

const DEFAULT_ITEMS = [
  { id: 1,  category: "Подсистема",        type: "U-kon",         subtype: "стандарт",     unit: "м²",     price: 900 },
  { id: 2,  category: "Подсистема",        type: "U-kon",         subtype: "межэтажная",   unit: "м²",     price: 1100 },
  { id: 3,  category: "Подсистема",        type: "Татпроф",       subtype: "усиленная",    unit: "м²",     price: 1050 },
  { id: 4,  category: "Облицовка",         type: "Керамогранит",  subtype: "600x600",      unit: "м²",     price: 800 },
  { id: 5,  category: "Облицовка",         type: "Керамогранит",  subtype: "1200x600",     unit: "м²",     price: 950 },
  { id: 6,  category: "Облицовка",         type: "Композит",      subtype: "4 мм",         unit: "м²",     price: 950 },
  { id: 7,  category: "Облицовка",         type: "Композит",      subtype: "6 мм FR",      unit: "м²",     price: 1200 },
  { id: 8,  category: "Облицовка",         type: "Фиброцемент",   subtype: "8 мм",         unit: "м²",     price: 720 },
  { id: 9,  category: "Утеплитель",        type: "Минвата",       subtype: "100 мм",       unit: "м²",     price: 380 },
  { id: 10, category: "Утеплитель",        type: "Минвата",       subtype: "150 мм",       unit: "м²",     price: 520 },
  { id: 11, category: "Утеплитель",        type: "Каменная вата", subtype: "200 мм",       unit: "м²",     price: 680 },
  { id: 12, category: "Доборные элементы", type: "Откос",         subtype: "оцинковка",    unit: "м.п.",   price: 450 },
  { id: 13, category: "Доборные элементы", type: "Парапет",       subtype: "алюминий",     unit: "м.п.",   price: 550 },
  { id: 14, category: "Доборные элементы", type: "Угол",          subtype: "порошковая окраска", unit: "м.п.", price: 400 },
  { id: 15, category: "Доборные элементы", type: "Примыкание",    subtype: "оцинковка",    unit: "м.п.",   price: 350 },
  { id: 16, category: "Доп работы",        type: "Леса строительные", subtype: "до 10 м",  unit: "м²",     price: 120 },
  { id: 17, category: "Доп работы",        type: "Подъем материала",  subtype: "вручную",  unit: "м²",     price: 90 },
  { id: 18, category: "Доп работы",        type: "Демонтаж фасада",   subtype: "старый фасад", unit: "м²", price: 300 },
];

const MOCK_IMPORT = [
  { category: "Подсистема",        type: "NordFox",        subtype: "стандарт",             unit: "м²",   price: 870 },
  { category: "Облицовка",         type: "HPL панели",     subtype: "12 мм",                unit: "м²",   price: 1400 },
  { category: "Утеплитель",        type: "PIR",            subtype: "80 мм",                unit: "м²",   price: 610 },
  { category: "Доборные элементы", type: "Отлив",          subtype: "оцинковка",            unit: "м.п.", price: 380 },
  { category: "Доп работы",        type: "Выезд замерщика", subtype: "фиксированная ставка", unit: "шт.",  price: 5000 },
];

const fmtPrice = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

const pluralize = (n) => {
  if (n === 1) return "позиция";
  if (n >= 2 && n <= 4) return "позиции";
  return "позиций";
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  MODAL PRIMITIVES                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 520 }}>{children}</div>
    </div>
  );
}

function ModalCard({ children }) {
  return <div style={{ background: "white", borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)", overflow: "hidden" }}>{children}</div>;
}

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 13, color: "#94a3b8" }}>{subtitle}</p>}
      </div>
      <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #f0f0f3", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8", flexShrink: 0, marginLeft: 12 }}><X size={16} /></button>
    </div>
  );
}

function ModalFooter({ children }) {
  return <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 8 }}>{children}</div>;
}

function BtnSecondary({ children, onClick }) {
  return <button onClick={onClick} style={{ padding: "8px 18px", borderRadius: 9, border: "1px solid #e2e8f0", background: "white", color: "#475569", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{children}</button>;
}

function BtnPrimary({ children, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled} style={{ padding: "8px 20px", borderRadius: 9, border: "none", background: disabled ? "#cbd5e1" : "linear-gradient(135deg, #1d4ed8, #3b82f6)", color: "white", fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", boxShadow: disabled ? "none" : "0 2px 10px rgba(29,78,216,0.2)", opacity: disabled ? 0.6 : 1 }}>{children}</button>;
}

function FormField({ label, children }) {
  return <div><label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>{label}</label>{children}</div>;
}

const selStyle = { width: "100%", height: 38, padding: "0 12px", borderRadius: 9, border: "1px solid #e2e8f0", fontSize: 13, color: "#0f172a", outline: "none", background: "white", cursor: "pointer", boxSizing: "border-box" };
const inpStyle = { width: "100%", height: 38, padding: "0 12px", borderRadius: 9, border: "1px solid #e2e8f0", fontSize: 13, color: "#0f172a", outline: "none", background: "white", boxSizing: "border-box" };

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENARIO PICKER MODAL                                             */
/* ═══════════════════════════════════════════════════════════════════ */

function ScenarioPicker({ onClose, onManual, onImport }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <ModalHeader title="Добавление позиции" subtitle="Выберите способ добавления" onClose={onClose} />
        <div style={{ padding: "20px 24px", display: "flex", gap: 12 }}>
          {[
            { label: "Ручной ввод", desc: "Заполнить форму вручную", icon: PenLine, onClick: onManual },
            { label: "Импорт из Excel", desc: "Загрузить .xlsx или .csv", icon: FileSpreadsheet, onClick: onImport },
          ].map((opt) => (
            <button key={opt.label} onClick={opt.onClick}
              style={{ flex: 1, padding: "20px 16px", borderRadius: 12, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "white"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <opt.icon size={22} style={{ color: "#3b82f6" }} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{opt.desc}</div>
            </button>
          ))}
        </div>
        <ModalFooter><BtnSecondary onClick={onClose}>Отмена</BtnSecondary></ModalFooter>
      </ModalCard>
    </Overlay>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MANUAL ADD MODAL                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function ManualAddModal({ onClose, onAdd }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [typeVal, setTypeVal] = useState("");
  const [subtypeVal, setSubtypeVal] = useState("");
  const [unit, setUnit] = useState("м²");
  const [price, setPrice] = useState("");

  const cfg = CATEGORY_FIELDS[category];

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setTypeVal("");
    setSubtypeVal("");
    setUnit(CATEGORY_FIELDS[newCat].defaultUnit);
  };

  const canSubmit = typeVal.trim() !== "" && subtypeVal.trim() !== "" && Number(price) > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd({ id: Date.now(), category, type: typeVal.trim(), subtype: subtypeVal.trim(), unit, price: Number(price) });
    onClose();
  };

  const availableUnits = cfg.allowedUnits || UNITS;

  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <ModalHeader title="Ручной ввод" subtitle="Заполните параметры позиции" onClose={onClose} />
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField label="Категория">
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} style={selStyle}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>

          <FormField label={cfg.typeLabel}>
            <select value={typeVal} onChange={(e) => setTypeVal(e.target.value)} style={selStyle}>
              <option value="">Выберите...</option>
              {cfg.typeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </FormField>

          <FormField label={cfg.subtypeLabel}>
            {cfg.subtypeIsSelect ? (
              <select value={subtypeVal} onChange={(e) => setSubtypeVal(e.target.value)} style={selStyle}>
                <option value="">Выберите...</option>
                {cfg.subtypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input value={subtypeVal} onChange={(e) => setSubtypeVal(e.target.value)} placeholder={cfg.subtypePlaceholder || ""} style={inpStyle} />
            )}
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Ед. измерения">
              <select value={unit} onChange={(e) => setUnit(e.target.value)} style={selStyle}>
                {availableUnits.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </FormField>
            <FormField label="Цена, ₽">
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" style={{ ...inpStyle, textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }} />
            </FormField>
          </div>

          {canSubmit && (
            <div style={{ padding: "12px 14px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 13, color: "#475569" }}>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>Будет добавлено:</span>{" "}
              {category} → {typeVal} → {subtypeVal} · {unit} · {fmtPrice(Number(price))}
            </div>
          )}
        </div>
        <ModalFooter>
          <BtnSecondary onClick={onClose}>Отмена</BtnSecondary>
          <BtnPrimary onClick={handleSubmit} disabled={!canSubmit}>Добавить</BtnPrimary>
        </ModalFooter>
      </ModalCard>
    </Overlay>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  IMPORT MODAL                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

function ImportModal({ onClose, onImport }) {
  const [file, setFile] = useState(null);
  const [imported, setImported] = useState(false);

  const handleImport = () => {
    const newItems = MOCK_IMPORT.map((item, i) => ({ ...item, id: Date.now() + i }));
    onImport(newItems);
    setImported(true);
    setTimeout(() => onClose(), 1200);
  };

  const exampleRows = [
    ["Подсистема", "U-kon", "стандарт", "м²", "900"],
    ["Облицовка", "Керамогранит", "600x600", "м²", "800"],
    ["Утеплитель", "Минвата", "100 мм", "м²", "250"],
    ["Доборные элементы", "Откос", "оцинковка", "м.п.", "450"],
    ["Доп работы", "Леса строительные", "до 10 м", "м²", "120"],
  ];

  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <ModalHeader title="Импорт прайса из Excel" subtitle="Загрузите Excel или CSV в нужном формате" onClose={onClose} />
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", background: "#f8fafc", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Формат файла</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ borderBottom: "1px solid #f1f5f9" }}>{["Категория", "Тип", "Подтип", "Ед.", "Цена"].map((h) => <th key={h} style={{ textAlign: "left", padding: "6px 10px", fontWeight: 600, color: "#94a3b8", fontSize: 10, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
                <tbody>{exampleRows.map((row, i) => <tr key={i} style={{ borderBottom: i < exampleRows.length - 1 ? "1px solid #fafafa" : "none" }}>{row.map((cell, j) => <td key={j} style={{ padding: "5px 10px", color: "#475569", fontSize: 12, fontWeight: j === 4 ? 600 : 400, fontVariantNumeric: j === 4 ? "tabular-nums" : undefined }}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>

          {imported ? (
            <div style={{ padding: 20, borderRadius: 10, background: "#ecfdf5", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <CheckCircle size={20} style={{ color: "#059669" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>Импортировано {MOCK_IMPORT.length} позиций</span>
            </div>
          ) : (
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", borderRadius: 10, border: "2px dashed " + (file ? "#3b82f6" : "#cbd5e1"), background: file ? "#eff6ff" : "#fafafa", cursor: "pointer", transition: "all 0.15s", gap: 8 }}>
              <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} style={{ display: "none" }} />
              <FileUp size={28} style={{ color: file ? "#3b82f6" : "#94a3b8" }} />
              {file
                ? <span style={{ fontSize: 14, fontWeight: 600, color: "#1d4ed8" }}>{file.name}</span>
                : <><span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Нажмите для выбора файла</span><span style={{ fontSize: 12, color: "#94a3b8" }}>.xlsx, .xls, .csv</span></>
              }
            </label>
          )}
        </div>
        <ModalFooter>
          <BtnSecondary onClick={onClose}>{imported ? "Закрыть" : "Отмена"}</BtnSecondary>
          {!imported && <BtnPrimary onClick={handleImport} disabled={!file}>Импортировать</BtnPrimary>}
        </ModalFooter>
      </ModalCard>
    </Overlay>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

export default function PriceListPage({ onNavigate }) {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [collapsed, setCollapsed] = useState({});
  const [modal, setModal] = useState(null);

  const addItem = useCallback((item) => setItems((prev) => [...prev, item]), []);
  const addItems = useCallback((newItems) => setItems((prev) => [...prev, ...newItems]), []);
  const removeItem = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const toggleCategory = (cat) => setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const grouped = {};
  CATEGORIES.forEach((cat) => { grouped[cat] = []; });
  items.forEach((item) => { if (!grouped[item.category]) grouped[item.category] = []; grouped[item.category].push(item); });

  return (
    <>
      <Header title="Прайс услуг" subtitle="Расценки на монтаж вентилируемых фасадов" onNavigate={onNavigate} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: "#64748b" }}>{items.length} {pluralize(items.length)} в прайсе</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setModal("import")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: "1px solid #e2e8f0", background: "white", color: "#475569", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              <Upload size={15} /> Импорт Excel
            </button>
            <button onClick={() => setModal("scenario")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 9, border: "none", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 10px rgba(29,78,216,0.2)" }}>
              <Plus size={16} /> Добавить услугу
            </button>
          </div>
        </div>

        {/* Table card */}
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #f0f0f3", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {CATEGORIES.map((cat) => {
            const catItems = grouped[cat] || [];
            const isCollapsed = collapsed[cat];
            const colors = CATEGORY_COLORS[cat];
            return (
              <div key={cat}>
                <div onClick={() => toggleCategory(cat)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: colors.bg, borderTop: "1px solid " + colors.border, cursor: "pointer", userSelect: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {isCollapsed ? <ChevronRight size={16} style={{ color: colors.text }} /> : <ChevronDown size={16} style={{ color: colors.text }} />}
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors.dot }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{cat}</span>
                    <span style={{ fontSize: 12, color: colors.text, opacity: 0.6, fontWeight: 500 }}>({catItems.length} {pluralize(catItems.length)})</span>
                  </div>
                </div>

                {!isCollapsed && catItems.length > 0 && (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
                        {[["№",40,"left",20],["Категория",undefined,"left",12],["Тип",undefined,"left",12],["Подтип",undefined,"left",12],["Ед.",70,"left",12],["Цена",120,"right",12]].map(([h,w,a,px],i) => (
                          <th key={i} style={{ textAlign: a, padding: `8px ${px}px`, fontSize: 10, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.06em", width: w }}>{h}</th>
                        ))}
                        <th style={{ width: 44, padding: "8px 12px" }} />
                      </tr>
                    </thead>
                    <tbody>
                      {catItems.map((item, idx) => (
                        <tr key={item.id} style={{ borderBottom: idx < catItems.length - 1 ? "1px solid #fafafa" : "none", transition: "background 0.15s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#fafbff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                          <td style={{ padding: "10px 20px", fontSize: 12, color: "#cbd5e1", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{idx + 1}</td>
                          <td style={{ padding: "10px 12px", fontSize: 13, color: "#94a3b8" }}>{item.category}</td>
                          <td style={{ padding: "10px 12px", fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{item.type}</td>
                          <td style={{ padding: "10px 12px", fontSize: 13, color: "#475569" }}>{item.subtype}</td>
                          <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8" }}>{item.unit}</td>
                          <td style={{ padding: "10px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmtPrice(item.price)}</td>
                          <td style={{ padding: "10px 12px", textAlign: "center" }}>
                            <button onClick={() => removeItem(item.id)} style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid #f0f0f3", background: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4d4d8", transition: "all 0.15s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fecaca"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f0f0f3"; e.currentTarget.style.color = "#d4d4d8"; e.currentTarget.style.background = "white"; }}
                            ><Trash2 size={13} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!isCollapsed && catItems.length === 0 && (
                  <div style={{ padding: "18px 20px", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}>Нет позиций в категории</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {modal === "scenario" && <ScenarioPicker onClose={() => setModal(null)} onManual={() => setModal("manual")} onImport={() => setModal("import")} />}
      {modal === "manual" && <ManualAddModal onClose={() => setModal(null)} onAdd={addItem} />}
      {modal === "import" && <ImportModal onClose={() => setModal(null)} onImport={addItems} />}
    </>
  );
}
