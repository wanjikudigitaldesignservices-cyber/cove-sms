import { DollarSign, TrendingUp, AlertTriangle, Download, Send } from 'lucide-react';

const feeRecords = [
  { student: 'Amara Odhiambo', year: 'Year 12', total: 185000, paid: 185000, balance: 0, status: 'Paid', lastPayment: '2026-08-15' },
  { student: 'Brian Kimani', year: 'Year 11', total: 165000, paid: 120000, balance: 45000, status: 'Partial', lastPayment: '2026-07-20' },
  { student: 'Cynthia Wambui', year: 'Year 10', total: 165000, paid: 165000, balance: 0, status: 'Paid', lastPayment: '2026-08-01' },
  { student: 'David Mwangi', year: 'Year 9', total: 145000, paid: 60000, balance: 85000, status: 'Overdue', lastPayment: '2026-05-10' },
  { student: 'Esther Njoki', year: 'Year 12', total: 185000, paid: 185000, balance: 0, status: 'Paid', lastPayment: '2026-08-20' },
  { student: 'Felix Otieno', year: 'Year 11', total: 165000, paid: 0, balance: 165000, status: 'Overdue', lastPayment: '—' },
  { student: 'Grace Achieng', year: 'Year 8', total: 145000, paid: 145000, balance: 0, status: 'Paid', lastPayment: '2026-08-12' },
  { student: 'Hassan Omar', year: 'Year 13', total: 195000, paid: 195000, balance: 0, status: 'Paid', lastPayment: '2026-08-05' },
];

const feeStatusColors: Record<string, string> = { Paid: 'bg-emerald-100 text-emerald-700', Partial: 'bg-amber-100 text-amber-700', Overdue: 'bg-rose-100 text-rose-700' };

export default function Fees() {
  const totalExpected = 18200000;
  const totalCollected = 14200000;
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fees & Billing</h1>
          <p className="text-slate-500 text-sm mt-1">Track fee payments, balances, and generate invoices</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/30">
            <Send className="w-4 h-4" /> Send Reminders
          </button>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">KES 18.2M</p>
          <p className="text-blue-200 text-sm mt-0.5">Total Expected (Term 3)</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">KES 14.2M</p>
          <p className="text-emerald-200 text-sm mt-0.5">Total Collected</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">KES 4.0M</p>
          <p className="text-amber-100 text-sm mt-0.5">Outstanding Balance</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-sm text-slate-500 mb-2">Collection Rate</p>
          <p className="text-3xl font-bold text-slate-900">{collectionRate}%</p>
          <div className="progress-bar mt-3">
            <div className="progress-bar-fill bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${collectionRate}%` }} />
          </div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Year</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Total Fee</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Paid</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Balance</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((r, i) => (
                <tr key={i} className="border-b border-slate-50 table-row-hover">
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{r.student}</td>
                  <td className="py-3 px-4 text-sm text-slate-500 hidden md:table-cell">{r.year}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-right font-mono">KES {r.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-emerald-600 text-right font-mono hidden sm:table-cell">KES {r.paid.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right font-mono hidden lg:table-cell">
                    <span className={r.balance > 0 ? 'text-rose-600 font-semibold' : 'text-slate-400'}>
                      KES {r.balance.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`badge ${feeStatusColors[r.status]}`}>{r.status}</span>
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
