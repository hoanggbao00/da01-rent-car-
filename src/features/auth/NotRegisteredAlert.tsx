import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

export const NotRegisteredAlert = () => {
	return (
		<Alert
			icon={<IconAlertCircle size='1rem' />}
			title='Email or password is incorrect'
			color='red'
			my='sm'
		>
			Please check your email and password
		</Alert>
	);
};
