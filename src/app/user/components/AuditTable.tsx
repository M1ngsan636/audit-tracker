// components/AuditTable.tsx
"use client";
import AuditTable from "@/components/tables/AuditTable";

interface AuditItem {
  id: string;
  project: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  assignedTo: string;
  lastUpdated: string;
}

export default function AuditTable({ audits, title }: { audits: AuditItem[], title: string }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
        {title}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Project</th>
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Due Date</th>
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Assigned To</th>
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Last Updated</th>
              <th className="px-4 py-3 text-left text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {audits.map((audit) => (
              <tr key={audit.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 text-white">{audit.project}</td>
                <td className="px-4 py-3 text-gray-300">{new Date(audit.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    audit.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    audit.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {audit.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">{audit.assignedTo}</td>
                <td className="px-4 py-3 text-gray-300">{new Date(audit.lastUpdated).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button className="text-cyan-400 hover:text-cyan-300 mr-3">
                    View
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          Showing {audits.length} of {audits.length} audits
        </div>
        <button className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-900 transition-colors">
          Export Report
        </button>
      </div>
    </div>
  );
}