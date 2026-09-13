import { FileBarChart, Download, Printer } from 'lucide-react';

const reports = [
  { name: 'Term 3 Progress Report', type: 'Academic', status: 'Ready', date: 'Sep 10, 2026', records: 1247 },
  { name: 'Fee Collection Summary', type: 'Finance', status: 'Ready', date: 'Sep 9, 2026', records: 1247 },
  { name: 'Attendance Report — Week 10', type: 'Attendance', status: 'Ready', date: 'Sep 8, 2026', records: 1247 },
  { name: 'IGCSE Mock Exam Analysis', type: 'Academic', status: 'Processing', date: 'Sep 7, 2026', records: 320 },
  { name: 'Teacher Workload Summary', type: 'HR', status: 'Ready', date: 'Sep 5, 2026', records: 86 },
  { name: 'Outstanding Fees by Year Group', type: 'Finance', status: 'Ready', date: 'Sep 3, 2026', records: 312 },
];

const typeColors: Record<string,string> = { Academic: 'bg-blue-100 text-blue-700', Finance: 'bg-amber-100 text-amber-700', Attendance: 'bg-emerald-100 text-emerald-700', HR: 'bg-violet-100 text-violet-700' };

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-500 text-sm mt-1">Generate and download school reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 card-hover">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <FileBarChart className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-slate-900">{r.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge ${typeColors[r.type]}`}>{r.type}</span>
                  <span className={`badge ${r.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{r.date} • {r.records} records</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
