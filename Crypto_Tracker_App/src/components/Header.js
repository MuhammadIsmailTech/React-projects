import {
  Heading,
  Box,
  Spacer,
  IconButton,
  HStack,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'sm'}
      position='sticky'
      top={0}
      zIndex={20}
      borderBottomWidth='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <HStack mx={{ base: 4, md: 12 }} py={4} spacing={4} alignItems={'center'}>
        <Box>
          <Heading fontSize={{ base: '2xl', md: '3xl' }}>
            <Text as='span' bgGradient={'linear(to-r, purple.500, blue.500)'} bgClip='text'>
              Crypto Tracker
            </Text>
          </Heading>
          <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.400')}>
            Live market prices in one place
          </Text>
        </Box>

        <Spacer />

        <IconButton
          aria-label='Toggle color mode'
          isRound={true}
          onClick={toggleColorMode}
          bg={useColorModeValue('gray.200', 'gray.700')}
          icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        />
      </HStack>
    </Box>
  );
};

export default Header;
