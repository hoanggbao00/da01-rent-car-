import {
	Card,
	Divider,
	Flex,
	Grid,
	List,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconCheck, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { PiEngineBold } from "react-icons/pi";
import classes from './Styles.module.css';
import { fuelTypes } from '@/components/SelectFuelType';
import { BsFuelPump } from 'react-icons/bs';

interface Props {
	seatingCapacity: number;
	transmission: string;
	fuelType: string;
	engineCapacity: string;
	otherFeatures: string[];
	acAvailable: boolean;
	acWorking: boolean;
	numberOfDoors: number;
}

export const Features = ({
	seatingCapacity,
	transmission,
	fuelType,
	engineCapacity,
	otherFeatures,
	acAvailable,
	acWorking,
	numberOfDoors,
}: Props) => {
	const fuel = fuelTypes.find(
		(item) => item.value.toLowerCase() === fuelType.toLowerCase()
	);

	return (
		<>
			<Title order={5} my='xs'>
				Features
			</Title>
			<Grid>
				<Grid.Col
					span={{ base: 12, xs: 6, sm: 3 }}
					className='!motion-preset-slide-right'
				>
					<Card className={classes.mainFeatures} withBorder radius={'md'}>
						<IconUsers />
						<Text size='xs'>Seat</Text>
						<Text fw='bold'>{seatingCapacity}</Text>
					</Card>
				</Grid.Col>

				<Grid.Col
					span={{ base: 12, xs: 6, sm: 3 }}
					className='!motion-preset-slide-right motion-delay-[300ms]'
				>
					<Card className={classes.mainFeatures} withBorder radius={'md'}>
						<IconManualGearbox />
						<Text size='xs'>Transmission</Text>
						<Text fw='bold'>
							{transmission === 'manual' ? 'Manual' : 'Automatic'}
						</Text>
					</Card>
				</Grid.Col>

				<Grid.Col
					span={{ base: 12, xs: 6, sm: 3 }}
					className='!motion-preset-slide-right motion-delay-[600ms]'
				>
					<Card className={classes.mainFeatures} withBorder radius={'md'}>
						<BsFuelPump size={24} />
						<Text size='xs'>Fuel</Text>
						<Text fw='bold'>{fuel?.label ?? 'All'}</Text>
					</Card>
				</Grid.Col>

				<Grid.Col
					span={{ base: 12, xs: 6, sm: 3 }}
					className='!motion-preset-slide-right motion-delay-[900ms]'
				>
					<Card className={classes.mainFeatures} withBorder radius={'md'}>
						<PiEngineBold size={24} />
						<Text size='xs'>Engine Capacity</Text>
						<Text fw='bold'>{engineCapacity}</Text>
					</Card>
				</Grid.Col>
			</Grid>

			<Grid
				align='flex-start'
				my='md'
				className='!motion-preset-slide-up-sm motion-delay-[1200ms]'
			>
				{otherFeatures.length !== 0 && (
					<Grid.Col span={{ base: 12, sm: 6 }}>
						<Card withBorder radius={'md'}>
							<List
								spacing='xs'
								size='sm'
								center
								icon={
									<ThemeIcon color='blue' size={24} radius='xl'>
										<IconCheck size='1rem' />
									</ThemeIcon>
								}
							>
								{otherFeatures.map((feature, i) => (
									<List.Item key={i}>{feature}</List.Item>
								))}
							</List>
						</Card>
					</Grid.Col>
				)}
				<Grid.Col
					span={{ base: 12, sm: 6 }}
					className='!motion-preset-slide-up-sm motion-delay-[1200ms]'
				>
					<Card withBorder>
						<Flex gap='md' justify='space-between' align='center' my='md'>
							<Text>AC Available</Text>
							<Text>{acAvailable ? 'Yes' : 'None'}</Text>
						</Flex>

						<Flex gap='md' justify='space-between' align='center' my='md'>
							<Text>AC Working</Text>
							<Text>{acWorking ? 'Yes' : 'None'}</Text>
						</Flex>
					</Card>
				</Grid.Col>
			</Grid>
		</>
	);
};
