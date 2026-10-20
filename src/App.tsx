import { OccurrenceProvider, useOccurrence } from "./context";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { FleetDashboard } from "./components/dashboard/FleetDashboard";
import { OccurrenceWorkspace } from "./components/workspace/OccurrenceWorkspace";
import { FederatedRadarView } from "./components/radar/FederatedRadarView";
import { EccairsView } from "./components/eccairs/EccairsView";
import { NewOccurrenceModal } from "./components/modals/NewOccurrenceModal";
import "./App.css";

function AppContent() {
  const { activeNav } = useOccurrence();

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="portal-main">
        <Topbar />

        {activeNav === "DASHBOARD" && <FleetDashboard />}
        {activeNav === "INCIDENTS" && <OccurrenceWorkspace />}
        {activeNav === "FEDERATED_RADAR" && <FederatedRadarView />}
        {activeNav === "ECCAIRS" && <EccairsView />}
      </div>

      <NewOccurrenceModal />
    </div>
  );
}

export function App() {
  return (
    <OccurrenceProvider>
      <AppContent />
    </OccurrenceProvider>
  );
}

export default App;
