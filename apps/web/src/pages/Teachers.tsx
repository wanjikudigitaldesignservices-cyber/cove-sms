import { Plus, Mail, Phone } from 'lucide-react';

const teachers = [
  { name: 'Mr. James Otieno', subject: 'Mathematics', qualification: 'M.Ed, Cambridge Cert.', classes: 'Year 11, 12', email: 'j.otieno@cove.ac.ke', phone: '+254 712 345 678', status: 'Active', avatar: 'JO', color: 'from-blue-500 to-indigo-600' },
  { name: 'Ms. Faith Wanjiru', subject: 'English Literature', qualification: 'B.A. English, PGDE', classes: 'Year 9, 10, 11', email: 'f.wanjiru@cove.ac.ke', phone: '+254 723 456 789', status: 'Active', avatar: 'FW', color: 'from-pink-500 to-rose-600' },
  { name: 'Dr. Peter Ngugi', subject: 'Physics', qualification: 'Ph.D. Physics, Cambridge', classes: 'Year 12, 13', email: 'p.ngugi@cove.ac.ke', phone: '+254 734 567 890', status: 'Active', avatar: 'PN', color: 'from-emerald-500 to-teal-600' },
  { name: 'Mrs. Sarah Akinyi', subject: 'Chemistry', qualification: 'M.Sc Chemistry', classes: 'Year 10, 11', email: 's.akinyi@cove.ac.ke', phone: '+254 745 678 901', status: 'Active', avatar: 'SA', color: 'from-amber-500 to-orange-600' },
  { name: 'Mr. Daniel Kiprop', subject: 'Biology', qualification: 'B.Sc Biology, PGDE', classes: 'Year 9, 10', email: 'd.kiprop@cove.ac.ke', phone: '+254 756 789 012', status: 'On Leave', avatar: 'DK', color: 'from-violet-500 to-purple-600' },
  { name: 'Ms. Linda Mumbi', subject: 'History & Geography', qualification: 'B.A. Arts, M.Ed', classes: 'Year 7, 8, 9', email: 'l.mumbi@cove.ac.ke', phone: '+254 767 890 123', status: 'Active', avatar: 'LM', color: 'from-cyan-500 to-blue-600' },
];

export default function Teachers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teachers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage teaching staff and their assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/30">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">86</p>
          <p className="text-xs text-slate-500 mt-1">Total Staff</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">82</p>
          <p className="text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">3</p>
          <p className="text-xs text-slate-500 mt-1">On Leave</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">15:1</p>
          <p className="text-xs text-slate-500 mt-1">Student-Teacher Ratio</p>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teachers.map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 card-hover">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {t.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm">{t.name}</h3>
                  <span className={`badge text-[11px] ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-blue-600 text-sm font-medium mt-0.5">{t.subject}</p>
                <p className="text-slate-400 text-xs mt-0.5">{t.qualification}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <p className="text-xs text-slate-500">Classes: <span className="font-medium text-slate-700">{t.classes}</span></p>
              <div className="flex items-center gap-3">
                <a href={`mailto:${t.email}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> {t.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5" /> {t.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
