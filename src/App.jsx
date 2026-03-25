import { useState } from "react";
import Sidebar from "./layout/Sidebar";
import DashboardPage from "./pages/Dashboard";
import ProposalsPage from "./pages/Proposals";
import CreateProposalPage from "./pages/CreateProposal";
import CompanyPage from "./pages/Company";
import PriceListPage from "./pages/PriceList";

const PAGE_MAP = {
  dashboard:       DashboardPage,
  proposals:       ProposalsPage,
  "proposals/new": CreateProposalPage,
  company:         CompanyPage,
  pricelist:       PriceListPage,
};

export default function App() {
  const [page, setPage] = useState("dashboard");

  const ActivePage = PAGE_MAP[page] || DashboardPage;

  return (
    <div
      style={{
        display: "flex", minHeight: "100vh", background: "#f8fafc",
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Sidebar currentPage={page} onNavigate={setPage} />
      <div style={{ marginLeft: 256, flex: 1, minHeight: "100vh" }}>
        <ActivePage onNavigate={setPage} />
      </div>
    </div>
  );
}
