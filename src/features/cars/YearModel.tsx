import { useFiltersContext } from '@/context/FiltersContext';
import {
	Box,
	Flex,
	Input,
	NumberInput,
	RangeSlider,
	Text,
} from '@mantine/core';

const currentYear = new Date().getFullYear();

interface Props {
	showSlider?: boolean;
}

export const YearModel = ({ showSlider = true }: Props) => {
	const { state, updateFilterProperty } = useFiltersContext();

	function handleSliderChange([min, max]: [number, number]) {
		updateFilterProperty('minYear', min);
		updateFilterProperty('maxYear', max);
	}

	function handleChange(value: string | number) {
		updateFilterProperty('minYear', 1900);
		updateFilterProperty('maxYear', Number(value));
	}

	return (
		<>
			{showSlider && <Text my={16}>Year</Text>}
			{showSlider && (
				<RangeSlider
					py='xl'
					min={1990}
					max={currentYear}
					labelAlwaysOn
					value={[state.minYear, state.maxYear]}
					onChange={handleSliderChange}
					thumbSize={12}
					color='blue.5'
				/>
			)}
			{!showSlider && (
				<Flex direction={'column'} w={{ base: '100%', md: '150px' }}>
					<Text>Year</Text>
					<NumberInput
						onChange={(e) => handleChange(e)}
						defaultValue={new Date().getFullYear()}
						value={state.maxYear}
					/>
				</Flex>
			)}
		</>
	);
};
