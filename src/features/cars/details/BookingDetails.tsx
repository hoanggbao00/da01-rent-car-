import { SelectDate } from '@/components/SelectDate';
import { ghCurrency, today, tomorrow } from '@/const';
import { useAppContext } from '@/context/AppContext';
import { useSupabase } from '@/context/SupabaseContext';
import { IResCarProps, IResUserProps } from '@/models/res.model';
import {
	Alert,
	Box,
	Button,
	Divider,
	Flex,
	Input,
	Notification,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/context/AuthContext';
import { NOTIFICATION_MSG } from '@/consts';

interface Props {
	car: IResCarProps;
	user: IResUserProps | null;
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

		if (!user?.firstName || !user.lastName || !user?.regions?.name) {
			setProfileError(
				'Please update your information before booking'
			);
			return;
		}

		if (!pickupDate || !returnDate) {
			return toast.warn('Please select dates before booking.');
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
				'You have already made a booking for this car.'
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

		// gửi Notice đến chủ xe
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
				'You have successfully made a booking for this car.'
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
						label='Pickup Date'
						minDate={today}
						onChange={setPickupDate}
					/>
					{triggered && !pickupDate && <Input.Error>Pick a date</Input.Error>}
				</Box>
				<Box w={{ base: '100%', md: '50%' }}>
					<SelectDate
						label='Return Date'
						value={returnDate}
						minDate={pickupDate ?? tomorrow}
						onChange={setReturnDate}
					/>
					{triggered && !returnDate && <Input.Error>Pick a date</Input.Error>}
				</Box>
			</Flex>
			<Divider my={12} />
			<ul className='space-y-2'>
				<li className='flex justify-between'>
					<span>Minium rental period</span>
					<span>{car.minimumRentalPeriodInDays}</span>
				</li>
				<li className='flex justify-between'>
					<span>Maximum rental period</span>
					<span>{car.maximumRentalPeriodInDays}</span>
				</li>
				<li className='flex justify-between'>
					<span>Total days</span>
					<span>{numOfDays} days</span>
				</li>
				<li className='flex justify-between'>
					<span>Price per day</span>
					<span>
						{car.pricePerDay.toLocaleString()} {ghCurrency}
					</span>
				</li>
			</ul>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold'>Total:</span>
				<span className='text-xl font-bold'>
					{(numOfDays * car.pricePerDay).toLocaleString()} {ghCurrency}
				</span>
			</div>
			<Button
				w='100%'
				my='sm'
				disabled={car.status !== 'available' || isProvider || !user}
				onClick={handleBookNow}
			>
				Sent Request
			</Button>
			{!user && (
				<Alert title='Notice' color='yellow' bg={'yellow.1'}>
					Please sign in to book this car
				</Alert>
			)}
			{profileError && (
				<Notification
					icon={<IconX size='0.6rem' />}
					c='red'
					title='Notice'
					bg='red.1'
					mb={6}
				>
					{profileError}
					<Link href='/my-account/profile' style={{ display: 'block' }}>
						Click here to update your profile
					</Link>
				</Notification>
			)}
			{isProvider && (
				<Alert title='Notice' color='yellow' bg={'yellow.1'}>
					Please switch to customer account to book this car
				</Alert>
			)}
		</div>
	);
};
