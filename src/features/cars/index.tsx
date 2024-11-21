'use client';
// import Map from '@/components/Map/Map';
import { FiltersContextProvider } from '@/context/FiltersContext';
import { IResCarProps } from '@/models/res.model';
import { Card, Container, Flex } from '@mantine/core';
import { CarList } from './CarList';
import { FiltersDrawer } from './FiltersDrawer';
import classes from './Styles.module.css';
import SideFilter from './SideFilter';
interface LayoutProps {
	cars: Partial<IResCarProps>[] | null;
}
export const Layout = ({ cars }: LayoutProps) => {
	return (
		<FiltersContextProvider>
			<Container className={classes.container} size='xl'>
				<Card w={'100%'}>
					<FiltersDrawer />
				</Card>
			</Container>
			<div className='px-10'>
				<Flex direction={'row'} className={classes.container} gap={16}>
					<SideFilter />
					<CarList cars={cars || []} />
				</Flex>
			</div>
		</FiltersContextProvider>
	);
};
