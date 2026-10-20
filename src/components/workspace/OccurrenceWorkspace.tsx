import { useOccurrence } from "../../context";
import { CaseQueue } from "./CaseQueue";
import { CaseBanner } from "./CaseBanner";
import { WorkflowStepper } from "./WorkflowStepper";
import { WorkspaceTabs } from "./WorkspaceTabs";
import { ContextualActionPanel } from "./actions/ContextualActionPanel";
import { OverviewTab } from "./tabs/OverviewTab";
import { OemSupportTab } from "./tabs/OemSupportTab";
import { SfhaBaselineTab } from "./tabs/SfhaBaselineTab";
import { ComplianceTab } from "./tabs/ComplianceTab";

export function OccurrenceWorkspace() {
  const { activeTab } = useOccurrence();

  return (
    <div className="grid grid-cols-[340px_1fr] flex-1 overflow-hidden">
      {/* INCIDENT LIST COLUMN */}
      <CaseQueue />

      {/* INCIDENT DETAIL WORKBENCH */}
      <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-5">
        {/* CASE HEADER */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 pb-0 shadow-xs">
          <CaseBanner />
          <WorkflowStepper />
          <WorkspaceTabs />
        </div>

        {/* CONTEXTUAL ACTION BAR BASED ON LOGGED-IN ROLE */}
        <ContextualActionPanel />

        {/* TAB CONTENTS */}
        {activeTab === "OVERVIEW" && <OverviewTab />}
        {activeTab === "OEM_SUPPORT" && <OemSupportTab />}
        {activeTab === "SFHA_BASELINE" && <SfhaBaselineTab />}
        {activeTab === "COMPLIANCE" && <ComplianceTab />}
      </div>
    </div>
  );
}
