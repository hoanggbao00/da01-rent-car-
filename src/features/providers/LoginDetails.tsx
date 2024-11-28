import { useAuthContext } from '@/context/AuthContext';
import { IReqProviderProps } from '@/models/req.model';
import { addProviderAsync } from '@/services/supabase.service';
import {
	Box,
	Button,
	Flex,
	Group,
	Input,
	LoadingOverlay,
	Notification,
	PasswordInput,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface Props {
	prev?: () => void;
	companyDetails: Partial<IReqProviderProps>;
	setCompanyDetails: Dispatch<SetStateAction<Partial<IReqProviderProps>>>;
}

export const LoginDetails = ({
	prev,
	companyDetails,
	setCompanyDetails,
}: Props) => {
	const { signupWithEmailPassword } = useAuthContext();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isCreate, setIsCreate] = useState(false);
	const [passwordError, setPasswordError] = useState<string | undefined>(
		undefined
	);

	const updateDetails = (key: keyof IReqProviderProps, value: any) => {
		setCompanyDetails((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleCreateProviderAccount = async () => {
		setIsCreate(true);

		if (!password) {
			setPasswordError('Vui lòng nhập mật khẩu');
		}

		if (password !== confirmPassword) {
			setPasswordError('Mật khẩu không khớp');
		}
		if (
			companyDetails.email &&
			/^\S+@\S+$/.test(companyDetails.email) &&
			password &&
			password === confirmPassword
		) {
			// sign provider up
			setIsSubmitting(true);
			const { data, error } = await signupWithEmailPassword(
				companyDetails.email,
				password,
				{
					role: 'provider',
				}
			);

			if (error) {
				console.log(error);
				return;
			}

			// add provider details to DB
			const { error: error2 } = await addProviderAsync({
				id: data.user?.id,
				businessRegistrationNumber: companyDetails.businessRegistrationNumber,
				avatar: companyDetails.avatar,
				companyName: companyDetails.companyName,
				email: companyDetails.email,
				contactName: companyDetails.contactName,
				phone: companyDetails.phone,
				region_code: companyDetails.region_code,
			} as IReqProviderProps);

			if (error2) {
				console.log(error);
			}

			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Flex gap='4rem'>
				<LoadingOverlay
					visible={isSubmitting}
					overlayProps={{ radius: 'sm', blur: 2 }}
				/>
				<Box style={{ flexGrow: 1 }}>
					<Title c='gray.6' mt='2rem'>
						Account Details
					</Title>
					<Space mt='2rem' />

					<Group grow>
						<Box>
							<Input.Label>Email</Input.Label>
							<Input
								type='email'
								placeholder='email@gmail.com'
								value={companyDetails.email}
								onChange={(event) =>
									updateDetails('email', event.currentTarget.value)
								}
							/>
							{isCreate && !companyDetails.email && (
								<Input.Error>Please enter your email</Input.Error>
							)}
						</Box>
					</Group>

					<Space mt='1rem' />
					<Group grow>
						<Box>
							<Input.Label>Password</Input.Label>
							<PasswordInput
								value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
								placeholder='xxxxxxxxxx'
							/>
						</Box>
						<Box>
							<Input.Label>Confirm Password</Input.Label>
							<PasswordInput
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.currentTarget.value)}
								placeholder='xxxxxxxxxx'
							/>
						</Box>
					</Group>
					{passwordError && (
						<Notification
							color='red'
							mt='sm'
							onClose={() => setPasswordError(undefined)}
						>
							{passwordError}
						</Notification>
					)}
					<Space mt='2rem' />
					<Flex justify='space-between'>
						<Button
							variant='subtle'
							onClick={prev}
							radius='xl'
							size='md'
							my='sm'
						>
							<BsArrowLeft />
							<Text ml='xs'>Back</Text>
						</Button>

						<Button
							onClick={handleCreateProviderAccount}
							radius='xl'
							size='md'
							my='sm'
						>
							<Text ml='xs'>Create Provider Account</Text>
						</Button>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};
