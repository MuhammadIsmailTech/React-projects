import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 20000
});

export async function fetchCoinMarkets() {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 24,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h'
    }
  });
  return response.data;
}

export async function fetchCoinDetail(id) {
  const response = await api.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: true
    }
  });
  return response.data;
}

export async function fetchCoinHistory(id, days = 30) {
  const response = await api.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
      interval: 'daily'
    }
  });
  return response.data;
}

export async function fetchTrendingCoins() {
  const response = await api.get('/search/trending');
  return response.data.coins.map((item) => item.item);
}
