import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

export const NotRegisteredAlert = () => {
	return (
		<Alert
			icon={<IconAlertCircle size='1rem' />}
			title='Không tìm thấy Email '
			color='red'
			my='sm'
		>
			Có vẻ như Email của bạn chưa được đăng ký trong hệ thống, vui lòng đăng ký
			mới.
		</Alert>
	);
};
