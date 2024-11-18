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
  numberOfDoors: number
}

export const Features = ({
	seatingCapacity,
	transmission,
	fuelType,
	engineCapacity,
	otherFeatures,
	acAvailable,
	acWorking,
  numberOfDoors
}: Props) => {
	return (
		<>
			<Title order={5} my='xs'>
				Thông số
			</Title>
			<Grid>
				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Số ghế</Text>
						<Text fw='bold' size='xl'>
							{seatingCapacity}
						</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
					<Card className={classes.mainFeatures} withBorder>
						<IconManualGearbox />
						<Text size='xs'>Loại cần số</Text>
						<Text fw='bold'>
							{transmission === 'manual' ? 'Số thủ công' : 'Số tự động'}
						</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Loại xăng/dầu</Text>
						<Text fw='bold'>{fuelType}</Text>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
					<Card className={classes.mainFeatures} withBorder>
						<IconUsers />
						<Text size='xs'>Dung tích máy</Text>
						<Text fw='bold'>{engineCapacity}</Text>
					</Card>
				</Grid.Col>
			</Grid>

			<Grid align='flex-start' my='md'>
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
				<Grid.Col span={{ base: 12, sm: 6 }}>
					<Card withBorder>
						<Flex gap='md' align='center' my='md'>
							<GiCarDoor />
							<Text>{numberOfDoors} Cửa</Text>
						</Flex>
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