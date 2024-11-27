'use client';
import { StatusRenderer } from '@/components/StatusRenderer';
import { IResCarProps, IResReviewProps, IResUserProps } from '@/models/res.model';
import {
	Box,
	Card,
	Container,
	Divider,
	Flex,
	Image,
	Text,
	Title,
} from '@mantine/core';
import { BookingDetails } from './BookingDetails';
import { CarsCarousel } from './Carousel';
import { Features } from './Features';
import { ProviderDetails } from './ProviderDetails';
import { Reviews } from './Reviews';
import { BiCheck, BiMapPin } from 'react-icons/bi';
import { fuelTypes } from '@/components/SelectFuelType';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/actions/users.actions';

interface CarDetailsProps {
	car: IResCarProps;
	reviews: IResReviewProps[];
	userId?: string;
	provider: {
		companyName: string;
		avatar: string;
		email: string;
		phone: string;
	} | null;
}

export const CarDetails = ({
	car,
	provider,
	userId,
	reviews,
}: CarDetailsProps) => {
	const [user, setUser] = useState<IResUserProps | null>(null);

	const isShow = false;
	const fuelType = fuelTypes.find((type) => type.value === car.fuelType)?.label;

	const transmission =
		car.transmission === 'manual' ? 'Số thủ công' : 'Số tự động';

	useEffect(() => {
		if (userId) {
			const fetchUser = async () => {
				const res = await getUserDetails(userId);
				if (res.id) setUser(res);
			};

			fetchUser()
		}
	}, [userId]);

	return (
		<>
			<div className='min-h-screen bg-gray-50 p-8'>
				<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
					{/* Car Image and Details */}
					<div className='space-y-4 xl:col-span-2'>
						<div className='relative w-full aspect-video'>
							<CarsCarousel images={car.images ?? []} />
							<div className='absolute top-4 left-4 flex space-x-2'>
								<StatusRenderer
									status={car.status}
									variant='filled'
									size='lg'
								/>
							</div>
						</div>
						<div className='flex space-x-2 flex-nowrap overflow-auto'>
							{car.images?.map((i, index) => (
								<Image
									key={index}
									src={i}
									alt={`Car ${i}`}
									className='!rounded-lg h-[100px] aspect-video'
								/>
							))}
						</div>
						<div>
							<h2 className='text-2xl font-bold'>
								{car.make} {car.model}
							</h2>
							<h3 className='text-xl text-gray-500'>{transmission}</h3>
						</div>
						<div className='bg-white p-4 rounded-lg shadow'>
							<ul className='space-y-2'>
								<li className='flex justify-between'>
									<span>Năm sản xuất</span>
									<span>{car.year}</span>
								</li>
								<li className='flex justify-between'>
									<span>Loại phương tiện</span>
									<span>{car.type}</span>
								</li>
								<li className='flex justify-between'>
									<span>Màu</span>
									<span>{car.color}</span>
								</li>
								<li className='flex justify-between'>
									<span>Loại thuê</span>
									<span>Theo ngày</span>
								</li>
								<li className='flex justify-between'>
									<span>Loại nhiên liệu</span>
									<span>{fuelType}</span>
								</li>
								<li className='flex justify-between'>
									<span>Điều hòa</span>
									<span>{car.acAvailable ? 'Có' : 'Không'}</span>
								</li>
							</ul>
						</div>
						<div className='bg-white p-4 rounded-lg shadow'>
							<p>Các tính năng khác</p>
							<Divider mb={6} />
							<ul className='space-y-2'>
								{car.otherFeatures?.map((feature, index) => (
									<li key={index} className='flex items-center gap-2'>
										<BiCheck />
										{feature}
									</li>
								))}
								{car.otherFeatures?.length === 0 && (
									<p className='text-gray-500'>Không có</p>
								)}
							</ul>
						</div>
					</div>

					{/* Map and Booking Summary */}
					<div className='space-y-4'>
						<div className='bg-white p-4 rounded-lg shadow'>
							{provider && <ProviderDetails provider={provider} />}
							<div className='flex items-center mt-4'>
								<BiMapPin className='w-5 h-5 text-blue-500' />
								<span className='ml-2'>{car.regions.name}</span>
							</div>
						</div>
						<BookingDetails car={car} user={user || null} />
					</div>
				</div>
				<Box className='max-w-7xl mx-auto'>
					<Divider
						mt='md'
						label={
							<Title order={3} className='text-muted'>
								Lượt đánh giá
							</Title>
						}
					/>
					<Reviews
						reviews={reviews}
						car_id={Number(car.id)}
						provider_id={car.provider_id!}
					/>
				</Box>
			</div>
			{isShow && (
				<Container size='xl' py='md'>
					<Flex gap='md' direction={{ base: 'column', md: 'row' }}>
						<Card withBorder w={{ base: '100%', md: 'calc(100% - 350px)' }}>
							<Flex align='flex-end' justify='space-between'>
								<Box>
									<Box my='xs'>
										{car.status !== 'available' && (
											<StatusRenderer status={car.status} />
										)}
									</Box>

									<Title order={2}>
										{car.make} {car.model} {car.year}
									</Title>
									<Text c='gray.6'>{car.type}</Text>
								</Box>
							</Flex>
							<CarsCarousel images={car.images} />

							<Box my='lg'>
								<Title order={5} my='xs'>
									Thông tin phương tiện
								</Title>

								<Text size='sm' color='gray.6'>
									{car.description}
								</Text>
							</Box>
							<Features
								seatingCapacity={car.seatingCapacity}
								transmission={car.transmission}
								fuelType={car.fuelType}
								engineCapacity={car.engineCapacity}
								otherFeatures={car.otherFeatures}
								acAvailable={car.acAvailable}
								acWorking={car.acWorking}
								numberOfDoors={car.numberOfDoors}
							/>
						</Card>
						<BookingDetails car={car} user={user} />
					</Flex>
				</Container>
			)}
		</>
	);
};
