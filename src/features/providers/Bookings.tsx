'use client';
import { StatusRenderer } from '@/components/StatusRenderer';
import { ghCurrency } from '@/const';
import { NOTIFICATION_MSG } from '@/consts';
import { useSupabase } from '@/context/SupabaseContext';
import { formatDate } from '@/functions';
import { BookingStatus } from '@/models/app';
import { IResBookingProps } from '@/models/res.model';
import {
	Avatar,
	Box,
	Card,
	Divider,
	Flex,
	Loader,
	Menu,
	Table,
	Text,
	Title,
	UnstyledButton,
} from '@mantine/core';
import {
	IconProgressCheck,
	IconSquareRoundedXFilled,
} from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
	providerId: string;
}

const header = (
	<Table.Tr>
		<Table.Th>Ngày yêu cầu</Table.Th>
		<Table.Th>Khách hàng</Table.Th>
		<Table.Th>Ngày lấy</Table.Th>
		<Table.Th>Ngày trả</Table.Th>
		<Table.Th>Giá</Table.Th>
		<Table.Th>Trạng thái</Table.Th>
	</Table.Tr>
);

export const Bookings = ({ providerId }: Props) => {
	const [bookings, setBookings] = useState<IResBookingProps[]>([]);
	const searchParams = useSearchParams();
	const carId = searchParams.get('car_id');
	const supabase = useSupabase();

	const rows = bookings?.map((item) => (
		<TableRow
			key={item.id}
			bookingId={item.id}
			providerId={providerId}
			carId={Number(carId)}
			dateBooked={new Date(item.created_at)}
			user={item.users}
			pickupDate={new Date(item.pickupDate)}
			returnDate={new Date(item.returnDate)}
			price={item.totalPrice.toLocaleString()}
			status={item.status as BookingStatus}
		/>
	));

	useEffect(() => {
		const fetchBookings = async () => {
			if (carId && !isNaN(Number(carId))) {
				let { data: bookings } = await supabase
					.from('bookings')
					.select('*, users(firstName, lastName, avatar), cars(make, model)')
					.match({ car_id: carId, provider_id: providerId })
					.order('created_at', { ascending: false });

				if (bookings) {
					setBookings(bookings as any);
				}
			}
		};

		fetchBookings();
	}, [carId, providerId, supabase]);

	return bookings.length > 0 ? (
		<Card my='3rem'>
			<Divider
				my='lg'
				label={
					<Title order={4} className='text-default' mb='lg'>
						Booking request for &quot;{bookings[0].cars?.make}{' '}
						{bookings[0].cars?.model}&quot; ({bookings.length})
					</Title>
				}
			/>

			<Box mah='310px' style={{ overflowY: 'auto' }}>
				<Table striped highlightOnHover>
					<Table.Thead>{header}</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Box>
		</Card>
	) : (
		carId && (
			<Card my='3rem'>
				<Text fs='italic' ta='center'>
					This car has no request
				</Text>
			</Card>
		)
	);
};

const bookingActions: {
	display: string;
	value: 'approve' | 'reject';
	color: string;
	icon: ReactNode;
}[] = [
	{
		display: 'Chấp thuận',
		value: 'approve',
		color: 'green',
		icon: <IconProgressCheck size={14} />,
	},
	{
		display: 'Từ chối',
		value: 'reject',
		color: 'red',
		icon: <IconSquareRoundedXFilled size={14} />,
	},
];

interface TableRowProps {
	bookingId: number;
	carId: number;
	providerId: string;
	dateBooked: Date;
	user: { firstName: string; lastName: string; avatar: string };
	pickupDate: Date;
	returnDate: Date;
	price: string | number;
	status: BookingStatus;
}
export const TableRow = ({
	bookingId,
	carId,
	providerId,
	dateBooked,
	user,
	pickupDate,
	returnDate,
	price,
	status: _status,
}: TableRowProps) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [status, setStatus] = useState(_status);
	const supabase = useSupabase();
	const { refresh } = useRouter();

	const handleUpdateBooking = async (value: 'approve' | 'reject') => {
		setIsUpdating(true);
		let bookingStatus = { status: 'pending' };
		let carStatus = { status: 'pending' };

		if (value === 'approve') {
			bookingStatus = {
				status: 'approved',
			};
			carStatus = {
				status: 'booked',
			};
		} else {
			bookingStatus = {
				status: 'rejected',
			};
			carStatus = {
				status: 'available',
			};
		}

		const { data: booking, error } = await supabase
			.from('bookings')
			.update(bookingStatus)
			.eq('id', bookingId)
			.select();

		if (error) {
			console.log(error);
			return;
		}

		const { data: car, error: error2 } = await supabase
			.from('cars')
			.update(carStatus)
			.eq('id', carId)
			.select();

		if (error2) {
			console.log(error2);
		} else {
			// set is read
			await supabase
				.from('users')
				.update({ is_read: true })
				.eq('id', booking[0].user_id!);

			let contentNotification = '';
			if (value === 'approve') {
				contentNotification = NOTIFICATION_MSG.BOOKING_APPROVED.key;
			} else if (value === 'reject') {
				contentNotification = NOTIFICATION_MSG.BOOKING_REJECTED.key;
			}

			// send notification
			await supabase.from('notifications').insert({
				content: contentNotification,
				entity_name: `${car[0].make} ${car[0].model}`,
				path: `/cars/${carId}`,
				receiver_id: booking[0].user_id!,
				transfer_id: providerId,
			});

			setStatus(carStatus.status as BookingStatus);
			toast.info('Yêu cầu thuê xe đã được cập nhật');
			setIsUpdating(false);
			setTimeout(() => {
				refresh();
			}, 1000);
		}
	};

	return (
		<Table.Tr>
			<Table.Td>{formatDate(dateBooked)}</Table.Td>
			<Table.Td>
				<Flex align='center' gap={4}>
					<Avatar size='sm' radius='xl' src={user.avatar} />
					<Text>{user.firstName}</Text>
				</Flex>
			</Table.Td>
			<Table.Td>{formatDate(pickupDate)}</Table.Td>
			<Table.Td>{formatDate(returnDate)}</Table.Td>
			<Table.Td>
				{ghCurrency} {price.toLocaleString()}
			</Table.Td>
			<Table.Td width='100px'>
				{status === 'pending' ? (
					<Menu shadow='md' width={200}>
						<Menu.Target>
							{isUpdating ? (
								<Loader size='xs' />
							) : (
								<UnstyledButton>
									<StatusRenderer status={status} />
								</UnstyledButton>
							)}
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Label>Thao tác</Menu.Label>

							{bookingActions.map((item) => (
								<Menu.Item
									key={item.value}
									onClick={() => handleUpdateBooking(item.value)}
									leftSection={item.icon}
									color={item.color}
								>
									{item.display}
								</Menu.Item>
							))}
						</Menu.Dropdown>
					</Menu>
				) : (
					<StatusRenderer status={status} />
				)}
			</Table.Td>
		</Table.Tr>
	);
};
