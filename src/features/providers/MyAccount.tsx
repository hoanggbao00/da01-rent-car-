'use client';
import { useAuthContext } from '@/context/AuthContext';
import { IReqProviderProps } from '@/models/req.model';
import { IResProviderProps } from '@/models/res.model';
import { updateProviderAsync } from '@/services/supabase.service';
import {
	ActionIcon,
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
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
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
			toast.success('Cập nhật thông tin thành công');
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
			toast.error('Mật khẩu mới không khớp');
			return;
		}

		const isSuccess = await updatePassword(email, oldPassword, newPassword);

		if (!isSuccess) {
			return toast.error('Mật khẩu cũ không đúng, vui lòng kiểm tra lại.');
		}

		toast.success('Cập nhật mật khẩu mới thành công');
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
					{isUpdating ? 'Đang lưu...' : 'Lưu'}
				</Button>
			</Flex>

			<Divider
				label={
					<Title order={4} className='text-default'>
						Thông tin đăng nhập
					</Title>
				}
				labelPosition='center'
				my='lg'
			/>

			<Group grow>
				<Box>
					<Input.Label>Địa chỉ email</Input.Label>
					<Input
						type='email'
						placeholder='hello@example.com'
						defaultValue={details.email}
						disabled
					/>
				</Box>
				<Box>
					<Input.Label>Mật khẩu hiện tại</Input.Label>
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
					<Input.Label>Mật khẩu mới</Input.Label>
					<PasswordInput
						placeholder='********'
						value={loginInfo.newPassword}
						onChange={(e) =>
							handleChangeLoginInfo('newPassword', e.target.value)
						}
					/>
				</Box>
				<Box>
					<Input.Label>Nhập lại mật khẩu mới</Input.Label>
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
					<Text>Cập nhật</Text>
				</Button>
			</Flex>
		</>
	);
};
