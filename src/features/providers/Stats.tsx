'use client';
import { getProviderStats } from '@/actions/providers.actions';
import {
	Group,
	Loader,
	Paper,
	SimpleGrid,
	Text,
	rem,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import {
	IconAlertCircle,
	IconCar,
	IconMessage2,
	IconUsers,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const defaultData = [
	{
		key: 'bookings',
		title: 'Request Pending',
		icon: <IconAlertCircle color='green'/>,
		value: 0,
		color: 'green',
		path: 'cars'
	},
	{
		key: 'cars',
		title: 'Number of cars',
		icon: <IconCar color='orange'/>,
		value: 0,
		color: 'orange',
		path: 'cars'
	},

	{
		key: 'reviews',
		title: 'Number of reviews',
		icon: <IconMessage2 color='indigo'/>,
		value: 0,
		color: 'indigo',
		path: 'reviews'
	},

	{
		key: 'users',
		title: 'Customers',
		icon: <IconUsers color='red'/>,
		value: 0,
		color: 'red',
		path: 'cars'
	},
];

interface Props {
	providerId: string;
}

export function StatsGrid({ providerId }: Props) {
	const [data, setData] = useState(defaultData);
	const [loading, setLoading] = useState(true);

	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
	useEffect(() => {
		const fetchStats = async () => {
			const _ = await getProviderStats(providerId);
			const newData = defaultData.map((stat) => {
				return {
					...stat,
					value: _[stat.key as keyof typeof _],
				};
			});

			setLoading(false);
			setData(newData);
		};
		if (providerId) {
			fetchStats();
		}
	}, [providerId]);

	const stats = data.map((stat) => {
		return (
			<Paper
				withBorder
				p='md'
				radius='md'
				key={stat.title}
				bg={`${stat.color}.1`}
				style={{
					borderColor: stat.color,
				}}
			>
				<Group justify='space-between'>
					<Text
						size='xs'
						c={`${stat.color}.8`}
						style={{
							fontWeight: 700,
							textTransform: 'uppercase',
						}}
					>
						{stat.title}
					</Text>
					<div
						style={{
							display: 'inline-block',
							color:
								colorScheme === 'dark'
									? theme.colors.dark[3]
									: theme.colors.gray[4],
						}}
					>
						{stat.icon}
					</div>
				</Group>

				<Group align='flex-end' gap='xs' mt={25}>
					<Text
						style={{
							fontSize: rem(24),
							fontWeight: 700,
							lineHeight: 1,
						}}
					>
						{loading ? <Loader /> : stat.value}
					</Text>
				</Group>
			</Paper>
		);
	});
	return (
		<div style={{ padding: rem(16) }}>
			<SimpleGrid
				cols={{ base: 1, md: 2, lg: 4 }}
				spacing={{ base: 8, sm: 'lg' }}
			>
				{stats}
			</SimpleGrid>
		</div>
	);
}
