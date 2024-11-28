'use client';
import { NOTIFICATION_MSG } from '@/consts';
import { IResNotificationProps } from '@/models/res.model';
import { Button, Divider, Loader, Popover, Text, Title } from '@mantine/core';
import { BiBell } from 'react-icons/bi';
import NotificationCard from './NotificationCard';
import { handleReadNotification } from '@/actions/notifications.action';

interface Props {
	notifications: IResNotificationProps[];
	is_read: boolean | null;
	userId: string;
	setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
}

export default function NotificationButton({
	notifications,
	is_read,
	userId,
	setIsRead,
	isLoading,
}: Props) {
	
	const onReadNotification = async () => {
		await handleReadNotification(userId);
		setIsRead(true);
	};

	return (
		<Popover width={400} position='bottom-end' withArrow shadow='md'>
			<Popover.Target>
				<button className='p-2 bg-gray-500/20 rounded-md hover:bg-gray-400 transition-color relative'>
					<BiBell color='dodgerblue' />
					{!is_read && (
						<div className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping' />
					)}
				</button>
			</Popover.Target>
			<Popover.Dropdown className='!p-2'>
				<Title order={4} className='flex items-center justify-between'>
					Notifications
					<Button onClick={onReadNotification} size='xs' variant='outline'>
						Mark as read
					</Button>
				</Title>
				<Divider className='my-2' />
				<div className='flex flex-col gap-2 md:max-h-[50vh] overflow-y-auto'>
					{isLoading && (
						<div className='size-full flex items-center justify-center'>
							<Loader size={'md'} />
						</div>
					)}
					{!isLoading && notifications.length === 0 && (
						<Text size='xl' className='w-full text-center'>
							No Notifications
						</Text>
					)}
					{!isLoading && notifications.map((notification) => (
						<NotificationCard
							key={notification.id}
							notification={notification}
							content={
								NOTIFICATION_MSG[
									notification.content as keyof typeof NOTIFICATION_MSG
								].title
							}
						/>
					))}
					<div className='mb-0.5' />
				</div>
			</Popover.Dropdown>
		</Popover>
	);
}
