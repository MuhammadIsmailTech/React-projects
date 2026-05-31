import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CoinDetail from './pages/CoinDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const { theme } = useAppContext();
  const location = useLocation();
  const hideAppShell = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className={`${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'} min-h-screen transition-colors duration-500`}>
      <div className="flex min-h-screen">
        {!hideAppShell && <Sidebar />}
        <main className="flex-1">
          {!hideAppShell && <Topbar />}
          <div className="px-4 py-4 lg:px-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coin/:id" element={<CoinDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
