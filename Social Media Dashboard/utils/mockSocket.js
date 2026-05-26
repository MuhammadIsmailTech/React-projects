export default function mockSocket(){
  let closed = false
  const platforms = ['Instagram','Facebook','TikTok','X','LinkedIn','YouTube']
  const types = ['like','comment','share','mention','view']
  const socket = {
    onmessage: null,
    close(){ closed = true }
  }

  const tick = ()=>{
    if(closed) return
    const payload = {
      platform: platforms[Math.floor(Math.random()*platforms.length)],
      type: types[Math.floor(Math.random()*types.length)],
      text: ['Great post!','This went viral','Check this out','Amazing content','Can you share source?'][Math.floor(Math.random()*5)],
      time: new Date().toLocaleTimeString()
    }
    if(socket.onmessage) socket.onmessage(payload)
    setTimeout(tick, 1200 + Math.random()*2000)
  }
  setTimeout(tick, 800)
  return socket
}
