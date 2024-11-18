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
	const { user } = useAuthContext();
	const [details, setDetails] =
		useState<Partial<IReqProviderProps>>(initialState);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateProviderAccount = async () => {
		setIsUpdating(true);
		const { error } = await updateProviderAsync(details, user?.id || '');

		if (!error) {
			toast.success('Account Updated');
			setIsUpdating(false);
		} else {
			console.log(error);
			setIsUpdating(false);
		}
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
					<PasswordInput placeholder='xxxxxxxxxx' disabled />
				</Box>
			</Group>

			<Group grow>
				<Box>
					<Input.Label>Mật khẩu mới</Input.Label>
					<PasswordInput placeholder='xxxxxxxxxx' disabled />
				</Box>
				<Box>
					<Input.Label>Nhập lại mật khẩu mới</Input.Label>
					<PasswordInput placeholder='xxxxxxxxxx' disabled />
				</Box>
			</Group>

			<Flex justify='flex-end'>
				<Button disabled radius='xl' size='md' my='sm'>
					<Text ml='xs'>Cập nhật</Text>
				</Button>
			</Flex>
		</>
	);
};
