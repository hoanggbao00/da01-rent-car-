import { Burger, Divider, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AuthButtons } from './AuthButtons';
import { Logo } from './Logo';
import classes from './Style.module.css';
import { ThemeSwitcher } from './ThemeSwitcher';
import NotificationButton from '../Notifications/NotificationButton';
import { useAuthContext } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useEffect, useState } from 'react';

export const NavigationMobile = () => {
	const [opened, { close, toggle }] = useDisclosure(false);
	const { session } = useAuthContext();
	const { notifications, is_read, isLoading } = useNotifications(session?.user.id);
	const [isRead, setIsRead] = useState(is_read ?? true);

	useEffect(() => {
		setIsRead(is_read ?? true);
	}, [isRead]);

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title={<Logo />}
				size='xs'
				pos='relative'
				hiddenFrom='md'
				// without this prop, opening the drawer in prod will throw a client side exception
				transitionProps={{
					transition: 'slide-right',
				}}
			>
				<Divider my='sm' className={classes.divider} />
				<AuthButtons />
			</Drawer>
			<Flex gap={8}>
				<ThemeSwitcher />
				{session && (
					<NotificationButton
						notifications={notifications ?? []}
						is_read={isRead}
						userId={session.user.id}
						setIsRead={setIsRead}
						isLoading={isLoading}
					/>
				)}
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom='md'
					size={'sm'}
					className='!bg-gray-400/20 rounded-md'
					mt={2}
				/>
			</Flex>
		</>
	);
};
