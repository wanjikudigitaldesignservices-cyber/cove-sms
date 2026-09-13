import { ClipboardList, Download } from 'lucide-react';

const examResults = [
  { student: 'Amara Odhiambo', year: 'Y12', math: 'A*', physics: 'A', chemistry: 'A', biology: '—', english: 'A', avg: 'A*' },
  { student: 'Hassan Omar', year: 'Y13', math: 'A', physics: 'A*', chemistry: 'A', biology: 'A', english: 'B', avg: 'A' },
  { student: 'Brian Kimani', year: 'Y11', math: 'B', physics: 'B', chemistry: 'C', biology: 'B', english: 'A', avg: 'B' },
  { student: 'Cynthia Wambui', year: 'Y10', math: 'A', physics: 'B', chemistry: 'A', biology: 'A', english: 'A', avg: 'A' },
  { student: 'David Mwangi', year: 'Y9', math: 'C', physics: 'C', chemistry: 'D', biology: 'C', english: 'B', avg: 'C' },
  { student: 'Esther Njoki', year: 'Y12', math: 'B', physics: '—', chemistry: '—', biology: '—', english: 'A*', avg: 'A' },
  { student: 'Grace Achieng', year: 'Y8', math: 'A', physics: 'A', chemistry: 'B', biology: 'A', english: 'A', avg: 'A' },
  { student: 'Ivy Chebet', year: 'Y10', math: 'B', physics: 'C', chemistry: 'B', biology: 'B', english: 'B', avg: 'B' },
];

const gradeColors: Record<string, string> = {
  'A*': 'bg-emerald-100 text-emerald-800 font-bold', A: 'bg-emerald-50 text-emerald-700', B: 'bg-blue-50 text-blue-700',
  C: 'bg-amber-50 text-amber-700', D: 'bg-orange-50 text-orange-700', E: 'bg-rose-50 text-rose-700', '—': 'bg-slate-50 text-slate-400',
};

export default function Assessments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assessments</h1>
          <p className="text-slate-500 text-sm mt-1">Exam results, grade tracking, and academic performance</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
            <option>Term 3 Mock Exams</option><option>Mid-Term Exams</option><option>End of Term 2</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">B+</p>
          <p className="text-xs text-slate-500 mt-1">School Average</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">67%</p>
          <p className="text-xs text-slate-500 mt-1">Pass Rate (A*–C)</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-xs text-slate-500 mt-1">A* Grades</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-violet-600">1,180</p>
          <p className="text-xs text-slate-500 mt-1">Exams Graded</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Year</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Math</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Physics</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Chemistry</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Biology</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">English</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Avg</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((r, i) => (
                <tr key={i} className="border-b border-slate-50 table-row-hover">
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{r.student}</td>
                  <td className="py-3 px-3 text-center text-sm text-slate-500">{r.year}</td>
                  {[r.math, r.physics, r.chemistry, r.biology, r.english].map((grade, gi) => (
                    <td key={gi} className={`py-3 px-3 text-center ${gi >= 2 && gi <= 3 ? 'hidden md:table-cell' : gi === 4 ? 'hidden sm:table-cell' : ''}`}>
                      <span className={`inline-flex items-center justify-center w-8 h-6 rounded text-xs ${gradeColors[grade] || 'bg-slate-50 text-slate-400'}`}>
                        {grade}
                      </span>
                    </td>
                  ))}
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-6 rounded text-xs font-bold ${gradeColors[r.avg] || ''}`}>
                      {r.avg}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
