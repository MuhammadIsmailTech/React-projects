import {
    Tr,
    HStack,
    Text,
    Td,
    Image
} from '@chakra-ui/react';

const Coin = ({ image, name, symbol, current_price, market_cap, total_volume, price_change_percentage_24h }) => {
    const priceChange = typeof price_change_percentage_24h === 'number' ? price_change_percentage_24h : null;
    const priceText = priceChange !== null ? `${priceChange.toFixed(2)}%` : 'N/A';
    const priceColor = priceChange === null ? 'gray.500' : priceChange < 0 ? 'red.500' : 'green.300';

    const formatValue = (value) => {
        return value !== null && value !== undefined ? value.toLocaleString() : 'N/A';
    }

    return (
        <Tr>
            <Td>
                <HStack>
                    <Image
                        boxSize='30px'
                        objectFit={'contain'}
                        src={image}
                        alt={name}
                    />

                    <Text>{name || 'Unknown'}</Text>
                </HStack>
            </Td>
            <Td><Text textTransform={'uppercase'}>{symbol || 'N/A'}</Text></Td>
            <Td>₹{formatValue(current_price)}</Td>
            <Td>
                <Text color={priceColor}>{priceText}</Text>
            </Td>
            <Td>{formatValue(total_volume)}</Td>
            <Td>{formatValue(market_cap)}</Td>
        </Tr>
    )
}

export default Coin
