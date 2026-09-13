import { BookOpen, Users, Clock } from 'lucide-react';

const subjects = [
  { name: 'Mathematics', code: 'MATH', teacher: 'Mr. James Otieno', years: 'Y10–Y13', students: 186, type: 'IGCSE & A-Level', color: 'from-blue-500 to-indigo-600' },
  { name: 'English Language', code: 'ENG', teacher: 'Ms. Faith Wanjiru', years: 'Y7–Y13', students: 312, type: 'IGCSE & A-Level', color: 'from-emerald-500 to-teal-600' },
  { name: 'Physics', code: 'PHY', teacher: 'Dr. Peter Ngugi', years: 'Y10–Y13', students: 124, type: 'IGCSE & A-Level', color: 'from-violet-500 to-purple-600' },
  { name: 'Chemistry', code: 'CHEM', teacher: 'Mrs. Sarah Akinyi', years: 'Y10–Y13', students: 142, type: 'IGCSE & A-Level', color: 'from-amber-500 to-orange-600' },
  { name: 'Biology', code: 'BIO', teacher: 'Mr. Daniel Kiprop', years: 'Y10–Y13', students: 156, type: 'IGCSE & A-Level', color: 'from-rose-500 to-pink-600' },
  { name: 'History', code: 'HIST', teacher: 'Ms. Linda Mumbi', years: 'Y7–Y11', students: 198, type: 'IGCSE', color: 'from-cyan-500 to-blue-600' },
  { name: 'Geography', code: 'GEO', teacher: 'Ms. Linda Mumbi', years: 'Y7–Y11', students: 176, type: 'IGCSE', color: 'from-teal-500 to-emerald-600' },
  { name: 'Computer Science', code: 'CS', teacher: 'Mr. Kevin Mutua', years: 'Y9–Y13', students: 98, type: 'IGCSE & A-Level', color: 'from-slate-600 to-slate-800' },
];

const classes = [
  { name: 'Year 7A', students: 30, classTeacher: 'Ms. Linda Mumbi', room: 'Block A, Room 101' },
  { name: 'Year 7B', students: 28, classTeacher: 'Mr. Tom Okello', room: 'Block A, Room 102' },
  { name: 'Year 8A', students: 32, classTeacher: 'Mrs. Jane Ndung\'u', room: 'Block A, Room 201' },
  { name: 'Year 9A', students: 33, classTeacher: 'Mr. Paul Wekesa', room: 'Block B, Room 101' },
  { name: 'Year 10A', students: 35, classTeacher: 'Mrs. Sarah Akinyi', room: 'Block B, Room 201' },
  { name: 'Year 11 IGCSE', students: 32, classTeacher: 'Mr. James Otieno', room: 'Block C, Room 101' },
  { name: 'Year 12 A-Level Sci', students: 28, classTeacher: 'Dr. Peter Ngugi', room: 'Block C, Room 201' },
  { name: 'Year 12 A-Level Arts', students: 24, classTeacher: 'Ms. Faith Wanjiru', room: 'Block C, Room 202' },
  { name: 'Year 13 A-Level', students: 22, classTeacher: 'Dr. Peter Ngugi', room: 'Block C, Room 301' },
];

export default function Academics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academics</h1>
        <p className="text-slate-500 text-sm mt-1">Manage subjects, classes, and curriculum structure</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">24</p>
          <p className="text-xs text-slate-500 mt-1">Subjects Offered</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">42</p>
          <p className="text-xs text-slate-500 mt-1">Active Classes</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-violet-600">7</p>
          <p className="text-xs text-slate-500 mt-1">Year Groups</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">18</p>
          <p className="text-xs text-slate-500 mt-1">A-Level Subjects</p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 card-hover cursor-pointer">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-sm mb-3`}>
                {s.code.slice(0, 2)}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{s.teacher}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Users className="w-3 h-3" /> {s.students}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" /> {s.years}
                </span>
              </div>
              <span className="badge bg-blue-50 text-blue-700 mt-2">{s.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Classes Table */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Classes</h2>
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Class</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Class Teacher</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Room</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Students</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, i) => (
                <tr key={i} className="border-b border-slate-50 table-row-hover cursor-pointer">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-900">{cls.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{cls.classTeacher}</td>
                  <td className="py-3 px-4 text-sm text-slate-500 hidden md:table-cell">{cls.room}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm font-semibold text-slate-700">{cls.students}</span>
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
