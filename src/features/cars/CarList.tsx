import { useFiltersContext } from '@/context/FiltersContext';
import { IResCarProps } from '@/models/res.model';
import { Box, Space } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CarCard } from './CarCard';
import { NoCarsFound } from './NoCarsFound';
import CarListSkeleton from './CarListSkeleton';

interface CarListProps {
	cars: Partial<IResCarProps>[];
}

export const CarList = ({ cars }: CarListProps) => {
	const { state } = useFiltersContext();
	const [visibleCars, setVisibleCars] = useState<Partial<IResCarProps>[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
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

		setLoading(false);
		setVisibleCars(filteredCars);
	}, [cars, state]);

	return (
		<Box w={'100%'}>
			{!loading && visibleCars.length === 0 && <NoCarsFound />}
			{!loading && visibleCars.length >= 1 && (
				<div>
					<p className='text-2xl font-semibold mb-4'>
						Show: {visibleCars.length ?? 0} Vehicles
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
						{visibleCars.map((car) => (
							<CarCard key={car.id} car={car} />
						))}
					</div>
				</div>
			)}

			{loading && <CarListSkeleton />}

			<Space my={8} />
		</Box>
	);
};
