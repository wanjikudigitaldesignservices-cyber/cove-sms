import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';

const students = [
  { id: 'STU-001', name: 'Amara Odhiambo', year: 'Year 12', stream: 'A-Level Sciences', gender: 'F', status: 'Active', fee: 'Paid', avatar: 'AO' },
  { id: 'STU-002', name: 'Brian Kimani', year: 'Year 11', stream: 'IGCSE', gender: 'M', status: 'Active', fee: 'Partial', avatar: 'BK' },
  { id: 'STU-003', name: 'Cynthia Wambui', year: 'Year 10', stream: 'IGCSE', gender: 'F', status: 'Active', fee: 'Paid', avatar: 'CW' },
  { id: 'STU-004', name: 'David Mwangi', year: 'Year 9', stream: 'Lower Secondary', gender: 'M', status: 'Active', fee: 'Overdue', avatar: 'DM' },
  { id: 'STU-005', name: 'Esther Njoki', year: 'Year 12', stream: 'A-Level Arts', gender: 'F', status: 'Active', fee: 'Paid', avatar: 'EN' },
  { id: 'STU-006', name: 'Felix Otieno', year: 'Year 11', stream: 'IGCSE', gender: 'M', status: 'Suspended', fee: 'Overdue', avatar: 'FO' },
  { id: 'STU-007', name: 'Grace Achieng', year: 'Year 8', stream: 'Lower Secondary', gender: 'F', status: 'Active', fee: 'Paid', avatar: 'GA' },
  { id: 'STU-008', name: 'Hassan Omar', year: 'Year 13', stream: 'A-Level Sciences', gender: 'M', status: 'Active', fee: 'Paid', avatar: 'HO' },
  { id: 'STU-009', name: 'Ivy Chebet', year: 'Year 10', stream: 'IGCSE', gender: 'F', status: 'Active', fee: 'Partial', avatar: 'IC' },
  { id: 'STU-010', name: 'James Karanja', year: 'Year 7', stream: 'Lower Secondary', gender: 'M', status: 'Active', fee: 'Paid', avatar: 'JK' },
];

const feeColors: Record<string, string> = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Partial: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-rose-100 text-rose-700',
};

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Suspended: 'bg-rose-100 text-rose-700',
  Graduated: 'bg-blue-100 text-blue-700',
};

export default function Students() {
  const [search, setSearch] = useState('');
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.year.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-1">Manage student records, enrollment, and profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID, or year..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Years</option>
              <option>Year 7</option><option>Year 8</option><option>Year 9</option><option>Year 10</option>
              <option>Year 11 (IGCSE)</option><option>Year 12 (A-Level)</option><option>Year 13 (A-Level)</option>
            </select>
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Status</option><option>Active</option><option>Suspended</option><option>Graduated</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100">
              <Filter className="w-4 h-4" /> More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">1,247</p>
          <p className="text-xs text-slate-500 mt-1">Total Enrolled</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">1,198</p>
          <p className="text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">34</p>
          <p className="text-xs text-slate-500 mt-1">New This Term</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-rose-600">15</p>
          <p className="text-xs text-slate-500 mt-1">Suspended</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Year</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Stream</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Fees</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="border-b border-slate-50 table-row-hover">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        student.gender === 'F' ? 'bg-gradient-to-br from-pink-400 to-rose-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'
                      }`}>
                        {student.avatar}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500 font-mono">{student.id}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 hidden md:table-cell">{student.year}</td>
                  <td className="py-3 px-4 text-sm text-slate-500 hidden lg:table-cell">{student.stream}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${statusColors[student.status]}`}>{student.status}</span>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`badge ${feeColors[student.fee]}`}>{student.fee}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/30">
          <p className="text-sm text-slate-500">Showing <span className="font-medium">1–10</span> of <span className="font-medium">1,247</span> students</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 text-sm">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 text-sm">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 text-sm">125</button>
            <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
