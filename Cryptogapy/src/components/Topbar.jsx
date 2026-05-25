import { Bell, Search, Moon, Sun, UserCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';

function Topbar() {
  const { toggleTheme, theme, dummyData } = useAppContext();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          <button className="rounded-3xl border border-slate-700/80 bg-slate-900/80 px-3 py-3 text-slate-200 transition hover:border-brand hover:text-white">
            <Search size={18} />
          </button>
          <div className="relative flex-1">
            <input
              className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-brand"
              placeholder="Search coins, pairs, news..."
              aria-label="Search"
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-3 text-slate-200 transition hover:border-brand hover:text-white">
            <Bell size={18} />
          </button>
          <ToggleSwitch isOn={theme === 'dark'} labelOn={<Moon size={16} />} labelOff={<Sun size={16} />} onToggle={toggleTheme} />
          <button className="flex items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-slate-200 transition hover:border-brand hover:text-white">
            <UserCircle2 size={20} />
            <span className="hidden sm:inline-block">{dummyData.user.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
