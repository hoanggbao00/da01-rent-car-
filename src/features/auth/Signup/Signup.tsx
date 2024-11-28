'use client';
import { Logo } from '@/components/Header/Logo';
import { useAuthContext } from '@/context/AuthContext';
import {
	Anchor,
	Box,
	Button,
	Divider,
	Group,
	LoadingOverlay,
	Paper,
	Text,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { OAuthButtons } from '../OAuthButtons';
import { AuthDetails } from './AuthDetails';
import { useSignupForm } from './useSignupForm';

export function Signup() {
	const signupForm = useSignupForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { signupWithEmailPassword } = useAuthContext();

	const handleSignUp = async () => {
		const { email, password } = signupForm.values;

		setIsSubmitting(true);
		const { error } = await signupWithEmailPassword(email, password);

		if (error) {
			toast.error('Something went wrong!');
			setIsSubmitting(false);
		} else {
			setIsSubmitting(false);
			toast.success('Sign up successfully!');
		}
	};

	return (
		<>
			{
				<>
					<LoadingOverlay
						visible={isSubmitting}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<Box px='md' py='xl'>
						<Paper maw='450px' radius='md' p='xl' mx='auto' my='xl' withBorder>
							<Text size='lg' fw={500}>
								Welcome to <Logo />
							</Text>
							<OAuthButtons />
							<Divider
								label='Or continue with email'
								labelPosition='center'
								my='md'
							/>

							<form onSubmit={signupForm.onSubmit(() => handleSignUp())}>
								<AuthDetails form={signupForm} />
								<FormSubmitSection label='Sign Up' />
							</form>

							<Group mt='xl'>
								<Anchor
									component={Link}
									href='/providers'
									type='button'
									color='dimmed'
									size='xs'
								>
									Become a provider
								</Anchor>
							</Group>
						</Paper>
					</Box>
				</>
			}
		</>
	);
}

export const FormSubmitSection = ({ label }: { label: string }) => {
	return (
		<Group justify='apart' mt='xl' style={{ flexDirection: 'column' }}>
			<Button type='submit' radius='xl'>
				{label}
			</Button>
			<Anchor component={Link} href='/login' type='button' c='dimmed' size='xs'>
				Already have an account? Sign in
			</Anchor>
		</Group>
	);
};
