// src/app/user/completed/page.tsx
"use client";

import AuditTable from "@/components/AuditTable";
import { FloatingOrbs, GridOverlay, Header } from "@/components/Layout";

const completedAudits = [
  {
    id: "1",
    project: "Project Phoenix",
    dueDate: "2023-11-10",
    status: "completed",
    assignedTo: "Alex Johnson",
    lastUpdated: "2023-11-08T14:30:00Z"
  },
  // Add more completed audits...
];

export default function CompletedPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <FloatingOrbs />
      <GridOverlay />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header title="COMPLETED AUDITS" />
        
        <div className="mt-8">
          <AuditTable 
            audits={completedAudits} 
            title="COMPLETED AUDITS" 
          />
        </div>
      </div>
    </div>
  );
}