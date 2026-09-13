import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, Users, FileText, Calendar, DollarSign, Bell } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('ADMIN');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Cove High School</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Mock Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="ADMIN">Admin</option>
              <option value="TEACHER">Teacher</option>
              <option value="PARENT">Parent</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r p-4 flex flex-col gap-2">
        <div className="font-bold text-xl mb-4 text-blue-600">Cove SMS</div>
        
        {role === 'ADMIN' && (
          <>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Users /> Users & Invites</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><BookOpen /> Classes</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><FileText /> Reports</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><DollarSign /> Fees</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Bell /> Comms</div>
          </>
        )}
        
        {role === 'TEACHER' && (
          <>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Calendar /> Timetable</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Users /> Attendance</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><FileText /> Grading</div>
          </>
        )}

        {role === 'PARENT' && (
          <>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Users /> My Children</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><FileText /> Reports</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><DollarSign /> Invoices</div>
          </>
        )}

        {role === 'STUDENT' && (
          <>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><Calendar /> My Timetable</div>
            <div className="p-2 hover:bg-gray-100 rounded flex gap-2 cursor-pointer"><FileText /> My Grades</div>
          </>
        )}

        <div className="mt-auto pt-4 border-t">
          <button onClick={logout} className="w-full p-2 text-left text-red-600 hover:bg-red-50 rounded">
            Logout ({role})
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

const DashboardRouter = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (!savedRole) {
      navigate('/login');
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  if (!role) return null;

  return (
    <DashboardLayout role={role}>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Welcome, {role}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded p-4 h-32 flex flex-col justify-center items-center bg-gray-50">
            <span className="text-gray-500">Widget 1</span>
          </div>
          <div className="border rounded p-4 h-32 flex flex-col justify-center items-center bg-gray-50">
            <span className="text-gray-500">Widget 2</span>
          </div>
          <div className="border rounded p-4 h-32 flex flex-col justify-center items-center bg-gray-50">
            <span className="text-gray-500">Widget 3</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} />
    </Routes>
  );
}

export default App;
