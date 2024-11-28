'use client';
import { useAuthContext } from '@/context/AuthContext';
import { useSupabase } from '@/context/SupabaseContext';
import { Avatar, Flex, Menu, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IoCarSportSharp, IoChevronDown } from 'react-icons/io5';
import { toast } from 'react-toastify';
export function ProfileMenu() {
	const [avatar, setAvatar] = useState('');
	const { logOut, user, session } = useAuthContext();
	const supabase = useSupabase();

	const isProvider = session?.user?.user_metadata?.role === 'provider';

	const handleSignOut = async () => {
		await logOut();
		toast.success('Log out successfully');
	};

	useEffect(() => {
		const loadUserAvatar = async () => {
			if (user) {
				const { data } = await supabase
					.from('users')
					.select('avatar')
					.eq('id', user.id)
					.single();

				setAvatar(data?.avatar || '');
			}
		};

		loadUserAvatar();
	}, [supabase, user]);

	return (
		<Menu shadow='md' width={300}>
			<Menu.Target>
				<UnstyledButton
					component={Flex}
					align='center'
					gap={8}
					variant='subtle'
					p={4}
					px={8}
					justify={'space-between'}
					className='rounded-full !bg-gray-400/20'
				>
					<Avatar
						src={avatar}
						radius='xl'
						size={'sm'}
						bg={'gray.3'}
						color={'white'}
					/>
					<IoChevronDown />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					<Text lineClamp={1}>{user?.email}</Text>
				</Menu.Label>
				<Menu.Item
					component={Link}
					href={isProvider ? `/providers/${user?.id}` : '/my-account/profile'}
					leftSection={<CgProfile size='0.8rem' />}
				>
					{isProvider ? 'Vehicle provider' : 'Profiles'}
				</Menu.Item>
				{!isProvider && (
					<Menu.Item
						component={Link}
						href='/my-account/bookings'
						leftSection={<IoCarSportSharp size='0.8rem' />}
					>
						Bookings History
					</Menu.Item>
				)}
				<Menu.Divider />
				<Menu.Item
					component='button'
					type='button'
					role='button'
					onClick={handleSignOut}
					color='red'
					leftSection={<BiLogOutCircle size='1rem' />}
				>
					Log out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
