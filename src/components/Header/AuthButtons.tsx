'use client';
import {
	Avatar,
	Button,
	Flex,
	Group,
	Menu,
	UnstyledButton,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { ProfileMenu } from '../ProfileMenu';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { IoChevronDown } from 'react-icons/io5';


export const AuthButtons = () => {
	const smallScreen = useMediaQuery(`(max-width: 991px)`);
	const { session } = useAuthContext();

	return (
		<Group grow={smallScreen}>
			{!session ? (
				<Menu>
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
								src={''}
								radius='xl'
								size={'sm'}
								bg={'gray.3'}
								color={'white'}
							/>
							<IoChevronDown />
						</UnstyledButton>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item
							component={Link}
							href={'/login'}
							w={{ base: '300px', md: '150px' }}
						>
							Login
						</Menu.Item>
						<Menu.Item
							component={Link}
							href='/signup'
							w={{ base: '300px', md: '150px' }}
						>
							Sign Up
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			) : (
				<>
					<ProfileMenu />
				</>
			)}
		</Group>
	);
};
