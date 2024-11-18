import { ghCurrency } from '@/const';
import { IResCarProps } from '@/models/res.model';
import { Box, Button, Card, Flex, Image, Text, Title } from '@mantine/core';
import {
	IconBrandGoogleMaps,
	IconManualGearbox,
	IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { BsArrowRight, BsFuelPump } from 'react-icons/bs';

interface CardProps {
	car: Partial<IResCarProps>;
}
export const CarCard = ({ car }: CardProps) => {
	return (
		<Card
			w={{ base: '100%', md: '33%', lg: '23%' }}
			radius={'md'}
			bg={'gray.0'}
			className='group relative'
		>
			<Flex align='flex-end' justify='space-between'>
				<Box>
					<Text fz={'xs'} color='gray.6'>
						<IconBrandGoogleMaps size={14} /> {car.regions?.name}
					</Text>
					<Link href={`/cars/${car.id}`}>
						<Title order={3}>
							{car.make} {car.model} {car.year}
						</Title>
					</Link>
					<Text fw='bold' size='md'>
						{car.pricePerDay?.toLocaleString()} {ghCurrency}/ ngày
					</Text>
				</Box>
			</Flex>
			<Flex
				justify='space-between'
				align='flex-end'
				style={{ width: '100%' }}
				className='relative overflow-hidden'
			>
				<Link href={`/cars/${car.id}`} style={{ width: '100%' }}>
					<Image
						style={{
							aspectRatio: '16 / 9',
						}}
						radius='md'
						src={car.images?.[0]}
						alt={car.make + ' ' + car.model}
					/>
					<div className='group-hover:animate-[slideUp_0.3s_forwards] animate-[slideDown_0.3s_forwards] absolute top-0 w-full h-full bg-gray-500/30 rounded-md grid place-items-center transition-all'>
						<Link href={`/cars/${car.id}`}>
							<Button>
								<p>Xem chi tiết</p>
								<BsArrowRight className='ml-2' />
							</Button>
						</Link>
					</div>
				</Link>
			</Flex>
			<Flex align='center'>
				<Flex align='center' gap={'4'} w={'100%'}>
					<Flex
						my={8}
						align='center'
						title='Số ghế'
						direction={'column'}
						justify={'center'}
						style={{ flex: 1 }}
						gap={6}
					>
						<IconUsers size='24px' color='gray' />
						<Text c='gray.6' size='md' fw={'bold'}>
							{car.seatingCapacity}
						</Text>
					</Flex>
					<Flex
						my={8}
						align='center'
						title='Loại cần số'
						direction={'column'}
						gap={6}
					>
						<IconManualGearbox size='24px' color='gray' />
						<Text c='gray.6' size='md' fw={'bold'}>
							{car.transmission === 'manual' ? 'Số thủ công' : 'Số tự động'}
						</Text>
					</Flex>
					<Flex
						my={8}
						align='center'
						title='Loại xăng/dầu'
						direction={'column'}
						style={{ flex: 1 }}
						gap={6}
					>
						<BsFuelPump size='24px' color='gray' />
						<Text c='gray.6' size='md' fw={'bold'}>
							{car.fuelType}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
