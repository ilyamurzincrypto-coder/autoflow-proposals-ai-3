import { useState } from "react";
import { Image, PenTool, Stamp, Layers, Building, FileCheck, Landmark } from "lucide-react";
import Header from "../layout/Header";
import CompanyField from "../components/CompanyField";
import UploadBox from "../components/UploadBox";

export default function CompanyPage({ onNavigate }) {
  const [taxType, setTaxType] = useState("nds");

  return (
    <>
      <Header title="Компания" subtitle="Профиль подрядчика" onNavigate={onNavigate} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Requisites */}
          <div
            style={{
              background: "white", borderRadius: 14, padding: 26,
              border: "1px solid #ededf0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: 15, fontWeight: 700, color: "#0f172a",
                marginBottom: 18, display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <Building size={18} style={{ color: "#3b82f6" }} /> Реквизиты компании
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <CompanyField label="Название компании" value='ООО "ФасадМонтажСтрой"' />

              <div style={{ flex: "1 1 calc(50% - 8px)" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 4 }}>
                  Форма
                </label>
                <div style={{ display: "flex", gap: 6 }}>
                  {["ООО", "ИП", "АО"].map((f, i) => (
                    <button
                      key={f}
                      style={{
                        flex: 1, height: 38, borderRadius: 9,
                        border: "1px solid " + (i === 0 ? "#3b82f6" : "#e2e8f0"),
                        background: i === 0 ? "rgba(59,130,246,0.06)" : "white",
                        color: i === 0 ? "#1d4ed8" : "#64748b",
                        fontSize: 13, fontWeight: i === 0 ? 600 : 500, cursor: "pointer",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <CompanyField label="ИНН"      value="7701234567"                half />
              <CompanyField label="КПП"      value="770101001"                 half />
              <CompanyField label="Город"    value="Москва"                    half />
              <CompanyField label="Телефон"  value="+7 (495) 123-45-67"       half />
              <CompanyField label="Email"    value="info@fasadmontazh.ru"     half />
              <CompanyField label="Директор" value="Петров Сергей Николаевич"  half />

              <div style={{ flex: "1 1 100%" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>
                  Налогообложение
                </label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[["nds", "С НДС (20%)"], ["no_nds", "Без НДС"]].map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => setTaxType(k)}
                      style={{
                        flex: 1, height: 38, borderRadius: 9,
                        border: "1px solid " + (taxType === k ? "#3b82f6" : "#e2e8f0"),
                        background: taxType === k ? "rgba(59,130,246,0.06)" : "white",
                        color: taxType === k ? "#1d4ed8" : "#64748b",
                        fontSize: 13, fontWeight: taxType === k ? 600 : 500, cursor: "pointer",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents & Brand */}
          <div
            style={{
              background: "white", borderRadius: 14, padding: 26,
              border: "1px solid #ededf0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: 15, fontWeight: 700, color: "#0f172a",
                marginBottom: 18, display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <FileCheck size={18} style={{ color: "#3b82f6" }} /> Документы и бренд
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <UploadBox label="Логотип компании"   desc="Загрузить логотип"              icon={Image} />
              <UploadBox label="Подпись директора"   desc="Загрузить подпись"              icon={PenTool} />
              <UploadBox label="Печать организации"  desc="Загрузить печать"               icon={Stamp} />
              <UploadBox label="Фирменный бланк"     desc="Загрузить бланк (.docx / .pdf)" icon={Layers} />
            </div>
          </div>
        </div>

        {/* Bank details */}
        <div
          style={{
            background: "white", borderRadius: 14, padding: 26,
            border: "1px solid #ededf0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            marginTop: 18,
          }}
        >
          <h3
            style={{
              fontSize: 15, fontWeight: 700, color: "#0f172a",
              marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <Landmark size={18} style={{ color: "#3b82f6" }} /> Банковские реквизиты
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <CompanyField label="Расчётный счёт" value="40702810000000012345" half />
            <CompanyField label="Банк"           value='АО "Альфа-Банк"'      half />
            <CompanyField label="БИК"            value="044525593"             half />
            <CompanyField label="Кор. счёт"      value="30101810200000000593"  half />
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "10px 28px",
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "white", border: "none", borderRadius: 9,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 2px 10px rgba(29,78,216,0.2)",
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
}
