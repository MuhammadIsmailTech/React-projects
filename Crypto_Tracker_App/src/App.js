import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container,
  VStack,
  Spinner,
  Box,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Cointable from './components/Cointable';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  const getCoins = async () => {
    const uri = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    await axios.get(uri).then((res) => {
      setCoins(res.data);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getCoins();
  }, []);

  const filterCoins = coins.filter((coin) => coin.name?.toLowerCase().includes(search.toLowerCase()));
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const headlineColor = useColorModeValue('gray.600', 'gray.300');
  const emptyTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box minH={'100vh'} bg={pageBg} px={{ base: 2, md: 0 }}>
      <Header />
      <Container maxW={'7xl'} py={10}>
        <Box
          bg={cardBg}
          borderRadius={'3xl'}
          boxShadow={'2xl'}
          px={{ base: 4, md: 10 }}
          py={{ base: 8, md: 12 }}
        >
          <VStack spacing={10}>
            <VStack spacing={4} w={'full'} textAlign={'center'}>
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                bgGradient={'linear(to-r, purple.500, blue.500)'}
                bgClip={'text'}
              >
                Crypto prices, beautifully organized
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={headlineColor} maxW={'3xl'}>
                Track your favorite coins in real time, compare market statistics, and stay ahead with a clean, modern dashboard.
              </Text>
            </VStack>

            <Searchbar search={search} setSearch={setSearch} />

            {!loaded ? (
              <Spinner thickness='4px' speed='0.65s' emptyColor='gray.300' color='purple.500' size='xl' />
            ) : (
              <Cointable coins={filterCoins} />
            )}

            {loaded && filterCoins.length === 0 && (
              <Text color={emptyTextColor} fontSize='lg'>
                No coins matched your search. Try another keyword.
              </Text>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
