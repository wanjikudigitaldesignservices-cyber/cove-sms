const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { time: '8:00 – 8:40', label: 'Period 1' },
  { time: '8:40 – 9:20', label: 'Period 2' },
  { time: '9:20 – 9:40', label: 'Break' },
  { time: '9:40 – 10:20', label: 'Period 3' },
  { time: '10:20 – 11:00', label: 'Period 4' },
  { time: '11:00 – 11:40', label: 'Period 5' },
  { time: '11:40 – 12:00', label: 'Break' },
  { time: '12:00 – 12:40', label: 'Period 6' },
  { time: '12:40 – 1:20', label: 'Period 7' },
  { time: '1:20 – 2:00', label: 'Lunch' },
  { time: '2:00 – 2:40', label: 'Period 8' },
  { time: '2:40 – 3:20', label: 'Period 9' },
];

type Slot = { subject: string; teacher: string; room: string; color: string } | null;
const slotColors: Record<string, string> = {
  Math: 'bg-blue-50 border-blue-200 text-blue-800',
  English: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  Physics: 'bg-violet-50 border-violet-200 text-violet-800',
  Chemistry: 'bg-amber-50 border-amber-200 text-amber-800',
  Biology: 'bg-rose-50 border-rose-200 text-rose-800',
  History: 'bg-cyan-50 border-cyan-200 text-cyan-800',
  CS: 'bg-slate-100 border-slate-300 text-slate-800',
  PE: 'bg-orange-50 border-orange-200 text-orange-800',
};

const mk = (subject: string, teacher: string, room: string): Slot => ({ subject, teacher, room, color: slotColors[subject] || 'bg-slate-50 border-slate-200 text-slate-700' });
const brk: Slot = null;

const timetable: (Slot)[][] = [
  [mk('Math','Mr. Otieno','C101'), mk('English','Ms. Wanjiru','C102'), brk, mk('Physics','Dr. Ngugi','Lab 1'), mk('Chemistry','Mrs. Akinyi','Lab 2'), mk('Biology','Mr. Kiprop','Lab 3'), brk, mk('History','Ms. Mumbi','B201'), mk('CS','Mr. Mutua','IT Lab'), brk, mk('PE','Coach Ouma','Field'), mk('Math','Mr. Otieno','C101')],
  [mk('English','Ms. Wanjiru','C102'), mk('Physics','Dr. Ngugi','Lab 1'), brk, mk('Math','Mr. Otieno','C101'), mk('Biology','Mr. Kiprop','Lab 3'), mk('History','Ms. Mumbi','B201'), brk, mk('Chemistry','Mrs. Akinyi','Lab 2'), mk('English','Ms. Wanjiru','C102'), brk, mk('CS','Mr. Mutua','IT Lab'), mk('PE','Coach Ouma','Field')],
  [mk('Chemistry','Mrs. Akinyi','Lab 2'), mk('Math','Mr. Otieno','C101'), brk, mk('English','Ms. Wanjiru','C102'), mk('CS','Mr. Mutua','IT Lab'), mk('Physics','Dr. Ngugi','Lab 1'), brk, mk('Biology','Mr. Kiprop','Lab 3'), mk('History','Ms. Mumbi','B201'), brk, mk('Math','Mr. Otieno','C101'), mk('English','Ms. Wanjiru','C102')],
  [mk('Physics','Dr. Ngugi','Lab 1'), mk('Biology','Mr. Kiprop','Lab 3'), brk, mk('Chemistry','Mrs. Akinyi','Lab 2'), mk('English','Ms. Wanjiru','C102'), mk('Math','Mr. Otieno','C101'), brk, mk('CS','Mr. Mutua','IT Lab'), mk('PE','Coach Ouma','Field'), brk, mk('History','Ms. Mumbi','B201'), mk('Physics','Dr. Ngugi','Lab 1')],
  [mk('Biology','Mr. Kiprop','Lab 3'), mk('History','Ms. Mumbi','B201'), brk, mk('PE','Coach Ouma','Field'), mk('Math','Mr. Otieno','C101'), mk('English','Ms. Wanjiru','C102'), brk, mk('Physics','Dr. Ngugi','Lab 1'), mk('Chemistry','Mrs. Akinyi','Lab 2'), brk, mk('CS','Mr. Mutua','IT Lab'), mk('Math','Mr. Otieno','C101')],
];

export default function Timetable() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Timetable</h1>
          <p className="text-slate-500 text-sm mt-1">Year 11 IGCSE — Term 3, 2026</p>
        </div>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>Year 11 IGCSE</option>
          <option>Year 12 A-Level Sciences</option>
          <option>Year 12 A-Level Arts</option>
          <option>Year 10</option>
          <option>Year 9</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase w-[100px]">Time</th>
                {days.map(d => (
                  <th key={d} className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, pi) => (
                <tr key={pi} className={`border-b border-slate-50 ${period.label.includes('Break') || period.label === 'Lunch' ? 'bg-slate-50/70' : ''}`}>
                  <td className="py-2 px-3">
                    <p className="text-xs font-semibold text-slate-700">{period.label}</p>
                    <p className="text-[10px] text-slate-400">{period.time}</p>
                  </td>
                  {days.map((_, di) => {
                    const slot = timetable[di]?.[pi];
                    if (period.label.includes('Break') || period.label === 'Lunch') {
                      return (
                        <td key={di} className="py-2 px-2 text-center">
                          <span className="text-xs text-slate-400 italic">{period.label}</span>
                        </td>
                      );
                    }
                    return (
                      <td key={di} className="py-1.5 px-1.5">
                        {slot ? (
                          <div className={`rounded-lg border p-2 ${slot.color} cursor-pointer hover:shadow-sm transition-shadow`}>
                            <p className="text-xs font-semibold">{slot.subject}</p>
                            <p className="text-[10px] opacity-70">{slot.teacher}</p>
                            <p className="text-[10px] opacity-50">{slot.room}</p>
                          </div>
                        ) : (
                          <div className="rounded-lg bg-slate-50 p-2 text-center">
                            <p className="text-xs text-slate-300">—</p>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
