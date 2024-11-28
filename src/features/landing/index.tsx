import { DEFAULT_IMAGE } from '@/consts';
import { Image } from '@mantine/core';
import Link from 'next/link';
import { BiCalendar } from 'react-icons/bi';
import BookingFormLanding from './BookingForm';

export default function LandingPage() {
	return (
		<div className='bg-white md:px-10 px-4'>
			<div className='lg:hidden flex flex-col justify-center items-center p-8'>
				<h1 className='text-5xl font-bold mb-4 text-center'>
					Luxury Limo Hire
				</h1>
				<p className='text-xl mb-8 text-center'>
					We offer professional car rental & limousine services in our range of
					high-end vehicles
				</p>
				<div className='motion-preset-slide-right motion-duration-1000'>
					<Link href={'/cars'}>
						<button className='bg-sky-500 text-white px-6 py-2 rounded-md !flex items-center gap-2 hover:motion-preset-confetti hover:motion-duration-1000'>
							<BiCalendar /> Booking Now
						</button>
					</Link>
				</div>
			</div>

			{/* Hero Section */}
			<section className='relative w-full rounded-lg overflow-hidden'>
				<Image
					src={DEFAULT_IMAGE}
					alt='Hero Image'
					className='w-full aspect-video object-cover'
				/>
				<div className='absolute inset-0 flex-col pt-32 items-center p-8 text-white bg-black/20 hidden lg:flex'>
					<h1 className='text-5xl font-bold mb-4'>Luxury Limo Hire</h1>
					<p className='text-xl mb-8'>
						We offer professional car rental & limousine services in our range
						of high-end vehicles
					</p>
					<div className='motion-preset-slide-right motion-duration-1500'>
						<Link href={'/cars'}>
							<button className='bg-sky-500 text-white px-6 py-2 rounded-md !flex items-center gap-2 hover:motion-preset-confetti hover:motion-duration-1000'>
								<BiCalendar /> Booking Now
							</button>
						</Link>
					</div>
				</div>
				<section className='hidden md:block absolute right-[2%] top-1/3'>
					<BookingFormLanding />
				</section>
			</section>
			<section className='block md:hidden mt-4'>
				<BookingFormLanding />
			</section>

			{/* Services Section */}
			<section className='max-w-5xl mx-auto mt-16 p-4'>
				<h2 className='text-4xl font-bold mb-8'>Services</h2>
				<p className='text-gray-600 mb-8'>
					We invite you to try our services, and we guarantee that you will be
					completely satisfied
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{[
						{
							title: 'Airport transfers',

							image: DEFAULT_IMAGE,
							description:
								'With knowledge of the field and years of expertise, our team is specialized to meet every airport transfer is possible.',
						},
						{
							title: 'Intercity trips',

							image: DEFAULT_IMAGE,
							description:
								'Your transportation between cities with chauffeur on over the entire country.',
						},
						{
							title: 'Wedding events',

							image: DEFAULT_IMAGE,
							description:
								'Our friendly and attentive service completes the whole experience of your very special day.',
						},
						{
							title: 'Business Meeting',

							image: DEFAULT_IMAGE,
							description:
								'Hãy tập trung vào cuộc gặp với khách hàng và quên đi những thay đổi trên đường đi.',
						},
					].map((service, index) => (
						<div key={index} className='bg-gray-100 rounded-lg overflow-hidden'>
							<Image
								src={service.image}
								alt={service.title}
								width={300}
								height={200}
								className='w-full'
							/>
							<div className='p-4 flex flex-col justify-between'>
								<div>
									<h3 className='text-xl font-bold mb-2'>{service.title}</h3>
									<p className='text-gray-600 mb-4 line-clamp-3'>
										{service.description}
									</p>
								</div>
								<Link href={'/about-us'}>
									<button className='bg-sky-500 text-white px-4 hover:bg-sky-600 py-2 rounded-md'>
										Read More
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Our Fleet Section (beginning) */}
			<section className='max-w-5xl mx-auto mt-16 p-4'>
				<h2 className='text-4xl font-bold mb-4'>Our Fleet</h2>
				<p className='text-gray-600'>
					We offer an extensive fleet of vehicles including sedans, limousines
					and coaches
				</p>
				{/* Fleet content would go here */}
			</section>
		</div>
	);
}
