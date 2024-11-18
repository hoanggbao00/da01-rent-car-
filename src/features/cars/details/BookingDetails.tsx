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
import { useState } from 'react';
import { toast } from 'react-toastify';
import classes from './Styles.module.css';
import { useAuthContext } from '@/context/AuthContext';

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

	const [numOfDays, setNumOfDays] = useState<number | ''>(
		car.minimumRentalPeriodInDays
	);
	const [profileError, setProfileError] = useState<string | undefined>(
		undefined
	);
	const [triggered, setTriggered] = useState(false);
	const {
		state: { pickupDate, returnDate },
		setPickupDate,
		setReturnDate,
	} = useAppContext();

	const handleBookNow = async () => {
		if(isProvider) return
		setTriggered(true);

		if (!user?.firstName || !user.lastName || !user?.regions.name) {
			setProfileError(
				'Vui lòng cập nhật đầy đủ thông tin tài khoản để tiến hành thuê phương tiện.'
			);
			return;
		}

		if (!pickupDate || !returnDate) {
			return;
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
		<Card
			w={{ base: '100%', md: '350px', lg: '400px' }}
			withBorder
			className={classes.bookingContainer}
		>
			<Title order={4} mb='md' c='gray.6'>
				Thông tin đặt xe
			</Title>
			<Flex gap='sm' direction={{ base: 'column', sm: 'row' }}>
				<Box>
					<SelectDate
						value={pickupDate}
						label='Ngày lấy xe'
						minDate={today}
						onChange={setPickupDate}
					/>
					{triggered && !pickupDate && <Input.Error>Chọn ngày</Input.Error>}
				</Box>
				<Box>
					<SelectDate
						label='Ngày trả'
						value={returnDate}
						minDate={tomorrow}
						onChange={setReturnDate}
					/>
					{triggered && !returnDate && <Input.Error>Chọn ngày</Input.Error>}
				</Box>
			</Flex>

			<Box my='md'>
				<Title order={5} my='xs' className='text-muted'>
					Địa chỉ
				</Title>
				<Text size='sm' className='text-default'>
					{user?.regions.name || <Link href='/my-account/profile'>Add</Link>}
				</Text>
				{profileError && (
					<Notification
						icon={<IconX size='0.6rem' />}
						c='red'
						title='Thông báo'
					>
						{profileError}
						<Link href='/my-account/profile' style={{ display: 'block' }}>
							Nhấn vào đây để cập nhật
						</Link>
					</Notification>
				)}
			</Box>

			<Title order={5} my='xs' className='text-muted'>
				Thông tin hợp đồng
			</Title>
			<Box className={classes.rentalInfo} py='xs' px='md'>
				<Flex justify='space-between'>
					<Text className='text-default'>Số ngày thuê tối thiểu</Text>
					<Text className='text-default'>{car.minimumRentalPeriodInDays}</Text>
				</Flex>

				{car.maximumRentalPeriodInDays && (
					<Flex justify='space-between' py='sm'>
						<Text className='text-default'>Số ngày thuê tối đa</Text>
						<Text className='text-default'>
							{car.maximumRentalPeriodInDays}
						</Text>
					</Flex>
				)}

				<Flex justify='space-between'>
					<Text className='text-default'>Giá theo ngày</Text>
					<Text className='text-default'>
						{ghCurrency} {car.pricePerDay.toLocaleString()}
					</Text>
				</Flex>

				<Divider my='sm' />
				<Box>
					<Text className='text-default'>Số ngày</Text>
					<NumberInput
						min={car.minimumRentalPeriodInDays || undefined}
						max={car.maximumRentalPeriodInDays || undefined}
						value={numOfDays}
						onChange={(value) => setNumOfDays(Number(value))}
					/>
				</Box>

				<Divider my='md' />

				<Flex justify='space-between'>
					<Text className='text-default'>Tổng giá</Text>
					{numOfDays && (
						<Text fw='bold' className='text-default'>
							{(numOfDays * car.pricePerDay).toLocaleString()} {ghCurrency}
						</Text>
					)}
				</Flex>
			</Box>

			<Button
				w='100%'
				my='sm'
				disabled={car.status !== 'available' || isProvider}
				onClick={handleBookNow}
			>
				Gửi yêu cầu thuê
			</Button>
			{isProvider && (
				<Alert title='Thông báo' color='yellow'>
					Vui lòng chuyển sang tài khoản khách hàng để tiến hành đặt xe
				</Alert>
			)}
		</Card>
	);
};
