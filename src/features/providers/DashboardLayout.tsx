'use client';
import { useAuthContext } from '@/context/AuthContext';
import { CarContextProvider } from '@/context/CarContext';
import { useProviderDetails } from '@/hooks/useProviderDetails';
import {
	ActionIcon,
	AppShell,
	Avatar,
	Burger,
	Flex,
	Stack,
	Text,
	rem,
	useMantineTheme,
} from '@mantine/core';
import {
	IconCar,
	IconDashboard,
	IconHome,
	IconMessage,
	IconUser,
} from '@tabler/icons-react';
import { ReactNode, useEffect, useState } from 'react';
import { MainLink } from './MainLink';
import { BiLogOutCircle } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationButton from '@/components/Notifications/NotificationButton';

const data = [
	{
		icon: <IconDashboard size='1rem' />,
		color: 'blue',
		label: 'Dashboard',
		endpoint: '/',
	},
	{
		icon: <IconCar size='1rem' />,
		color: 'violet',
		label: 'Vehicle Management',
		endpoint: 'cars',
	},
	{
		icon: <IconMessage size='1rem' />,
		color: 'orange',
		label: 'Reviews',
		endpoint: 'reviews',
	},
	{
		icon: <IconHome size='1rem' />,
		color: 'yellow',
		label: 'Homepage',
		endpoint: '../../cars',
	},
];

interface DashboardProps {
	children: ReactNode;
}
export const DashboardLayout = ({ children }: DashboardProps) => {
	const { user, logOut } = useAuthContext();
	const { notifications, is_read, isLoading } = useNotifications(
		user?.id || ''
	);

	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const { providerDetails } = useProviderDetails(user?.id);
	const router = useRouter();
	const [isRead, setIsRead] = useState(is_read ?? false);

	useEffect(() => {
		setIsRead(is_read ?? false);
	}, [is_read]);

	const handleSignOut = async () => {
		await logOut();
		router.push('/cars');
	};

	return (
		<CarContextProvider>
			<AppShell
				padding='md'
				header={{ height: 60 }}
				navbar={{
					width: 300,
					breakpoint: 'md',
					collapsed: { mobile: !opened },
				}}
			>
				<AppShell.Header>
					<Flex justify='space-between' align='center' px='md' h='100%'>
						<Flex align='center'>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size='sm'
								color={theme.colors.gray[6]}
								mr='xl'
								hiddenFrom='md'
							/>
							<Flex gap={8} align='center'>
								<Avatar src={providerDetails?.avatar} size='sm' radius='xl' />
								<Text fw='600' style={{ overflow: 'hidden' }}>
									{providerDetails?.companyName}
								</Text>
							</Flex>
						</Flex>

						{/* Thông báo */}
						<div className='flex items-center gap-2'>
							{user && (
								<NotificationButton
									notifications={notifications ?? []}
									userId={user?.id}
									is_read={isRead}
									setIsRead={setIsRead}
									isLoading={isLoading}
								/>
							)}
						</div>
					</Flex>
				</AppShell.Header>

				<AppShell.Navbar px='sm'>
					<AppShell.Section style={{ flex: 1 }}>
						<Stack mt='xs'>
							{data.map((item, i) => (
								<MainLink
									key={i}
									label={item.label}
									color={item.color}
									icon={item.icon}
									link={`/providers/${user?.id}/${item.endpoint}`}
								/>
							))}
						</Stack>
					</AppShell.Section>

					<AppShell.Section>
						<Flex
							align='center'
							onClick={handleSignOut}
							px={'xs'}
							py={'xs'}
							className='hover:bg-gray-500/10 rounded-md cursor-pointer'
						>
							<ActionIcon color='red'>
								<BiLogOutCircle size='1.2rem' />
							</ActionIcon>
							<Text
								size='sm'
								mx='xs'
								className='text-muted'
								style={{ cursor: 'pointer' }}
							>
								Log out
							</Text>
						</Flex>
						<MainLink
							label='Profile Settings'
							color='gray'
							icon={<IconUser size='1rem' />}
							link={`/providers/${user?.id}/my-account`}
						/>
					</AppShell.Section>
				</AppShell.Navbar>

				<AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
					{children}
				</AppShell.Main>
			</AppShell>
		</CarContextProvider>
	);
};
