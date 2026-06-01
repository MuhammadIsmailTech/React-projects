import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ search, setSearch }) => {
  return (
    <InputGroup maxW={'4xl'} w={'full'}>
      <InputLeftElement pointerEvents='none' children={<FaSearch color='#9CA3AF' />} />
      <Input
        variant='filled'
        size='lg'
        placeholder='Search coins, e.g. bitcoin'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        bg='gray.100'
        _dark={{ bg: 'gray.700' }}
      />
    </InputGroup>
  );
};

export default Searchbar;
