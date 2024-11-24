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
				<h2 className='text-4xl font-bold mb-4'>Lý do chọn chúng tôi</h2>
				<p className='text-gray-600 mb-8'>
					Tại {APP_NAME} chúng tôi tự hào trong việc cung cấp các dịch vụ phong
					phú cho đáp ứng mọi nhu cầu của bạn với dịch vụ chăm sóc khách hàng
					tốt nhất.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{[
						{
							title: 'Vị trí linh hoạt',
							icon: <BsBank size={86} color='white' />,
							description: '',
						},
						{
							title: 'Thủ tục nhanh gọn',
							icon: <SiTaxbuzz size={86} color='white' />,
							description: '',
						},
						{
							title: 'Da dạng phương tiện',
							icon: <BiCar size={86} color='white' />,
							description: '*',
						},
						{
							title: 'Chính sách hậu mãi',
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
						Chỉ với 500.000{ghCurrency}/ngày
					</h2>
					<p className='text-gray-600 mb-8'>
						Tận dụng những ưu đãi hấp dẫn của chúng tôi, tiết kiệm một khoản
						đáng kể khi thuê xe limousine.
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
							<li>✓ Lên tới 8 chỗ ngồi</li>
							<li>✓ Hệ thống âm thanh sống động</li>
							<li>✓ Ánh sáng xịn</li>
							<li>✓ Chế độ sang trọng</li>
							<li>✓ Thể hiện đẳng cấp của bạn</li>
							<li>✓ Tiết kiệm chi phí</li>
							<li>✓ Thư giãn với âm nhạc</li>
						</ul>
						<button className='bg-sky-500 hover:bg-sky-600 transition-colors text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center w-full'>
							<BiCalendar /> Liên hệ ngay
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-black text-white py-8'>
				<div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div>
						<div className='text-2xl font-bold mb-4'>{APP_NAME}</div>
						<div className='flex items-center space-x-2'>
							<CgMail className='w-5 h-5' />
							<input
								type='email'
								placeholder='Nhận thông báo email'
								className='bg-gray-800 text-white p-2 rounded'
							/>
						</div>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Thành phố phổ biến</h4>
						<ul className='space-y-1'>
							<li>Thành phố Hà Nội</li>
							<li>Thành phố Hồ Chí Minh</li>
							<li>Los Angeles</li>
							<li>Paris</li>
						</ul>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Khám phá</h4>
						<ul className='space-y-1'>
							<li>Dịch vụ thuê xe</li>
							<li>Dịch vụ hẫu mãi</li>
							<li>Dịch vụ bí mật</li>
							<li>Thủ tục hành chính</li>
						</ul>
					</div>
					<div>
						<h4 className='font-bold mb-2'>Tuyển dụng</h4>
						<ul className='space-y-1'>
							<li>Chi nhánh Hà Nội</li>
							<li>Chi nhánh Hồ Chí Minh</li>
							<li>Chi nhánh Los Angeles</li>
							<li>Chi nhánh Paris</li>
						</ul>
					</div>
				</div>
				<div className='text-center mt-8'>
					<p>&copy; 2024 {APP_NAME}</p>
					<div className='flex justify-center space-x-4 mt-4'>
						<a href='#' className='hover:underline'>
							Chính sách
						</a>
						<a href='#' className='hover:underline'>
							Điều khoản
						</a>
						<a href='#' className='hover:underline'>
							Pháp lý
						</a>
						
					</div>
				</div>
			</footer>
		</div>
	);
}
