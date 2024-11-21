import { Logo } from '@/components/Header/Logo';
import { SelectCarType } from '@/components/SelectCarType';
import { SelectFuelType } from '@/components/SelectFuelType';
import { Button, Drawer, Flex, Space, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilterCog } from '@tabler/icons-react';
import { PriceRange } from './PriceRange';
import { ResetFiltersButton } from './ResetFiltersButton';
import { Transmission } from './Transmission';
import { YearModel } from './YearModel';
import { SelectRegion } from '@/components/SelectRegion';
import { useAppContext } from '@/context/AppContext';
import { useRegions } from '@/hooks/useRegions';
import { SelectCarMake } from '@/components/SelectCarMake';
import { carMakes } from '@/data/car-makes';

export const FiltersDrawer = () => {
	const [opened, { open, close }] = useDisclosure(false);
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

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title={<Logo />}
				w={'100%'}
				display={{ base: 'inline-block', lg: 'none' }}
				position='top'
				size='xl'
				pt='100px'
				// without this prop, opening the drawer in prod will throw a client side exception
				transitionProps={{
					transition: 'slide-down',
				}}
			>
				<Flex w={'100%'} align='center' justify='space-between'>
					<Title order={4}>Bộ lọc</Title>
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
				<SelectCarType addAny={true} />
				<PriceRange />
				<YearModel />
				<Transmission />
				<Space my='lg' />
				<SelectFuelType addAny />
			</Drawer>

			<Button
				onClick={open}
				variant='subtle'
				display={{ base: 'inline-block', md: 'none' }}
			>
				<IconFilterCog size='14px' />{' '}
				<Text component='span' mx={2}>
					Mở bộ lọc
				</Text>
			</Button>
		</>
	);
};
