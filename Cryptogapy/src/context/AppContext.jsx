import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCoinMarkets, fetchCoinDetail, fetchCoinHistory, fetchTrendingCoins } from '../services/api.js';
import dummyData from '../data/dummy.js';

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [coins, setCoins] = useState(dummyData.watchlist);
  const [trending, setTrending] = useState(dummyData.watchlist);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlist, setWatchlist] = useState(['bitcoin', 'ethereum', 'cardano']);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedTheme = localStorage.getItem('cryptogapy-theme');
    const storedWatchlist = localStorage.getItem('cryptogapy-watchlist');
    if (storedTheme) setTheme(storedTheme);
    if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('cryptogapy-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cryptogapy-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    async function loadMarkets() {
      setLoading(true);
      setError('');
      try {
        const marketData = await fetchCoinMarkets();
        setCoins(marketData);
        const trendingData = await fetchTrendingCoins();
        setTrending(trendingData);
      } catch (fetchError) {
        setError('Unable to load live market information. Showing sample data instead.');
        setCoins(dummyData.watchlist);
        setTrending(dummyData.watchlist);
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
    const interval = setInterval(loadMarkets, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  const addToWatchlist = (coinId) => {
    setWatchlist((current) => Array.from(new Set([...current, coinId])));
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist((current) => current.filter((id) => id !== coinId));
  };

  const getCoinDetail = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCoinDetail(id);
      setSelectedCoin(data);
      return data;
    } catch (fetchError) {
      setError('Coin detail could not be retrieved.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      coins,
      trending,
      selectedCoin,
      getCoinDetail,
      loading,
      error,
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      searchQuery,
      setSearchQuery,
      dummyData
    }),
    [theme, coins, trending, selectedCoin, loading, error, watchlist, searchQuery]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
