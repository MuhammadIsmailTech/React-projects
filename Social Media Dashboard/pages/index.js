import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Overview from '../components/Overview'
import LiveFeed from '../components/LiveFeed'

export default function Home() {
  return (
    <>
      <Head>
        <title>Social Media Analytics Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#050816] via-[#071032] to-[#000000] text-slate-100">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6">
            <Topbar />
            <main className="mt-6 space-y-6">
              <Overview />
              <LiveFeed />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
