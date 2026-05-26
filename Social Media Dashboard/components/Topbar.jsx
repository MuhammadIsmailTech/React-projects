import { motion } from 'framer-motion'
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa'

export default function Topbar(){
  return (
    <div className="flex items-center justify-between glass p-3 rounded-md">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-800/40 rounded-md flex items-center gap-3">
          <FaSearch className="text-slate-300" />
          <input placeholder="Search profiles, posts, campaigns..." className="bg-transparent outline-none text-sm text-slate-200" />
        </div>
        <div className="ml-4 text-xs text-slate-400">Live <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-400 shadow-glow"></span></div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.04 }} className="p-2 glass rounded">
          <FaBell />
        </motion.button>
        <div className="flex items-center gap-2">
          <img src="/avatar.png" alt="user" className="w-9 h-9 rounded-full border border-slate-700" />
          <div className="text-right">
            <div className="text-sm">Alex Morgan</div>
            <div className="text-xs text-slate-400">Admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}
