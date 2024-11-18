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
import { GiCarDoor } from 'react-icons/gi';
import classes from './Styles.module.css';

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
	return (
		<>
			<Title order={5} my='xs'>
				Thông số
			</Title>
			<Grid>
				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }} className='!motion-preset-slide-right'>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Chỗ ngồi</Text>
						<Text fw='bold'>{seatingCapacity}</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }} className='!motion-preset-slide-right motion-delay-[300ms]'>
					<Card className={classes.mainFeatures} withBorder>
						<IconManualGearbox />
						<Text size='xs'>Loại cần số</Text>
						<Text fw='bold'>
							{transmission === 'manual' ? 'Số thủ công' : 'Số tự động'}
						</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }} className='!motion-preset-slide-right motion-delay-[600ms]'>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Loại xăng/dầu</Text>
						<Text fw='bold'>{fuelType}</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }} className='!motion-preset-slide-right motion-delay-[900ms]'>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Dung tích máy</Text>
						<Text fw='bold'>{engineCapacity}</Text>
					</Card>
				</Grid.Col>
			</Grid>

			<Grid align='flex-start' my='md' className='!motion-preset-slide-up-sm motion-delay-[1200ms]'>
				{otherFeatures.length !== 0 && (
					<Grid.Col span={{ base: 12, sm: 6 }}>
						<Card withBorder>
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
				<Grid.Col span={{ base: 12, sm: 6 }} className='!motion-preset-slide-up-sm motion-delay-[1200ms]'>
					<Card withBorder>
						<Divider mb='md' />
						<Flex gap='md' justify='space-between' align='center' my='md'>
							<Text>Điều hòa</Text>
							<Text>{acAvailable ? 'Có' : 'Không'}</Text>
						</Flex>

						<Flex gap='md' justify='space-between' align='center' my='md'>
							<Text>Điều hòa hoạt động</Text>
							<Text>{acWorking ? 'Có' : 'Không'}</Text>
						</Flex>
					</Card>
				</Grid.Col>
			</Grid>
		</>
	);
};
