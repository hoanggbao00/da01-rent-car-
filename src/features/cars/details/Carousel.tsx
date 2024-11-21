import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Image } from '@mantine/core';

interface Props {
	images: string[];
}

export const CarsCarousel = ({ images }: Props) => {

	return (
		<Carousel
			className='absolute inset-0'
			withIndicators
			loop
			plugins={[Autoplay()]}
		>
			{images.map((image, index) => (
				<Carousel.Slide key={image} mx='auto'>
					<Image src={image} alt={`car-${index}`} className='w-full aspect-video !rounded-lg' />
				</Carousel.Slide>
			))}
		</Carousel>
	);
};
