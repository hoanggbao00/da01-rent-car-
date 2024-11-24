'use client';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { SelectRegion } from '@/components/SelectRegion';
import { IReqUserProps } from '@/models/req.model';
import { IResUserProps } from '@/models/res.model';
import { addUserAsync, updateUserAsync } from '@/services/supabase.service';
import {
	Box,
	Button,
	Flex,
	Group,
	Input,
	LoadingOverlay,
	SegmentedControl,
	Space,
	TextInput,
	Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useProfileForm } from './useProfileForm';

interface ProfileProps {
	userDetails: IResUserProps | null;
	email?: string;
	id: string;
}
export const Profile = ({ userDetails, email, id }: ProfileProps) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const form = useProfileForm(userDetails);
	const { refresh } = useRouter();

	const handleUpdateProfile = async () => {
		if (userDetails == null) {
			setIsUpdating(true);
			const updatedDetails: IReqUserProps = {
				id,
				email,
				...form.values,
				region_code: Number(form.values.region_code),
			};
			const { error } = await addUserAsync(updatedDetails);

			if (error) {
				toast.error('Có lỗi khi cập nhật thông tin');
				setIsUpdating(false);
			} else {
				toast.success('Cập nhật thông tin thành công');
				setIsUpdating(false);
				setTimeout(() => {
					refresh();
				}, 599);
			}
		} else {
			let updatedDetails: any = {};

			for (const [key, value] of Object.entries(form.values)) {
				if (
					value &&
					(userDetails as any)[key]?.toString() !== value.toString()
				) {
					updatedDetails[key] = value;
				}
			}

			if (Object.keys(updatedDetails).length !== 0) {
				setIsUpdating(true);

				const { error } = await updateUserAsync(updatedDetails, id);
				if (error) {
					toast.error('Có lỗi xảy ra khi cập nhật thông tin');
					setIsUpdating(false);
				} else {
					toast.success('Cập nhật thành công');
					setIsUpdating(false);
					refresh();
				}
			}
		}
	};

	const updateAvatar = async (avatarUrl: string) => {
		form.setFieldValue('avatar', avatarUrl);
	};

	return (
		<>
			<Flex gap='4rem' direction={{ base: 'column', md: 'row' }} className='w-full'>
				<Space mt='4rem' />
				<ProfilePhoto
					profileUrl={form.values.avatar}
					updateProfile={updateAvatar}
				/>
				<Box style={{ flexGrow: 1 }}>
					<Title c='gray.6' mb='4rem'>
						Trang cá nhân
					</Title>

					<form onSubmit={form.onSubmit(() => handleUpdateProfile())}>
						<Box my='sm'>
							<Input.Label>Email</Input.Label>
							<Input
								type='text'
								defaultValue={email}
								placeholder='eric.mensah@gmail.com'
								disabled
							/>
						</Box>

						<Group grow>
							<TextInput
								label='Họ và tên đệm'
								placeholder='Nhập họ và tên đệm'
								value={form.values.firstName}
								onChange={(event) =>
									form.setFieldValue('firstName', event.currentTarget.value)
								}
								error={form.errors.firstName && form.errors.firstName}
							/>

							<TextInput
								label='Tên'
								placeholder='Nhập tên của bạn'
								value={form.values.lastName}
								onChange={(event) =>
									form.setFieldValue('lastName', event.currentTarget.value)
								}
								error={form.errors.lastName && form.errors.lastName}
							/>
						</Group>

						<Group grow>
							<Box my='sm'>
								<DateInput
									dateParser={(input) => {
										if (input === 'WW2') {
											return new Date(1939, 8, 1);
										}
										return new Date(input);
									}}
									valueFormat='DD/MM/YYYY'
									label='Ngày sinh'
									placeholder='DD/MM/YYYY'
									value={
										form.values.dateOfBirth
											? new Date(form.values.dateOfBirth)
											: undefined
									}
									onChange={(date) =>
										form.setFieldValue('dateOfBirth', date?.toString() || '')
									}
									locale='vi-VN'
								/>
							</Box>
							<Box my='sm'>
								<Input.Label>Số điện thoại</Input.Label>
								<Input
									type='text'
									placeholder='0362554000'
									value={form.values.phone}
									onChange={(event) =>
										form.setFieldValue('phone', event.currentTarget.value)
									}
									error={form.errors.phone && form.errors.phone}
								/>
							</Box>
						</Group>

						<Box my='sm'>
							<Input.Label mr={16}>Giới tính</Input.Label>
							<SegmentedControl
								data={[
									{ label: 'Nam', value: 'male' },
									{ label: 'Nữ', value: 'female' },
									{ label: 'Khác', value: 'other' },
								]}
								value={form.values.gender}
								onChange={(value) => form.setFieldValue('gender', value)}
							/>
						</Box>

						<Box my='lg'>
							<Title order={4} className='text-muted'>
								Địa chỉ
							</Title>

							<Group grow>
								<Box>
									<SelectRegion
										value={form.values.region_code}
										onChange={(value) =>
											form.setFieldValue('region_code', value)
										}
									/>
									{form.errors.region_code && (
										<Input.Error>{form.errors.region_code}</Input.Error>
									)}
								</Box>
							</Group>
						</Box>
						<LoadingOverlay
							visible={isUpdating}
							overlayProps={{ radius: 'sm', blur: 2 }}
						/>
						<Button type='submit' radius='sm' disabled={isUpdating}>
							{isUpdating ? 'Đang lưu...' : 'Lưu'}
						</Button>
					</form>
				</Box>
			</Flex>
		</>
	);
};
