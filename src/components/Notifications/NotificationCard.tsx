import { formatDate } from '@/functions';
import { IResNotificationProps } from '@/models/res.model';
import { Badge, Box, Flex, Text } from '@mantine/core';
import Link from 'next/link';

interface Props {
	notification: IResNotificationProps;
	content: string;
}

export default function NotificationCard({ notification, content }: Props) {
	const isNew =
		new Date(notification.created_at).getDate() === new Date().getDate();

	const isYesterday =
		new Date(notification.created_at).getDate() === new Date().getDate() - 1;
		
	return (
		<Box
			className='flex shadow-md p-2 rounded-md hover:bg-gray-400/20 transition-colors'
			component={Link}
			href={notification.path || ''}
		>
			<Flex direction='column' gap={4}>
				<div className='flex gap-2 items-center'>
					{(isNew || isYesterday) && (
						<Badge color={isNew ? 'green' : 'gray'} size='xs' radius='xl'>
							{isYesterday ? 'Hôm qua' : 'Mới đây'}
						</Badge>
					)}
					<p className='text-gray-500 text-xs'>
						{formatDate(notification.created_at)}
					</p>
				</div>
				<Text fw={500} lineClamp={2}>
					{notification.users?.firstName} {notification.users?.lastName}{' '}
					<span className='!font-normal text-muted'>{content}</span>{' '}
					{notification.entity_name}
				</Text>
			</Flex>
		</Box>
	);
}
