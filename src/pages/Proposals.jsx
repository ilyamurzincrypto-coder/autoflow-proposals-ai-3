import Header from "../layout/Header";
import ProposalsTable from "../components/ProposalsTable";
import { PROPOSALS } from "../data/mockProposals";

export default function ProposalsPage({ onNavigate }) {
  return (
    <>
      <Header
  title="КП"
  subtitle="..."
  onNavigate={onNavigate}
  currentPage="proposals"
/>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <ProposalsTable proposals={PROPOSALS} onNavigate={onNavigate} />
      </div>
    </>
  );
}
