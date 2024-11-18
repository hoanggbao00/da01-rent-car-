import { StatusRenderer } from '@/components/StatusRenderer';
import { useSupabase } from '@/context/SupabaseContext';
import { CarStatus as CarStatusType } from '@/models/app';
import { Loader, Menu, UnstyledButton } from '@mantine/core';
import {
	IconCalendarCheck,
	IconHourglassLow,
	IconProgressCheck,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

const statuses: {
	display: string;
	value: CarStatusType;
	color: string;
	icon: ReactNode;
}[] = [
	{
		display: 'Khả dụng',
		value: 'available',
		color: 'green',
		icon: <IconProgressCheck size={14} />,
	},
	{
		display: 'Đang chờ duyệt',
		value: 'pending',
		color: 'gray.6',
		icon: <IconHourglassLow size={14} />,
	},
	{
		display: 'Đã được thuê',
		value: 'booked',
		color: 'red',
		icon: <IconCalendarCheck size={14} />,
	},
];

interface TableActionsProps {
	id: number;
	status: CarStatusType;
}

export function CarStatus({ status, id }: TableActionsProps) {
	const supabase = useSupabase();
	const { refresh } = useRouter();
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateStatus = async (selectedStatus: CarStatusType) => {
		if (status !== selectedStatus) {
			setIsUpdating(true);
			const { data, error } = await supabase
				.from('cars')
				.update({ status: selectedStatus })
				.eq('id', id)
				.select();

			setIsUpdating(false);

			if (data) {
				toast.success('Cập nhật trạng thái thành công.');
				refresh();
			}

			if (error) {
				toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
				console.log(error);
			}
		}
	};
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				{isUpdating ? (
					<Loader size='xs' />
				) : (
					<UnstyledButton>
						<StatusRenderer variant='light' status={status} />
					</UnstyledButton>
				)}
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Trạng thái</Menu.Label>

				{statuses.map((item) => (
					<Menu.Item
						key={item.value}
						onClick={() => handleUpdateStatus(item.value)}
						leftSection={item.icon}
						color={item.color}
					>
						{item.display}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
