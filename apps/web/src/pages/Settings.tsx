import { Building, Shield, Bell, CreditCard, Users, Globe, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage system preferences and school configurations</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            <Building className="w-4 h-4" /> School Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Shield className="w-4 h-4" /> Security & Roles
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <CreditCard className="w-4 h-4" /> Billing & Fees
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Users className="w-4 h-4" /> User Management
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Globe className="w-4 h-4" /> System Preferences
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {/* School Details Panel */}
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">School Details</h2>
              <p className="text-xs text-slate-500 mt-1">Update your school's primary information and branding</p>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                  C
                </div>
                <div>
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Upload Logo
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">School Name</label>
                  <input type="text" defaultValue="Cove High School" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Registration Number</label>
                  <input type="text" defaultValue="MOE/SEC/892/26" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Address</label>
                  <input type="text" defaultValue="Lavington, Nairobi, Kenya" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Primary Email</label>
                  <input type="email" defaultValue="admin@cove.ac.ke" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <input type="tel" defaultValue="+254 20 123 4567" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/30">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {/* Academic Settings Panel */}
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 p-5 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-slate-900">Academic Year & Curriculum</h2>
                <p className="text-xs text-slate-500 mt-1">Configure active term and system curriculum settings</p>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Edit</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Current Academic Year</p>
                  <p className="font-semibold text-slate-900">2026 / 2027</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Current Term</p>
                  <p className="font-semibold text-slate-900">Term 3</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Curriculum System</p>
                  <p className="font-semibold text-slate-900">Cambridge (IGCSE/A-Level)</p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-600 mb-1">System Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="font-semibold text-emerald-700">Active & Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
