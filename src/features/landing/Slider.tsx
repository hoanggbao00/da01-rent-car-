'use client';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

const images = [
	'https://res.cloudinary.com/dicme7cio/image/upload/v1698793460/car-go-rentals/cars-1_zdwwnu.png',
	'https://res.cloudinary.com/dicme7cio/image/upload/v1698793460/car-go-rentals/cars-2_ygogni.png',
	'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1400&q=80',
];
export const Slider = () => {
	return (
		<Carousel
			withIndicators
			loop
			className='h-full'
			plugins={[Autoplay()]}
		>
			{images.map((image, index) => (
				<Carousel.Slide key={image} className='h-full'>
					<Image src={image} alt={`slider-${index}`} className='w-full aspect-video'/>
				</Carousel.Slide>
			))}
		</Carousel>
	);
};
