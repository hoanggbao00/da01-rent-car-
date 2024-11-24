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
					Đặt trọn niềm tin
				</h1>
				<p className='text-xl mb-8 text-center'>
					Hành trình trọn vẹn, Thuê xe dễ dàng, cuộc sống thênh thang
				</p>
				<div className='motion-preset-slide-right motion-duration-1000'>
					<Link href={'/cars'}>
						<button className='bg-sky-500 text-white px-6 py-2 rounded-md !flex items-center gap-2 hover:motion-preset-confetti hover:motion-duration-1000'>
							<BiCalendar /> Khám phá ngay
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
					<h1 className='text-5xl font-bold mb-4'>Đặt trọn niềm tin</h1>
					<p className='text-xl mb-8'>
						Hành trình trọn vẹn, Thuê xe dễ dàng, cuộc sống thênh thang
					</p>
					<div className='motion-preset-slide-right motion-duration-1500'>
						<Link href={'/cars'}>
							<button className='bg-sky-500 text-white px-6 py-2 rounded-md !flex items-center gap-2 hover:motion-preset-confetti hover:motion-duration-1000'>
								<BiCalendar /> Khám phá ngay
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
				<h2 className='text-4xl font-bold mb-8'>Dịch vụ</h2>
				<p className='text-gray-600 mb-8'>
					Chúng tôi mời bạn dùng thử dịch vụ của chúng tôi và chúng tôi đảm bảo
					rằng bạn sẽ hoàn toàn hài lòng
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{[
						{
							title: 'Đưa đón sân bay',
							image: DEFAULT_IMAGE,
							description:
								'Với kiến ​​thức về lĩnh vực này và nhiều năm kinh nghiệm, đội ngũ của chúng tôi có chuyên môn cao để đáp ứng mọi dịch vụ đưa đón sân bay.',
						},
						{
							title: 'Hành trình dài',
							image: DEFAULT_IMAGE,
							description:
								'Đồng hành cùng bạn với mọi nẻo đường trên toàn quốc.',
						},
						{
							title: 'Đám cưới',
							image: DEFAULT_IMAGE,
							description:
								'Dịch vụ thân thiện và chu đáo của chúng tôi sẽ hoàn thiện toàn bộ trải nghiệm trong ngày đặc biệt của bạn.',
						},
						{
							title: 'Gặp gỡ đối tác',
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
										Xem thêm
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Our Fleet Section (beginning) */}
			<section className='max-w-5xl mx-auto mt-16 p-4'>
				<h2 className='text-4xl font-bold mb-4'>Đội ngũ chúng tôi</h2>
				<p className='text-gray-600'>
					Chúng tôi cung cấp đội xe đa dạng bao gồm xe sedan, xe limousine...
				</p>
				{/* Fleet content would go here */}
			</section>
		</div>
	);
}
