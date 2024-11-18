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

export const Landing = () => {
	const title = 'Rent Your Dream Car Today';
	const titleLength = title.length;

	return (
		<div className='h-screen flex flex-col'>
			<main className='flex-grow relative'>
				<Image
					src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1400&q=80'
					alt='Car on the road'
					className='absolute inset-0 h-full'
				/>
				<div className='absolute inset-0 top-0 bg-black bg-opacity-50 flex items-center'>
					<Container size='lg'>
						<Stack className='max-w-2xl'>
							<Title
								order={1}
								className={`text-5xl font-bold text-white !motion-preset-typewriter-[25]`}
							>
								{title}
							</Title>
							<Text size='xl' color='white'>
								Explore our wide range of vehicles and find the perfect car for
								your next adventure.
							</Text>
							<Group>
								<Button
									component={Link}
									href='/cars'
									size='lg'
									leftSection={<FaSearch />}
									className='bg-primary hover:bg-primary/90 text-primary-foreground !motion-preset-slide-right !motion-duration-1000 hover:!motion-preset-confetti'
								>
									Khám phá
								</Button>
								<Button
									component={Link}
									href='/cars'
									variant='outline'
									size='lg'
									leftSection={<FaCalendarAlt />}
									className='border-white text-white hover:text-primary !motion-preset-slide-right !motion-duration-1000 motion-delay-500 hover:!motion-preset-confetti '
								>
									Thuê xe ngay
								</Button>
							</Group>
						</Stack>
					</Container>
				</div>
			</main>
		</div>
	);
};
