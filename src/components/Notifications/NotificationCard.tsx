import { IResNotificationProps } from '@/models/res.model';
import { Box, Text } from '@mantine/core';
import Link from 'next/link';

interface Props {
	notification: IResNotificationProps;
	content: string;
}

export default function NotificationCard({ notification, content }: Props) {
	return (
		<Box
			className='flex shadow-md p-2 rounded-md hover:bg-gray-400/20 transition-colors'
			component={Link}
			href={notification.path || ''}
		>
			<Text fw={500} lineClamp={2}>
				{notification.users?.firstName} {notification.users?.lastName}{' '}
				<span className='!font-normal text-muted'>{content}</span>{' '}
				{notification.entity_name}
			</Text>
		</Box>
	);
}
