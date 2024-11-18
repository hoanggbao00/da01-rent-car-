import { md, sm } from '@/const';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Styles.module.css';

interface Props {
  images: string[];
}

export const CarsCarousel = ({ images }: Props) => {
  const smScreen = useMediaQuery(`(min-width: ${sm})`);
  const mdScreen = useMediaQuery(`(min-width: ${md})`);

  return (
    <Carousel className={classes.carousel} withIndicators loop>
      {images.map((image) => (
        <Carousel.Slide key={image} mx="auto">
          <div
            style={{
              background: `center / cover no-repeat url(${image})`,
              height: mdScreen ? '400px' : smScreen ? '300px' : '200px',
              borderRadius: '6px',
            }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
