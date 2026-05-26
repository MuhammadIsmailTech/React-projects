import { useEffect, useState } from 'react'
import mockSocket from '../utils/mockSocket'

export default function LiveFeed(){
  const [feed, setFeed] = useState([])

  useEffect(()=>{
    const socket = mockSocket()
    socket.onmessage = (ev)=>{
      setFeed((f)=>[ev, ...f].slice(0,12))
    }
    return ()=>socket.close()
  },[])

  return (
    <section className="glass p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Live Activity</h4>
        <div className="text-xs text-slate-400">Real-time feed</div>
      </div>

      <ul className="mt-4 space-y-3 max-h-72 overflow-auto">
        {feed.length===0 && <li className="text-slate-400">Waiting for live data...</li>}
        {feed.map((item, idx)=> (
          <li key={idx} className="p-3 rounded-md bg-gradient-to-r from-slate-900/30 to-transparent border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="text-sm"><span className="badge-neon">{item.platform}</span> • {item.type}</div>
              <div className="text-xs text-slate-400">{item.time}</div>
            </div>
            <div className="text-sm text-slate-200 mt-2">{item.text}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
