import type { Persona } from "../types";

export const PERSONAS: Persona[] = [
  {
    role: "OPERATOR_OPS",
    orgName: "Alpha Air",
    department: "Flight Operations & MCC",
    userTitle: "Capt. M. Dvořák (Fleet Ops)",
    themeColor: "#0ea5e9",
  },
  {
    role: "OPERATOR_CAMO",
    orgName: "Alpha Air",
    department: "Continuing Airworthiness (CAMO)",
    userTitle: "Ing. P. Svoboda (CAMO Lead)",
    themeColor: "#2563eb",
  },
  {
    role: "OPERATOR_SAFETY",
    orgName: "Alpha Air",
    department: "Safety Management System (SMS)",
    userTitle: "Ing. L. Černá (Safety Manager)",
    themeColor: "#f59e0b",
  },
  {
    role: "OEM_CS",
    orgName: "Airframe OEM",
    department: "Customer Support & TechRequest",
    userTitle: "M. Laurent (OEM Support Desk)",
    themeColor: "#10b981",
  },
  {
    role: "OEM_DO",
    orgName: "Airframe OEM",
    department: "Design Organisation (ATA 27)",
    userTitle: "Ing. J. Novák (Chief Engineer)",
    themeColor: "#059669",
  },
  {
    role: "REGULATOR_CAA",
    orgName: "Czech CAA",
    department: "State Safety Oversight & ECCAIRS",
    userTitle: "Inspector R. Kučera (CAA)",
    themeColor: "#e11d48",
  },
  {
    role: "EXTERNAL_OPERATOR",
    orgName: "Beta Airlines",
    department: "Partner Fleet Operator (A320 Family)",
    userTitle: "H. Weber (Fleet Reliability)",
    themeColor: "#7c3aed",
  },
];
