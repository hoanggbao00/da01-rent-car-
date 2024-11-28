import { ghCurrency } from '@/const';
import { useFiltersContext } from '@/context/FiltersContext';
import { Box, Flex, NumberInput, RangeSlider, Text } from '@mantine/core';

const lowestPrice = 0;
const highestPrice = 50000000;

interface Props {
	showSlider?: boolean;
}

export const PriceRange = ({ showSlider = true }: Props) => {
	const { state, updateFilterProperty } = useFiltersContext();
	function labelFormatter(value: number) {
		return `${ghCurrency} ${value.toLocaleString()}`;
	}

	function handleSliderChange([min, max]: [number, number]) {
		updateFilterProperty('minPrice', min);
		updateFilterProperty('maxPrice', max);
	}

	return (
		<>
			{showSlider && <Text my={16}>Price Range</Text>}
			{showSlider && (
				<RangeSlider
					py='xl'
					step={10}
					min={lowestPrice}
					max={highestPrice}
					labelAlwaysOn
					value={[state.minPrice, state.maxPrice]}
					label={labelFormatter}
					onChange={handleSliderChange}
					thumbSize={12}
					color='blue.5'
				/>
			)}
			<Flex gap={8} mt={showSlider ? 0 : 8}>
				<Box w={{ base: '100%', md: '150px' }}>
					<Text size='xs'>Lowest</Text>
					<NumberInput
						step={100000}
						min={lowestPrice}
						max={highestPrice}
						value={state.minPrice}
						onChange={(value) =>
							value !== '' && updateFilterProperty('minPrice', value)
						}
						thousandSeparator={','}
					/>
				</Box>
				<Box w={{ base: '100%', md: '150px' }}>
					<Text size='xs'>Highest</Text>
					<NumberInput
						step={100000}
						min={10}
						max={highestPrice}
						value={state.maxPrice}
						onChange={(value) =>
							value !== '' && updateFilterProperty('maxPrice', value)
						}
						thousandSeparator={','}
					/>
				</Box>
			</Flex>
		</>
	);
};
