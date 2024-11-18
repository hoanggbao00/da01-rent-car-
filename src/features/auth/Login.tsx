'use client';

import { useAuthContext } from '@/context/AuthContext';
import {
	Anchor,
	Box,
	Button,
	Divider,
	Group,
	LoadingOverlay,
	Paper,
	PaperProps,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NotRegisteredAlert } from './NotRegisteredAlert';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useRouter } from 'next/navigation';
import { OAuthButtons } from './OAuthButtons';

const errorMessage = 'Invalid login credentials';

export function Login(props: PaperProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [notRegistered, setNotRegistered] = useState(false);
	const [loading, setLoading] = useState(false);
	const form = useLoginForm();
	const { push } = useRouter();
	const { logInWithEmailPassword } = useAuthContext();

	const handleLogin = async () => {
		setLoading(true);
		setIsSubmitting(true);
		const { email, password } = form.values;

		try {
			const { error, data } = await logInWithEmailPassword(email, password);
			setIsSubmitting(false);
			if (error && error?.message === errorMessage) {
				setNotRegistered(true);
			} else {
				if (data.user || data.session) {
					toast.success('Đăng nhập thành công', {
						position: toast.POSITION.TOP_CENTER,
					});
					form.reset();
					setNotRegistered(false);

					if (
						data.user?.user_metadata.role &&
						data.user?.user_metadata.role === 'provider'
					) {
						push(`/providers/${data.user?.id}`);
						return;
					}
					push('/');
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box px='md' py='xl'>
			<Paper
				maw='450px'
				radius='sm'
				w='100%'
				p='xl'
				my='xl'
				mx='auto'
				withBorder
				{...props}
			>
				<LoadingOverlay
					visible={isSubmitting || loading}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<Text size='lg' fw={500}>
					Xin chào,
				</Text>
				<OAuthButtons />
				<Divider
					label='Hoặc tiếp tục bằng Email'
					labelPosition='center'
					my='lg'
				/>

				<form onSubmit={form.onSubmit(() => handleLogin())}>
					<Stack>
						<TextInput
							required
							label='Email'
							placeholder='email@gmail.com'
							value={form.values.email}
							onChange={(event) =>
								form.setFieldValue('email', event.currentTarget.value)
							}
							error={form.errors.email && 'Email không hợp lệ'}
							radius='md'
						/>

						<PasswordInput
							required
							label='Mật khẩu'
							placeholder='Mật khẩu của bạn'
							value={form.values.password}
							onChange={(event) =>
								form.setFieldValue('password', event.currentTarget.value)
							}
							error={
								form.errors.password && 'Độ dài mật khẩu dài ít nhất 6 ký tự'
							}
							radius='md'
						/>
					</Stack>

					{notRegistered && <NotRegisteredAlert />}

					<Group justify='apart' mt='xl' style={{ flexDirection: 'column' }}>
						<Button type='submit' radius='xl'>
							Đăng nhập
						</Button>
						<Anchor
							component={Link}
							href='/signup'
							type='button'
							c='dimmed'
							size='xs'
						>
							Chưa có tài khoản? Đăng ký mới ngay.
						</Anchor>
					</Group>
				</form>
			</Paper>
		</Box>
	);
}
