import { Bell, Send, Plus, Megaphone, Mail, MessageSquare, Clock } from 'lucide-react';

const announcements = [
  { title: 'IGCSE Mock Exams Schedule Released', body: 'The mock examination timetable for Year 11 students has been published. Examinations commence September 15th. Students should collect their exam cards from the registrar.', author: 'Dr. Wanjiku Mwangi', role: 'Principal', date: 'Sep 10, 2026', priority: 'high', type: 'Announcement' },
  { title: 'Parent-Teacher Conference — September 20', body: 'All parents are invited to attend the Term 3 parent-teacher conference. Individual slots can be booked through the parent portal. Light refreshments will be provided.', author: 'Ms. Faith Wanjiru', role: 'Deputy Head', date: 'Sep 8, 2026', priority: 'medium', type: 'Event' },
  { title: 'Science Fair Registration Open', body: 'Year 7–9 students are encouraged to register for the annual Science Fair. Projects must be submitted by September 22nd. Prizes for the top 3 entries in each category.', author: 'Dr. Peter Ngugi', role: 'HOD Sciences', date: 'Sep 5, 2026', priority: 'low', type: 'Activity' },
  { title: 'Fee Payment Deadline — October 1st', body: 'This is a reminder that all outstanding Term 3 fees must be cleared by October 1st. M-Pesa payments are accepted. Contact the bursar for payment plans.', author: 'Mrs. Njeri Kamau', role: 'Bursar', date: 'Sep 3, 2026', priority: 'high', type: 'Finance' },
  { title: 'Library New Books Collection', body: 'New Cambridge IGCSE and A-Level textbooks have arrived. Students can borrow up to 3 books at a time. Priority given to exam-year students.', author: 'Ms. Linda Mumbi', role: 'Librarian', date: 'Sep 1, 2026', priority: 'low', type: 'Notice' },
];

const priorityColors: Record<string, string> = { high: 'bg-rose-100 text-rose-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' };
const typeIcons: Record<string, typeof Bell> = { Announcement: Megaphone, Event: Bell, Activity: MessageSquare, Finance: Mail, Notice: Bell };

export default function Communications() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Communications</h1>
          <p className="text-slate-500 text-sm mt-1">Announcements, notices, and messaging</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Send className="w-4 h-4" /> Send SMS
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/30">
            <Plus className="w-4 h-4" /> New Announcement
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">24</p>
          <p className="text-xs text-slate-500 mt-1">This Term</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-rose-600">3</p>
          <p className="text-xs text-slate-500 mt-1">High Priority</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">1,180</p>
          <p className="text-xs text-slate-500 mt-1">SMS Sent</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">96%</p>
          <p className="text-xs text-slate-500 mt-1">Delivery Rate</p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((a, i) => {
          const Icon = typeIcons[a.type] || Bell;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 card-hover cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{a.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{a.body}</p>
                    </div>
                    <span className={`badge shrink-0 ${priorityColors[a.priority]}`}>{a.priority}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="font-medium text-slate-600">{a.author}</span>
                    <span>•</span>
                    <span>{a.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.date}</span>
                    <span className="badge bg-slate-100 text-slate-600">{a.type}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
