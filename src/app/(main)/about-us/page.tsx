import { ghCurrency } from '@/const';
import { APP_NAME, DEFAULT_IMAGE } from '@/consts';
import { Image } from '@mantine/core';
import { BiCalendar, BiCar } from 'react-icons/bi';
import { BsBank } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';
import { GiPayMoney } from 'react-icons/gi';
import { SiTaxbuzz } from 'react-icons/si';

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-white'>
			{/* Why Choose Us Section */}
			<section className='max-w-5xl mx-auto p-8'>
				<h2 className='text-4xl font-bold mb-4'>Why Choose Us</h2>
				<p className='text-gray-600 mb-8'>
					At {APP_NAME} we pride ourselves in delivering extensive services to
					fulfill all of your needs with first-rate customer care.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{[
						{
							title: 'Easy Online Booking',
							icon: <BsBank size={86} color='white' />,
							description: '',
						},
						{
							title: 'Quick Procedure',
							icon: <SiTaxbuzz size={86} color='white' />,
							description: '',
						},
						{
							title: 'Variety of Vehicles',
							icon: <BiCar size={86} color='white' />,
							description: '*',
						},
						{
							title: '24/7 Support',
							icon: <GiPayMoney size={86} color='white' />,
							description: '',
						},
					].map((feature, index) => (
						<div key={index} className='text-center'>
							<div className='w-full aspect-square bg-green-300 rounded-lg flex items-center justify-center mb-4'>
								{feature.icon}
							</div>
							<h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
							<p className='text-gray-600'>{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Special Offer Section */}
			<section className='bg-gray-100 py-16'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-4xl font-bold mb-4'>
						Only 500.000{ghCurrency}/day
					</h2>
					<p className='text-gray-600 mb-8'>
						Take advantage of our hot offers, saving a significant amount when
						renting a limousine.
					</p>
					<Image
						src={DEFAULT_IMAGE}
						alt='Cadillac Escalade'
						width={600}
						height={300}
						className='mx-auto mb-4 !rounded-lg'
					/>
					<div className='bg-white p-6 rounded-lg shadow-lg'>
						<h3 className='text-2xl font-bold mb-4'>Cadillac Escalade</h3>
						<ul className='text-left space-y-2 mb-4'>
						<li>✓ For Up to 8 Passengers</li>
							<li>✓ Incredible Sound System</li>
							<li>✓ Fiber Optic Lights</li>
							<li>✓ Bar Area With Fridge</li>
							<li>✓ Tinted Windows</li>
							<li>✓ Divider With Premium Style</li>
							<li>✓ Multipurpose Designed Limo</li>
							<li>✓ Chill Air Conditioning</li>
						</ul>
						<button className='bg-sky-500 hover:bg-sky-600 transition-colors text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center w-full'>
							<BiCalendar /> Book Now
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-black text-white py-8 text-center'>
				<div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div>
						<div className='text-2xl font-bold mb-4'>{APP_NAME}</div>
						<div className='flex items-center space-x-2 w-fit mx-auto'>
							<CgMail className='w-5 h-5' />
							<input
								type='email'
								placeholder='Enter your email'
								className='bg-gray-800 text-white p-2 rounded'
							/>
						</div>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Top cities</h4>
						<ul className='space-y-1'>
							<li>Ha Noi</li>
							<li>Ho Chi Minh</li>
							<li>Los Angeles</li>
							<li>Paris</li>
						</ul>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Explore</h4>
						<ul className='space-y-1'>
						<li>Intercity rides</li>
							<li>Limousine service</li>
							<li>Chauffeur service</li>
							<li>Private car service</li>
							<li>Airport transfer</li>
						</ul>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Talent</h4>
						<ul className='space-y-1'>
							<li>Ha Noi</li>
							<li>Ho Chi Minh</li>
							<li>Los Angeles</li>
							<li>Paris</li>
						</ul>
					</div>
				</div>
				<div className='text-center mt-8'>
					<p>&copy; 2024 {APP_NAME}</p>
					<div className='flex justify-center space-x-4 mt-4'>
						<a href='#' className='hover:underline'>
							Privacy Policy
						</a>
						<a href='#' className='hover:underline'>
							Legal Notice
						</a>
						<a href='#' className='hover:underline'>
							Accessibility
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
