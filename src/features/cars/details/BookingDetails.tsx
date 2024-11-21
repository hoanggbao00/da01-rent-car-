import { SelectDate } from '@/components/SelectDate';
import { ghCurrency, today, tomorrow } from '@/const';
import { useAppContext } from '@/context/AppContext';
import { useSupabase } from '@/context/SupabaseContext';
import { IResCarProps } from '@/models/res.model';
import {
	Alert,
	Box,
	Button,
	Card,
	Divider,
	Flex,
	Input,
	Notification,
	NumberInput,
	Text,
	Title,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import classes from './Styles.module.css';
import { useAuthContext } from '@/context/AuthContext';
import { NOTIFICATION_MSG } from '@/consts';
import { BiCalendar } from 'react-icons/bi';

interface Props {
	car: IResCarProps;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		regions: { name: string };
	} | null;
}
export const BookingDetails = ({ car, user }: Props) => {
	const supabase = useSupabase();
	const { refresh } = useRouter();
	const { session } = useAuthContext();

	const isProvider = session?.user.user_metadata?.role === 'provider';

	const [profileError, setProfileError] = useState<string | undefined>(
		undefined
	);
	const [triggered, setTriggered] = useState(false);
	const {
		state: { pickupDate, returnDate },
		setPickupDate,
		setReturnDate,
	} = useAppContext();

	const numOfDays = useMemo(() => {
		if (pickupDate && returnDate) {
			const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			return diffDays;
		} else {
			return 0;
		}
	}, [pickupDate, returnDate]);

	const handleBookNow = async () => {
		if (isProvider) return;

		setTriggered(true);

		if (!user?.firstName || !user.lastName || !user?.regions.name) {
			setProfileError(
				'Vui lòng cập nhật đầy đủ thông tin tài khoản để tiến hành thuê phương tiện.'
			);
			return;
		}

		if (!pickupDate || !returnDate) {
			return toast.warn('Vui lòng nhập ngày nhận và trả phương tiện');
		}

		const { data: isExist } = await supabase
			.from('bookings')
			.select()
			.eq('user_id', user.id)
			.eq('car_id', car.id)
			.eq('status', 'pending')
			.single();

		if (isExist?.id) {
			return toast.warn(
				'Bạn đã tạo yêu cầu thuê xe này, vui lòng chờ phê duyệt.'
			);
		}

		const { error } = await supabase
			.from('bookings')
			.insert([
				{
					pickupDate: pickupDate as any,
					returnDate: returnDate as any,
					totalPrice: car.pricePerDay * Number(numOfDays),
					provider_id: car.provider_id,
					car_id: car.id,
					user_id: user.id,
					status: 'pending',
				},
			])
			.select();

		// Update user is_read
		await supabase
			.from('users')
			.update({ is_read: false })
			.eq('id', car.provider_id!);

		// gửi thông báo đến chủ xe
		await supabase.from('notifications').insert({
			content: NOTIFICATION_MSG.BOOKING_SENT.key,
			entity_name: `${car.make} ${car.model}`,
			path: `/cars/${car.id}`,
			receiver_id: car.provider_id!,
			transfer_id: user.id,
		});

		if (error) {
			console.log(error);
			return;
		}

		const { error: error2 } = await supabase
			.from('cars')
			.update({ status: 'pending' })
			.eq('id', car.id)
			.select();

		if (error2) {
			console.log(error2);
		} else {
			toast.success(
				'Yêu cầu thuê xe đã được gửi đi. Vui lòng đợi chủ xe duyệt'
			);
			setTimeout(() => {
				refresh();
			}, 500);
		}
	};

	return (
		<div className='bg-black/80 text-white p-6 rounded-lg shadow'>
			<Flex gap='sm' direction={{ base: 'column', sm: 'row' }}>
				<Box w={{ base: '100%', md: '50%' }}>
					<SelectDate
						value={pickupDate}
						label='Ngày lấy xe'
						minDate={today}
						onChange={setPickupDate}
					/>
					{triggered && !pickupDate && <Input.Error>Chọn ngày</Input.Error>}
				</Box>
				<Box w={{ base: '100%', md: '50%' }}>
					<SelectDate
						label='Ngày trả'
						value={returnDate}
						minDate={pickupDate ?? tomorrow}
						onChange={setReturnDate}
					/>
					{triggered && !returnDate && <Input.Error>Chọn ngày</Input.Error>}
				</Box>
			</Flex>
			<Divider my={12} />
			<ul className='space-y-2'>
				<li className='flex justify-between'>
					<span>Ngày thuê tối thiểu</span>
					<span>{car.minimumRentalPeriodInDays}</span>
				</li>
				<li className='flex justify-between'>
					<span>Ngày thuê tối đa</span>
					<span>{car.maximumRentalPeriodInDays}</span>
				</li>
				<li className='flex justify-between'>
					<span>Tổng ngày</span>
					<span>{numOfDays} ngày</span>
				</li>
				<li className='flex justify-between'>
					<span>Giá theo ngày</span>
					<span>
						{car.pricePerDay.toLocaleString()} {ghCurrency}
					</span>
				</li>
			</ul>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold'>Tổng giá dự kiến:</span>
				<span className='text-xl font-bold'>
					{(numOfDays * car.pricePerDay).toLocaleString()} {ghCurrency}
				</span>
			</div>
			<Button
				w='100%'
				my='sm'
				disabled={car.status !== 'available' || isProvider}
				onClick={handleBookNow}
			>
				Gửi yêu cầu thuê
			</Button>
			{profileError && (
				<Notification
					icon={<IconX size='0.6rem' />}
					c='red'
					title='Thông báo'
					bg='red.1'
					mb={6}
				>
					{profileError}
					<Link href='/my-account/profile' style={{ display: 'block' }}>
						Nhấn vào đây để cập nhật
					</Link>
				</Notification>
			)}
			{isProvider && (
				<Alert title='Thông báo' color='yellow' bg={'yellow.1'}>
					Vui lòng chuyển sang tài khoản khách hàng để tiến hành đặt xe
				</Alert>
			)}
		</div>
	);
};
