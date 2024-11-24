'use client';
import React from 'react';
import { NavigationMobile } from './NavigationMobile';
import { AuthButtons } from './AuthButtons';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '@/consts';
import Link from 'next/link';

interface Props {
	isAuthPage?: boolean;
}
export const ROUTES = [
	{
		name: 'Trang chủ',
		path: '/',
	},
	{
		name: 'Phương tiện',
		path: '/cars',
	},
	{
		name: 'Về chúng tôi',
		path: '/about-us',
	},
];

export const Navbar = ({ isAuthPage }: Props) => {
	const pathname = usePathname();

	return (
		<header className='flex items-center justify-between p-4 md:px-10 fixed top-0 inset-x-0 z-50 bg-white'>
			<Link href={'/'} className='text-2xl font-bold'>
				{APP_NAME}
			</Link>
			<nav className='hidden md:block'>
				<ul className='flex space-x-4'>
					{ROUTES.map((route) => (
						<li
							key={route.name}
							className={`${
								pathname === route.path ? 'text-sky-500 font-semibold' : ''
							} hover:text-sky-500 transition-colors flex flex-col overflow-hidden group`}
						>
							<Link href={route.path}>{route.name}</Link>
							<div
								className={`h-0.5 w-full bg-sky-500 transition-all translate-y-[105%] group-hover:translate-y-0 ${
									pathname === route.path ? 'translate-y-0' : ''
								} ${pathname === '/' ? 'hidden' : ''}`}
							/>
						</li>
					))}
				</ul>
			</nav>
			<div className='flex items-center space-x-2'>
				<div className='hidden md:block'>{!isAuthPage && <AuthButtons />}</div>
				<NavigationMobile />
			</div>
		</header>
	);
};
