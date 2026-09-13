import {
  Users, GraduationCap, BookOpen, DollarSign, TrendingUp, TrendingDown,
  ArrowUpRight, Clock, UserPlus, AlertCircle, CheckCircle2, Calendar
} from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '1,247', change: '+12%', trend: 'up', icon: Users, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
  { label: 'Teaching Staff', value: '86', change: '+3', trend: 'up', icon: GraduationCap, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  { label: 'Active Classes', value: '42', change: 'All active', trend: 'up', icon: BookOpen, color: 'violet', bg: 'bg-violet-50', text: 'text-violet-600', iconBg: 'bg-violet-100' },
  { label: 'Fee Collection', value: 'KES 14.2M', change: '78% collected', trend: 'up', icon: DollarSign, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100' },
];

const recentActivities = [
  { icon: UserPlus, text: 'New student Amara Odhiambo enrolled in Year 9', time: '5 min ago', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: CheckCircle2, text: 'Term 3 timetable published for all years', time: '1 hour ago', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: DollarSign, text: 'Fee payment of KES 85,000 received — Njeru Family', time: '2 hours ago', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: AlertCircle, text: '3 students flagged for low attendance in Year 11', time: '3 hours ago', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: BookOpen, text: 'IGCSE Mock Exam results uploaded — Chemistry', time: '4 hours ago', color: 'text-violet-500', bg: 'bg-violet-50' },
  { icon: Calendar, text: 'Parent-Teacher Conference scheduled for Sept 20', time: 'Yesterday', color: 'text-blue-500', bg: 'bg-blue-50' },
];

const upcomingEvents = [
  { date: '15', month: 'Sep', title: 'IGCSE Mock Examinations Begin', type: 'Exam', typeColor: 'bg-rose-100 text-rose-700' },
  { date: '20', month: 'Sep', title: 'Parent-Teacher Conference', type: 'Meeting', typeColor: 'bg-blue-100 text-blue-700' },
  { date: '25', month: 'Sep', title: 'Science Fair — Year 7-9', type: 'Event', typeColor: 'bg-emerald-100 text-emerald-700' },
  { date: '01', month: 'Oct', title: 'Term 3 Fees Deadline', type: 'Finance', typeColor: 'bg-amber-100 text-amber-700' },
];

const attendanceData = [
  { day: 'Mon', present: 94, absent: 6 },
  { day: 'Tue', present: 91, absent: 9 },
  { day: 'Wed', present: 96, absent: 4 },
  { day: 'Thu', present: 89, absent: 11 },
  { day: 'Fri', present: 93, absent: 7 },
];

const topClasses = [
  { name: 'Year 12 A-Level', avgGrade: 'A*', attendance: 97, students: 28 },
  { name: 'Year 11 IGCSE', avgGrade: 'A', attendance: 94, students: 32 },
  { name: 'Year 10', avgGrade: 'B+', attendance: 92, students: 35 },
  { name: 'Year 9', avgGrade: 'B', attendance: 90, students: 33 },
  { name: 'Year 8', avgGrade: 'B+', attendance: 95, students: 30 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back! Here's an overview of Cove High School.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card bg-white rounded-xl border border-slate-100 p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.iconBg} ${stat.text} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Weekly Attendance</h3>
              <p className="text-sm text-slate-500 mt-0.5">This week's attendance rate</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-500" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-300" /> Absent
              </span>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-3 h-48">
            {attendanceData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-700">{d.present}%</span>
                <div className="w-full rounded-t-lg flex flex-col gap-0.5" style={{ height: '100%' }}>
                  <div
                    className="bg-blue-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${d.present}%`, minHeight: '8px' }}
                  />
                  <div
                    className="bg-rose-300 rounded-b-lg transition-all duration-500"
                    style={{ height: `${d.absent}%`, minHeight: '4px' }}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-900">Upcoming Events</h3>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-slate-900 leading-none">{event.date}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{event.month}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{event.title}</p>
                  <span className={`badge mt-1 ${event.typeColor}`}>{event.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${activity.bg} ${activity.color} flex items-center justify-center shrink-0`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{activity.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Classes */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-900">Top Performing Classes</h3>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              Details <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {topClasses.map((cls, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900">{cls.name}</p>
                    <span className="text-xs font-semibold text-emerald-600">Grade {cls.avgGrade}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill bg-gradient-to-r from-blue-500 to-blue-400"
                      style={{ width: `${cls.attendance}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-slate-400">{cls.students} students</span>
                    <span className="text-[11px] text-slate-400">{cls.attendance}% attendance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
