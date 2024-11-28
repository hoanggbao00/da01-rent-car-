import { Button, Divider, Flex, Space, Title } from '@mantine/core';
import { ResetFiltersButton } from './ResetFiltersButton';
import { SelectRegion } from '@/components/SelectRegion';
import { SelectCarMake } from '@/components/SelectCarMake';
import { SelectCarType } from '@/components/SelectCarType';
import { PriceRange } from './PriceRange';
import { YearModel } from './YearModel';
import { SelectFuelType } from '@/components/SelectFuelType';
import { Transmission } from './Transmission';
import { carMakes } from '@/data/car-makes';
import { useRegions } from '@/hooks/useRegions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import { getDefaultSelectedRegion } from '@/functions';
import { useFiltersContext } from '@/context/FiltersContext';

interface Props {}

export default function SideFilter(props: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { regions } = useRegions();
	const { state, setRegion, setMake } = useAppContext();
	const { state: filterState, updateFilterProperty } = useFiltersContext();

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

	const handleSearchCars = () => {
		let params = {} as any;
		if (state.selectedRegion) {
			params.region =
				state.selectedRegion.code === -1 ? '' : state.selectedRegion.code;
		}

		if (state.carMake) {
			params.make = state.carMake.value ?? 'all';
		}

		const _search = new URLSearchParams(params);
		router.replace(`?${_search}`);
	};

	const handleCarTypeChange = (value: string) => {
		updateFilterProperty('type', value);
	};

	// Nếu region thay đổi
	useEffect(() => {
		if (regions) {
			const region_code = searchParams.get('region');
			const selectedRegion = getDefaultSelectedRegion(regions, region_code);
			setRegion(selectedRegion);
		}
	}, [regions, searchParams]);

	// Nếu loại xe thay đổi
	useEffect(() => {
		const makeParam = searchParams.get('make');
		if (makeParam) {
			const selectedMake = carMakes.filter(
				(make) => make.value === makeParam
			)[0];
			setMake(selectedMake);
		}
	}, [searchParams, setMake]);

	return (
		<div className='w-[300px] hidden lg:block bg-gray-300/20 p-4 rounded-2xl sticky top-20'>
			<Flex align='center' justify='space-between'>
				<Title order={4}>Search</Title>
				<ResetFiltersButton />
			</Flex>
			<SelectRegion
				value={state.selectedRegion?.code.toString()}
				onChange={handleRegionChange}
			/>
			<SelectCarMake
				value={state.carMake?.value}
				onChange={handleCarMakeChange}
				addAll={true}
			/>

			<Button
				onClick={handleSearchCars}
				fullWidth
				radius='md'
				size='sm'
				color='blue.5'
				mt={16}
			>
				Search
			</Button>
			<Divider my='md' />
			<Title order={4}>Filter</Title>
			<SelectCarType
				addAny={true}
				onChange={handleCarTypeChange}
				value={filterState.type}
			/>
			<PriceRange />
			<YearModel />
			<Transmission />
		</div>
	);
}
