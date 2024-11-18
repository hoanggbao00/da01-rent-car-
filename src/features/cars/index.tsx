'use client';
// import Map from '@/components/Map/Map';
import { FiltersContextProvider } from '@/context/FiltersContext';
import { IResCarProps } from '@/models/res.model';
import {
	Box,
	Button,
	Card,
	Container,
	Divider,
	Flex,
	Space,
	Title,
} from '@mantine/core';
import { IconBrandGoogleMaps } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { BodyType } from './BodyType';
import { CarList } from './CarList';
import { FiltersDrawer } from './FiltersDrawer';
import { PriceRange } from './PriceRange';
import { ResetFiltersButton } from './ResetFiltersButton';
import classes from './Styles.module.css';
import { YearModel } from './YearModel';
import dynamic from 'next/dynamic';
import { SelectRegion } from '@/components/SelectRegion';
import { useAppContext } from '@/context/AppContext';
import { useRegions } from '@/hooks/useRegions';
import { SelectCarMake } from '@/components/SelectCarMake';
import { carMakes } from '@/data/car-makes';
import { getDefaultSelectedRegion } from '@/functions';
import { useRouter, useSearchParams } from 'next/navigation';

// Importing Map component dynamically removes ReferenceError: window is not defined
const Map = dynamic(() => import('@/components/Map/Map'), {
	ssr: false,
});

interface LayoutProps {
	cars: Partial<IResCarProps>[] | null;
}
export const Layout = ({ cars }: LayoutProps) => {
	const router = useRouter();
	const [showMap, setShowMap] = useState(false);
	const searchParams = useSearchParams();
	const { regions } = useRegions();
	const { state, setRegion, setMake } = useAppContext();

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
			params.region = state.selectedRegion.code;
		}

		if (state.carMake) {
			params.make = state.carMake.value ?? 'all';
		}

		const _search = new URLSearchParams(params);
		router.replace(`?${_search}`);
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
		<FiltersContextProvider>
			<Container className={classes.container} size='xl' my='sm' py='md'>
				{showMap && <Map height='200px' />}

				<Flex direction={'column'} className={classes.container}>
					<Card w={'100%'}>
						<Flex align='center' justify='space-between'>
							<Title order={4}>Bộ lọc</Title>
							<Box display={{ base: 'none', md: 'inline-block' }}>
								<Button
									onClick={() => setShowMap(!showMap)}
									className={classes.mapToggle}
									size='sm'
									variant='subtle'
								>
									<IconBrandGoogleMaps size='16px' />
									{showMap ? 'Ẩn bản đồ' : <>Hiển thị bản đồ</>}
								</Button>
								<ResetFiltersButton />
							</Box>
							<FiltersDrawer />
						</Flex>
						<Divider my={16} display={{ base: 'none', md: 'block' }} />
						<Box display={{ base: 'none', md: 'block' }}>
							<Flex gap={8}>
								<SelectRegion
									value={state.selectedRegion?.code.toString()}
									onChange={handleRegionChange}
								/>
								<SelectCarMake
									value={state.carMake?.value}
									onChange={handleCarMakeChange}
									addAll={true}
								/>
								<BodyType />
								<PriceRange showSlider={false} />
								<YearModel showSlider={false} />
								<Button
									onClick={handleSearchCars}
									mt={24}
								>
									Tìm kiếm
								</Button>
							</Flex>
						</Box>
					</Card>

					<CarList cars={cars || []} />
				</Flex>
			</Container>
		</FiltersContextProvider>
	);
};
