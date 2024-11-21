import { fuelTypes } from '@/components/SelectFuelType';
import { StatusRenderer } from '@/components/StatusRenderer';
import { ghCurrency } from '@/const';
import { IResCarProps } from '@/models/res.model';
import { Card, Text, Title } from '@mantine/core';

import { CarsCarousel } from './details/Carousel';
import Link from 'next/link';
import { MdEventSeat } from 'react-icons/md';
import { BsArrowRight, BsFuelPump } from 'react-icons/bs';
import { BiCheck } from 'react-icons/bi';

interface CardProps {
	car: Partial<IResCarProps>;
}
export const CarCard = ({ car }: CardProps) => {
	const fuelType = fuelTypes.find((type) => type.value === car.fuelType)?.label;
	const transmission =
		car.transmission === 'manual' ? 'Số thủ công' : 'Số tự động';

	return (
		<Card
			radius={'lg'}
			className='group relative hover:scale-105 transition-all hover:!border-sky-500'
			withBorder
			p={'md'}
		>
			<div className='flex gap-2 flex-col'>
				<StatusRenderer status={car.status || 'available'} size='md' />
				<div className='flex justify-end'>
					<div className='w-full !aspect-video relative'>
						<CarsCarousel images={car.images ?? []} />
					</div>
				</div>
				<div className='space-y-2'>
					<Text c='gray.6'>
						{car.type} | {transmission}
					</Text>
					<div className='flex items-center justify-between'>
						<Link
							href={`/cars/${car.id}`}
							className='hover:text-sky-500 transition-colors'
						>
							<Title order={3}>
								{car.make} {car.model}, {car.year}
							</Title>
						</Link>
						<div>
							<span className='font-semibold'>
								{car.pricePerDay?.toLocaleString()} {ghCurrency}
							</span>
							<span>/ngày</span>
						</div>
					</div>
					<div className='flex xl:items-center flex-col xl:flex-row gap-2'>
						<div className='flex flex-1 gap-2 flex-wrap'>
							<span
								title='Số ghế'
								className='bg-gray-400/20 inline-flex gap-2 rounded-md items-center px-2 py-1'
							>
								<MdEventSeat /> {car.seatingCapacity}
							</span>
							<span
								title='Loại nhiên liệu'
								className='bg-gray-400/20 inline-flex gap-2 rounded-md items-center px-2 py-1'
							>
								<BsFuelPump /> {fuelType}
							</span>
							{car.otherFeatures?.map((feature, index) => (
								<span
									key={index}
									title={feature}
									className='bg-gray-400/20 inline-flex gap-2 rounded-md items-center px-2 py-1'
								>
									<BiCheck /> {feature}
								</span>
							))}
						</div>
						<div>
							<Link
								href={`/cars/${car.id}`}
								className='group-hover:block hidden text-sky-500 hover:text-sky-600 transition-colors motion-preset-slide-right bg-gray-400/20 px-4 rounded-md text-sm md:text-base w-fit'
							>
								Xem chi tiết <BsArrowRight className='inline-block' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
