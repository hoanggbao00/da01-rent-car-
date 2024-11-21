'use client';

import { Card, Flex, Loader } from '@mantine/core';

export default function CarListSkeleton() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
			{Array(3)
				.fill(0)
				.map((_, index) => (
					<Card
						key={index}
						radius={'md'}
						bg={'gray.0'}
						className='flex flex-col gap-2'
					>
						<div className='w-1/3 h-4 bg-gray-200 animate-pulse rounded-md'></div>
						<div className='w-2/3 h-4 bg-gray-200 animate-pulse rounded-md'></div>
						<div className='w-full aspect-video bg-gray-200 animate-pulse rounded-md'></div>
					</Card>
				))}
			<Card
				key={4}
				radius={'md'}
				bg={'gray.0'}
				className='flex flex-col gap-2'
			>
				<div className='h-full w-full flex items-center justify-center flex-col gap-2 text-xl'>
					<Loader size={32} />
					Đang tải...
				</div>
			</Card>
		</div>
	);
}
