'use client';
import {
	Button,
	Container,
	Title,
	Text,
	Group,
	Stack,
	Image,
} from '@mantine/core';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { Slider } from './Slider';

export const Landing = () => {
	const title = 'Rent Your Dream Car Today';

	return (
		<div className='flex flex-col h-[calc(100vh-60px)] relative'>
			<main>
				<Slider />
				<div className='absolute inset-0 top-0 bg-black bg-opacity-50 flex items-center'>
					<Stack w={{ base: '90%', md: '60%' }} mx={'auto'}>
						<Title
							order={2}
							className={`md:!text-6xl text-4xl font-bold text-white !motion-preset-typewriter-[25]`}
						>
							{title}
						</Title>
						<Text size='lg' color='white'>
							Explore our wide range of vehicles and find the perfect car for
							your next adventure.
						</Text>
						<Group>
							<div className='motion-preset-slide-right motion-duration-1000'>
								<Button
									component={Link}
									href='/cars'
									size='lg'
									leftSection={<FaSearch />}
									className='bg-primary hover:bg-primary/90 text-primary-foreground hover:!motion-preset-confetti motion-duration-1000'
								>
									Khám phá
								</Button>
							</div>
							<div className='motion-preset-slide-right motion-duration-1000 motion-delay-500'>
								<Button
									component={Link}
									href='/cars'
									variant='outline'
									size='lg'
									leftSection={<FaCalendarAlt />}
									className='!border-white !text-white hover:text-primary hover:!motion-preset-confetti motion-duration-1000'
								>
									Thuê xe ngay
								</Button>
							</div>
						</Group>
					</Stack>
				</div>
			</main>
		</div>
	);
};
