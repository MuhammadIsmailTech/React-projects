import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Kpi({title, value, delta}){
  return (
    <div className="kpi glass p-4 rounded-lg">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="text-xs text-green-400 mt-1">{delta} since yesterday</div>
    </div>
  )
}

export default function Overview(){
  const [followers, setFollowers] = useState(125430)
  const [data, setData] = useState({labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets:[{label:'Followers',data:[120000,121500,122300,123800,124500,125000,125430],borderColor:'#7C3AED',tension:0.3}]})

  useEffect(()=>{
    const i = setInterval(()=>{
      setFollowers((f)=>f + Math.round(Math.random()*40))
      setData((d)=>({ ...d, datasets: [{...d.datasets[0], data: d.datasets[0].data.map(v=>v+Math.random()*200)}] }))
    },3500)
    return ()=>clearInterval(i)
  },[])

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 glass p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Follower Growth</h4>
          <div className="text-sm text-slate-400">Last 7 days</div>
        </div>
        <div className="mt-3">
          <Line data={data} />
        </div>
      </div>

      <div className="space-y-4">
        <Kpi title="Total Followers" value={followers.toLocaleString()} delta="+1.2%" />
        <Kpi title="Engagement Rate" value="4.8%" delta="+0.3%" />
        <Kpi title="Reach (last 24h)" value="1.2M" delta="+2.1%" />
      </div>
    </section>
  )
}
