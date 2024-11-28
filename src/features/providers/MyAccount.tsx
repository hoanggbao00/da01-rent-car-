'use client';
import { useAuthContext } from '@/context/AuthContext';
import { IReqProviderProps } from '@/models/req.model';
import { IResProviderProps } from '@/models/res.model';
import { updateProviderAsync } from '@/services/supabase.service';
import {
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Input,
	PasswordInput,
	Text,
	Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CompanyDetails } from './CompanyDetails';

const initialState: Partial<IReqProviderProps> = {
	email: '',
	businessRegistrationNumber: '',
	companyName: '',
	contactName: '',
	phone: '',
	avatar: '',
	region_code: -1,
};

interface Props {
	providerDetails: IResProviderProps;
}

export const MyAccount = ({ providerDetails }: Props) => {
	const { user, updatePassword } = useAuthContext();
	const [loginInfo, setLoginInfo] = useState({
		email: user?.email,
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [details, setDetails] =
		useState<Partial<IReqProviderProps>>(initialState);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateProviderAccount = async () => {
		setIsUpdating(true);
		const { error } = await updateProviderAsync(details, user?.id || '');

		if (!error) {
			toast.success('Update account successfully.');
			setIsUpdating(false);
		} else {
			console.log(error);
			setIsUpdating(false);
		}
	};

	const handleUpdatePassword = async () => {
		const { email, oldPassword, newPassword, confirmPassword } = loginInfo;
		if (!email) return;
		if (newPassword !== confirmPassword) {
			toast.error('Confirm password is incorrect.');
			return;
		}

		const isSuccess = await updatePassword(email, oldPassword, newPassword);

		if (!isSuccess) {
			return toast.error('Current password is incorrect.');
		}

		toast.success('Update password successfully.');
	};

	const handleChangeLoginInfo = (key: string, value: string) => {
		if (!loginInfo.email) {
			setLoginInfo((prevState) => ({
				...prevState,
				email: user?.email,
			}));
		}
		setLoginInfo((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	useEffect(() => {
		setDetails((prevState) => ({
			...prevState,
			...providerDetails,
		}));
	}, [providerDetails, user]);

	return (
		<>
			<CompanyDetails
				mode='edit'
				companyDetails={details}
				setCompanyDetails={setDetails}
			/>

			<Flex justify='flex-end'>
				<Button
					onClick={handleUpdateProviderAccount}
					radius='xl'
					size='md'
					my='sm'
					disabled={isUpdating}
				>
					{isUpdating ? 'Saving...' : 'Save'}
				</Button>
			</Flex>

			<Divider
				label={
					<Title order={4} className='text-default'>
						Account Details
					</Title>
				}
				labelPosition='center'
				my='lg'
			/>

			<Group grow>
				<Box>
					<Input.Label>Email</Input.Label>
					<Input
						type='email'
						placeholder='hello@example.com'
						defaultValue={details.email}
						disabled
					/>
				</Box>
				<Box>
					<Input.Label>Current Password</Input.Label>
					<PasswordInput
						placeholder='********'
						value={loginInfo.oldPassword}
						onChange={(e) =>
							handleChangeLoginInfo('oldPassword', e.target.value)
						}
					/>
				</Box>
			</Group>

			<Group grow>
				<Box>
					<Input.Label>New Password</Input.Label>
					<PasswordInput
						placeholder='********'
						value={loginInfo.newPassword}
						onChange={(e) =>
							handleChangeLoginInfo('newPassword', e.target.value)
						}
					/>
				</Box>
				<Box>
					<Input.Label>Confirm New Password</Input.Label>
					<PasswordInput
						placeholder='********'
						value={loginInfo.confirmPassword}
						onChange={(e) =>
							handleChangeLoginInfo('confirmPassword', e.target.value)
						}
					/>
				</Box>
			</Group>

			<Flex justify='flex-end'>
				<Button
					disabled={
						!loginInfo.newPassword ||
						!loginInfo.confirmPassword ||
						!loginInfo.email ||
						!loginInfo.oldPassword
					}
					radius='xl'
					size='md'
					my='sm'
					onClick={handleUpdatePassword}
				>
					<Text>Save</Text>
				</Button>
			</Flex>
		</>
	);
};
