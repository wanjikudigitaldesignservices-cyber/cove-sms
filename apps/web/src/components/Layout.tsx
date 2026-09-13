import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList,
  DollarSign, Calendar, Bell, FileBarChart, Settings, LogOut,
  Search, ChevronDown, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/teachers', icon: GraduationCap, label: 'Teachers' },
  { to: '/academics', icon: BookOpen, label: 'Academics' },
  { to: '/assessments', icon: ClipboardList, label: 'Assessments' },
  { to: '/fees', icon: DollarSign, label: 'Fees & Billing' },
  { to: '/timetable', icon: Calendar, label: 'Timetable' },
  { to: '/communications', icon: Bell, label: 'Communications' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, user, signOut } = useAuth();
  
  const userName = user?.email || 'User';
  const displayRole = role || 'USER';

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[260px] bg-[#0f172a] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* School Logo / Brand */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
              C
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Cove High School</h1>
              <p className="text-[11px] text-slate-400 leading-tight">Lavington • Cambridge Curriculum</p>
            </div>
          </div>
          <button className="lg:hidden absolute top-5 right-4 text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 mb-2">Main Menu</p>
          {navItems.slice(0, 4).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                ${isActive
                  ? 'bg-blue-600/20 text-blue-400 border-l-[3px] border-blue-400 -ml-[3px] pl-[15px]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </NavLink>
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 mt-6 mb-2">Management</p>
          {navItems.slice(4, 8).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                ${isActive
                  ? 'bg-blue-600/20 text-blue-400 border-l-[3px] border-blue-400 -ml-[3px] pl-[15px]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </NavLink>
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 mt-6 mb-2">System</p>
          {navItems.slice(8).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                ${isActive
                  ? 'bg-blue-600/20 text-blue-400 border-l-[3px] border-blue-400 -ml-[3px] pl-[15px]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile (bottom) */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-[11px] text-slate-400">{displayRole.charAt(0) + displayRole.slice(1).toLowerCase()}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-600 hover:text-slate-900 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search students, teachers, classes..."
                className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Term indicator */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot" />
              Term 3 • 2026
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* User dropdown */}
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
