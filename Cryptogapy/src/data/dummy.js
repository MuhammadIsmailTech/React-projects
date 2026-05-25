const dummyData = {
  user: {
    name: 'Elena',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    balance: 174285.5,
    profit: 18.4
  },
  stats: [
    { title: 'Total Portfolio', value: '$174,285', details: 'Today +8.4%', icon: 'trending-up' },
    { title: '24h Profit/Loss', value: '+$5,120', details: 'Stable gains', icon: 'dollar-sign' },
    { title: 'Market Cap', value: '$2.4T', details: 'Top 30 cryptos', icon: 'pie-chart' }
  ],
  watchlist: [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 69320, change: 2.6 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3848, change: -1.2 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 183.5, change: 4.5 }
  ],
  news: [
    { title: 'Crypto markets rally as Bitcoin breaks new resistance', source: 'CoinDesk', time: '2h ago' },
    { title: 'Ethereum ETF outlook continues to improve', source: 'The Block', time: '5h ago' },
    { title: 'DeFi adoption accelerates in emerging markets', source: 'Cointelegraph', time: '9h ago' }
  ]
};

export default dummyData;
