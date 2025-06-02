// app/user/overdue/page.tsx
"use client";

import AuditTable from "@/components/AuditTable";
import { FloatingOrbs, GridOverlay, Header } from "@/components/Layout";

const overdueAudits = [
  {
    id: "1",
    project: "Project Hermes",
    dueDate: "2023-11-05",
    status: "overdue",
    assignedTo: "Taylor Smith",
    lastUpdated: "2023-11-06T11:45:00Z"
  },
  // Add more overdue audits...
];

export default function OverduePage() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <FloatingOrbs />
      <GridOverlay />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header title="OVERDUE AUDITS" />
        
        <div className="mt-8">
          <AuditTable 
            audits={overdueAudits} 
            title="OVERDUE AUDITS" 
          />
        </div>
      </div>
    </div>
  );
}