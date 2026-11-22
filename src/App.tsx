import { OccurrenceProvider, useOccurrence } from "./context";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { FleetDashboard } from "./components/dashboard/FleetDashboard";
import { ReportOccurrenceView } from "./components/report/ReportOccurrenceView";
import { OccurrenceWorkspace } from "./components/workspace/OccurrenceWorkspace";

function AppContent() {
  const { activeNav } = useOccurrence();

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />

        {activeNav === "DASHBOARD" && <FleetDashboard />}
        {activeNav === "REPORT" && <ReportOccurrenceView />}
        {activeNav === "INVESTIGATION" && <OccurrenceWorkspace />}
      </div>
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
