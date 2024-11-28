'use client';
import { Divider, Flex, Paper, Text, rem } from '@mantine/core';
import classes from './CarStats.module.css';
import { IResCarProps } from '@/models/res.model';
import { carTypes } from '@/components/SelectCarType';

interface Props {
	cars: IResCarProps[];
}

export function CarStats({ cars }: Props) {
	const carGroup =
		carTypes
			.map((carType) => ({
				label: carType.label,
				value: cars.filter((car) => car.type === carType.value).length,
			}))
			.filter((c) => c.value > 0) ?? [];

	return (
		<>
			<Divider my={16} mx={16} />
			<Flex wrap='wrap' gap={16} m={rem(16)} style={{ flex: 1 }}>
				{carGroup.map((stat) => (
					<Paper className={classes.statCard} key={stat.label} withBorder>
						<Text size='1.5rem' className={classes.title}>
							{stat.label}
						</Text>
						<div>
							<Text className={classes.label}>Quantity</Text>
							<Text fz='xs' className={classes.value}>
								{stat.value}
							</Text>
						</div>
					</Paper>
				))}
			</Flex>
		</>
	);
}
