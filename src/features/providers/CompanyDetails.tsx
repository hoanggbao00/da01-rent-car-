import { ProfilePhoto } from '@/components/ProfilePhoto';
import { SelectRegion } from '@/components/SelectRegion';
import { CurrentMode } from '@/models/app';
import { IReqProviderProps } from '@/models/req.model';
import {
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Input,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

interface Props {
	mode?: CurrentMode;
	next?: () => void;
	companyDetails: Partial<IReqProviderProps>;
	setCompanyDetails: Dispatch<SetStateAction<Partial<IReqProviderProps>>>;
}
export const CompanyDetails = ({
	mode,
	next,
	companyDetails,
	setCompanyDetails,
}: Props) => {
	const [isNext, setIsNext] = useState(false);

	const updateDetails = (key: keyof IReqProviderProps, value: any) => {
		setCompanyDetails((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const isEditMode = mode != null && mode === 'edit';

	const handleNext = () => {
		const {
			companyName,
			businessRegistrationNumber,
			contactName,
			phone,
			region_code,
		} = companyDetails;

		if (
			companyName &&
			businessRegistrationNumber &&
			contactName &&
			phone &&
			region_code !== -1
		) {
			next?.();
		} else {
			setIsNext(true);
		}
	};

	const updateAvatar = async (url: string) => {
		updateDetails('avatar', url);
	};

	return (
		<Flex gap='4rem'>
			<Box style={{ flexGrow: 1 }}>
				{!isEditMode && (
					<Title c='gray.6' mt='2rem'>
						Tạo mới tài khoản cho thuê
					</Title>
				)}
				<ProfilePhoto
					profileUrl={companyDetails.avatar}
					updateProfile={updateAvatar}
				/>
				<Space mt='2rem' />
				<Group grow>
					<Box>
						<Input.Label>Tên doanh nghiệp</Input.Label>
						<Input
							type='text'
							placeholder='Công ty ABC'
							value={companyDetails.companyName}
							onChange={(event) =>
								updateDetails('companyName', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.companyName && (
							<Input.Error>Vui lòng nhập tên doanh nghiệp</Input.Error>
						)}
					</Box>

					<Box>
						<Input.Label>Số kinh doanh</Input.Label>
						<Input
							type='text'
							placeholder='BNXXXXXXXXXX'
							value={companyDetails.businessRegistrationNumber}
							onChange={(event) =>
								updateDetails(
									'businessRegistrationNumber',
									event.currentTarget.value
								)
							}
						/>
						{isNext && !companyDetails.businessRegistrationNumber && (
							<Input.Error>Vui lòng nhập số kinh doanh</Input.Error>
						)}
					</Box>
				</Group>
				<Group grow>
					<Box>
						<Input.Label>Tên người liên hệ</Input.Label>
						<Input
							type='text'
							placeholder='John Champion'
							value={companyDetails.contactName}
							onChange={(event) =>
								updateDetails('contactName', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.contactName && (
							<Input.Error>Vui lòng nhập tên người liên hệ</Input.Error>
						)}
					</Box>
					<Box my='sm'>
						<Input.Label>Số điện thoại liên hệ</Input.Label>
						<Input
							type='text'
							placeholder='0362554000'
							value={companyDetails.phone}
							onChange={(event) =>
								updateDetails('phone', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.phone && (
							<Input.Error>Vui lòng nhập số điện thoại</Input.Error>
						)}
					</Box>
				</Group>
				<Box my='lg'>
					<Divider
						my='xs'
						label={
							<Title order={4} className='text-default'>
								Địa chỉ
							</Title>
						}
						labelPosition='center'
					/>

					<Group grow>
						<Box my='sm'>
							<SelectRegion
								value={companyDetails.region_code?.toString()}
								onChange={(value) => {
									updateDetails('region_code', value);
								}}
							/>
							{isNext && companyDetails.region_code === -1 && (
								<Input.Error>Vui lòng chọn Tỉnh/ Thành phố</Input.Error>
							)}
						</Box>
					</Group>

					<Group grow align='flex-start'></Group>
				</Box>
				{!isEditMode && (
					<Flex justify='flex-end'>
						<Button
							variant='subtle'
							onClick={handleNext}
							radius='xl'
							size='md'
						>
							<Text mr='xs'>Tiếp tục</Text> <BsArrowRight />
						</Button>
					</Flex>
				)}
			</Box>
		</Flex>
	);
};
