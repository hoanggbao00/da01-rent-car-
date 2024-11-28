'use client';

import { SelectCarMake } from '@/components/SelectCarMake';
import { SelectRegion } from '@/components/SelectRegion';
import { useAppContext } from '@/context/AppContext';
import { carMakes } from '@/data/car-makes';
import { useRegions } from '@/hooks/useRegions';
import { Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookingFormLanding() {
	const { state, setMake, setRegion } = useAppContext();
	const [isLoading, setLoading] = useState(false);
	const { regions } = useRegions();
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let params = {} as any;
		if (state.selectedRegion) {
			params.region = state.selectedRegion.code == -1 ? '' : state.selectedRegion.code;
		}
		if (state.carMake) {
			params.make = state.carMake.value;
		}

		setLoading(true);
		const _search = new URLSearchParams(params);
		router.push(`/cars?${_search.toString()}`);
	};

	const handleRegionChange = (value: string) => {
		if (regions) {
			const newSelectedRegion = regions.filter(
				(region) => region.code.toString() === value
			)[0];
			setRegion(newSelectedRegion);
		}
	};

	const handleCarMakeChange = (value: string) => {
		const selectedMake = carMakes.filter((make) => make.value === value)[0];
		setMake(selectedMake);
	};

	return (
		<>
			{isLoading && (
				<div className='fixed inset-0 bg-gray-500/70 z-50 flex items-center justify-center'>
					<Loader size='xl' />
				</div>
			)}
			<div className='rounded-lg shadow-lg p-6 md:w-[400px] bg-white/80 '>
				<form className='space-y-2' onSubmit={handleSubmit}>
					<SelectRegion
						value={state.selectedRegion?.code.toString() || ''}
						onChange={handleRegionChange}
					/>
					<SelectCarMake
						value={state.carMake?.value || 'all'}
						onChange={handleCarMakeChange}
						addAll
					/>
					<button
						type='submit'
						className='w-full bg-sky-400 hover:bg-sky-600 transition-colors text-white py-2 rounded-md'
					>
						Booking Now
					</button>
				</form>
			</div>
		</>
	);
}
