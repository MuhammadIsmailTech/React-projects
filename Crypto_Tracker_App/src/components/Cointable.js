import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import Coin from './Coin';

const Cointable = ({ coins }) => {
  return (
    <Box
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius={'2xl'}
      overflowX='auto'
      w={'full'}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Table variant='striped' colorScheme='gray' size='md'>
        <Thead bg={useColorModeValue('gray.100', 'gray.800')}>
          <Tr>
            <Th>Coin</Th>
            <Th>Symbol</Th>
            <Th>Current Price</Th>
            <Th>Price Change</Th>
            <Th>Order Volume</Th>
            <Th>Market Depth</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coins.map((coin) => (
            <Coin {...coin} key={coin.id} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Cointable
