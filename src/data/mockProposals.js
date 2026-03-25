import {
  Type, Table, Hash, AlignLeft, Image, Sparkles,
} from "lucide-react";

export const PROPOSALS = [
  { id: 1, title: "КП на монтаж вентилируемого фасада", client: 'ООО "СтройИнвест"', object: "ЖК Парус, корпус 3", amount: 18450000, status: "accepted", date: "2026-03-22" },
  { id: 2, title: "КП на устройство фасадной подсистемы", client: 'ООО "Инженерный сервисный центр"', object: "БЦ Альфа", amount: 7320000, status: "viewed", date: "2026-03-20" },
  { id: 3, title: "КП на облицовку фасадными кассетами", client: 'АО "Девелопмент Юг"', object: "Вспомогательный корпус", amount: 4180000, status: "sent", date: "2026-03-18" },
  { id: 4, title: "КП на фасадные работы под ключ", client: 'ООО "ФасадПроект"', object: "ЖК Сириус, корпус А", amount: 32600000, status: "draft", date: "2026-03-17" },
  { id: 5, title: "КП на поставку и монтаж подсистемы", client: 'ООО "ГенСтройПодряд"', object: "Корпус Б", amount: 11900000, status: "rejected", date: "2026-03-14" },
  { id: 6, title: "КП на утепление и облицовку фасада", client: 'АО "РегионСтрой"', object: "Школа №47, г. Краснодар", amount: 9540000, status: "accepted", date: "2026-03-12" },
  { id: 7, title: "КП на монтаж доборных элементов", client: 'ООО "Монтаж-Сервис"', object: "ТЦ Меридиан", amount: 2870000, status: "viewed", date: "2026-03-10" },
  { id: 8, title: "КП на поставку материалов для фасада", client: 'ООО "Альянс Групп"', object: "ЖК Панорама", amount: 5210000, status: "sent", date: "2026-03-08" },
];

export const STATUS_CONFIG = {
  draft:    { label: "Черновик",    dot: "#a1a1aa", bg: "#f4f4f5", text: "#71717a" },
  sent:     { label: "Отправлено",  dot: "#3b82f6", bg: "#eff6ff", text: "#2563eb" },
  viewed:   { label: "Открыто",     dot: "#f59e0b", bg: "#fffbeb", text: "#d97706" },
  accepted: { label: "Согласовано", dot: "#10b981", bg: "#ecfdf5", text: "#059669" },
  rejected: { label: "Отклонено",   dot: "#ef4444", bg: "#fef2f2", text: "#dc2626" },
};

export const BLOCK_TYPES = [
  { id: "heading", icon: Type,      label: "Заголовок",    desc: "Название раздела КП" },
  { id: "text",    icon: AlignLeft,  label: "Текст",        desc: "Описание работ / условий" },
  { id: "table",   icon: Table,     label: "Смета",        desc: "Таблица работ и материалов" },
  { id: "price",   icon: Hash,      label: "Итого",        desc: "Итоговая стоимость" },
  { id: "image",   icon: Image,     label: "Фото / Схема", desc: "Фасадный чертёж или фото" },
  { id: "ai",      icon: Sparkles,  label: "AI блок",      desc: "Сгенерировать раздел с AI" },
];

export const BLOCK_ICON_MAP = {
  heading: Type,
  text: AlignLeft,
  table: Table,
  price: Hash,
  image: Image,
  ai: Sparkles,
};

export const ESTIMATE_ROWS = [
  ["1", "Монтаж подсистемы (кронштейны, профиль)", "м²", "2 400", "850",       "2 040 000"],
  ["2", "Утепление минплитой 150 мм",              "м²", "2 400", "620",       "1 488 000"],
  ["3", "Ветрозащитная мембрана",                   "м²", "2 400", "120",       "288 000"],
  ["4", "Облицовка фасадными кассетами",            "м²", "2 400", "2 100",    "5 040 000"],
  ["5", "Доборные элементы (откосы, парапеты)",     "компл.", "1", "1 450 000", "1 450 000"],
  ["6", "Леса строительные",                        "м²", "2 400", "180",       "432 000"],
];
