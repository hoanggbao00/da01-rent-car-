import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

export const NotRegisteredAlert = () => {
	return (
		<Alert
			icon={<IconAlertCircle size='1rem' />}
			title='Email hoặc mật khẩu không đúng'
			color='red'
			my='sm'
		>
			Vui lòng kiểm tra lại thông tin đăng nhập như Email và Mật khẩu của bạn!
		</Alert>
	);
};
