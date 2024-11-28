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
	const [isPushing, setPushing] = useState(false);

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
					toast.success('Login successfully', {
						position: toast.POSITION.TOP_CENTER,
					});
					form.reset();
					setNotRegistered(false);

					if (
						data.user?.user_metadata.role &&
						data.user?.user_metadata.role === 'provider'
					) {
						setPushing(true);
						push(`/providers/${data.user.id}`);
						return;
					}

					setPushing(true);
					push('/cars');
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
					visible={isSubmitting || loading || isPushing}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<Text size='lg' fw={500}>
					Hello,
				</Text>
				<OAuthButtons />
				<Divider
					label='Or continue with email'
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
							error={form.errors.email && 'Email is invalid'}
							radius='md'
						/>

						<PasswordInput
							required
							label='Password'
							value={form.values.password}
							onChange={(event) =>
								form.setFieldValue('password', event.currentTarget.value)
							}
							error={
								form.errors.password && 'Password must be at least 6 characters'
							}
							radius='md'
						/>
					</Stack>

					{notRegistered && <NotRegisteredAlert />}

					<Group justify='apart' mt='xl' style={{ flexDirection: 'column' }}>
						<Button type='submit' radius='xl'>
							Log in
						</Button>
						<Anchor
							component={Link}
							href='/signup'
							type='button'
							c='dimmed'
							size='xs'
						>
							Has no account? Sign up
						</Anchor>
					</Group>
				</form>
			</Paper>
		</Box>
	);
}
