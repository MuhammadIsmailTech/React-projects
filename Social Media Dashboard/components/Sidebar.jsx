import { motion } from 'framer-motion'
import { FaHome, FaChartLine, FaCalendarAlt, FaUsers, FaBell } from 'react-icons/fa'

const links = [
  { name: 'Overview', icon: FaHome },
  { name: 'Analytics', icon: FaChartLine },
  { name: 'Content', icon: FaCalendarAlt },
  { name: 'Audience', icon: FaUsers },
  { name: 'Alerts', icon: FaBell }
]

export default function Sidebar(){
  return (
    <aside className="w-72 min-h-screen p-4 glass border-r border-slate-800">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon to-cyan flex items-center justify-center shadow-glow">SM</div>
        <div>
          <h3 className="text-lg font-semibold">SocialPulse</h3>
          <p className="text-xs text-slate-400">Real-time analytics</p>
        </div>
      </div>

      <nav className="mt-6">
        {links.map((l)=>{
          const Icon = l.icon
          return (
            <motion.div key={l.name} whileHover={{ x: 6 }} className="flex items-center gap-3 p-3 rounded-md text-slate-200 hover:bg-slate-800/40 cursor-pointer">
              <Icon />
              <span>{l.name}</span>
            </motion.div>
          )
        })}
      </nav>

      <div className="mt-auto p-4 text-xs text-slate-400">
        <div className="mb-2">Theme</div>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-700/30 rounded w-8 h-8" aria-label="dark">■</button>
          <button className="p-2 bg-gradient-to-br from-neon to-pink rounded w-8 h-8 shadow-glow" aria-label="neon"></button>
        </div>
      </div>
    </aside>
  )
}
