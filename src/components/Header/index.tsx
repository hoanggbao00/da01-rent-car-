'use client';
import { Box, Flex, Group } from '@mantine/core';
import React from 'react';
import { Logo } from './Logo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { NavigationMobile } from './NavigationMobile';
import { AuthButtons } from './AuthButtons';
import { usePathname } from 'next/navigation';
import classes from './Style.module.css';

interface Props {
	isAuthPage?: boolean;
}
export const Navbar = ({ isAuthPage }: Props) => {
	const pathname = usePathname();

	return (
		<Box className={classes.header}>
			<Group justify='space-between' h='100%'>
				<Logo />
				<Flex gap={16}>
					<Box visibleFrom='xs'>
						<ThemeSwitcher />
					</Box>
					{!isAuthPage && !pathname.includes('my-account') && (
						<Box visibleFrom='md'>
							<AuthButtons />
						</Box>
					)}
				</Flex>

				<NavigationMobile />
			</Group>
		</Box>
	);
};
