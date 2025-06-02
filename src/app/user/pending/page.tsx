// app/user/pending/page.tsx
"use client";

import AuditTable from "@/components/AuditTable";
import { FloatingOrbs, GridOverlay, Header } from "@/components/Layout";

const pendingAudits = [
  {
    id: "1",
    project: "Project Atlas",
    dueDate: "2023-11-20",
    status: "pending",
    assignedTo: "Suhardiman",
    lastUpdated: "2023-11-15T09:15:00Z"
  },
  // Add more pending audits...
];

export default function PendingPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <FloatingOrbs />
      <GridOverlay />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header title="PENDING AUDITS" />
        
        <div className="mt-8">
          <AuditTable 
            audits={pendingAudits} 
            title="PENDING AUDITS" 
          />
        </div>
      </div>
    </div>
  );
}