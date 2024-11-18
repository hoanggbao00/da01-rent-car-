import { useFiltersContext } from '@/context/FiltersContext';
import { IResCarProps } from '@/models/res.model';
import { Box, Flex, Space } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CarCard } from './CarCard';
import { NoCarsFound } from './NoCarsFound';
import { PaginationButtons } from './PaginationButtons';

const itemsPerPage = 6;

interface CarListProps {
	cars: Partial<IResCarProps>[];
}

export const CarList = ({ cars }: CarListProps) => {
	const { state } = useFiltersContext();
	const [activePage, setPage] = useState(1);
	const [visibleCars, setVisibleCars] = useState<Partial<IResCarProps>[]>([]);

	const total = Math.ceil(cars.length / itemsPerPage);

	const handlePageChange = (value: number) => {
		setPage(value);
		const start = (value - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		setVisibleCars(cars.slice(start, end));
	};

	useEffect(() => {
		const filteredCars = cars.filter((car) => {
			const typeMatch =
				state.type?.toLowerCase() === 'any' ||
				car.type?.toLowerCase() === state.type?.toLowerCase();

			const transmissionMatch =
				state.transmission?.toLowerCase() === 'any' ||
				car.transmission?.toLowerCase() === state.transmission.toLowerCase();

			const fuelTypeMatch =
				state.fuelType?.toLowerCase() === 'any' ||
				car.fuelType?.toLowerCase() === state.fuelType.toLowerCase();

			const priceRangeMatch =
				car.pricePerDay &&
				car.pricePerDay >= state.minPrice &&
				car.pricePerDay <= state.maxPrice;

			const yearRangeMatch =
				car.year && car.year >= state.minYear && car.year <= state.maxYear;

			return (
				typeMatch &&
				transmissionMatch &&
				fuelTypeMatch &&
				priceRangeMatch &&
				yearRangeMatch
			);
		});

		setVisibleCars(filteredCars.slice(0, itemsPerPage));
	}, [cars, state]);

	return (
		<Box w={'100%'}>
			{visibleCars.length > itemsPerPage && (
				<PaginationButtons
					value={activePage}
					handlePageChange={handlePageChange}
					total={total}
				/>
			)}

			{visibleCars.length === 0 ? (
				<NoCarsFound />
			) : (
				<Flex wrap='wrap' gap={{ base: 15, md: 24 }}>
					{visibleCars.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</Flex>
			)}

			<Space my={8} />
			{visibleCars.length > itemsPerPage && (
				<PaginationButtons
					value={activePage}
					handlePageChange={handlePageChange}
					total={total}
				/>
			)}
		</Box>
	);
};
