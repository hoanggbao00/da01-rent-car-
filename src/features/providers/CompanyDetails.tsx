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
						Add Provider Account
					</Title>
				)}
				<ProfilePhoto
					profileUrl={companyDetails.avatar}
					updateProfile={updateAvatar}
				/>
				<Space mt='2rem' />
				<Group grow>
					<Box>
						<Input.Label>Company Name</Input.Label>
						<Input
							type='text'
							placeholder='ABC Company'
							value={companyDetails.companyName}
							onChange={(event) =>
								updateDetails('companyName', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.companyName && (
							<Input.Error>Please fill company name</Input.Error>
						)}
					</Box>

					<Box>
						<Input.Label>Business Registration Number</Input.Label>
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
							<Input.Error>Please fill business registration number</Input.Error>
						)}
					</Box>
				</Group>
				<Group grow>
					<Box>
						<Input.Label>Contact Name</Input.Label>
						<Input
							type='text'
							placeholder='John Champion'
							value={companyDetails.contactName}
							onChange={(event) =>
								updateDetails('contactName', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.contactName && (
							<Input.Error>Please fill in contact name</Input.Error>
						)}
					</Box>
					<Box my='sm'>
						<Input.Label>Contact Phone</Input.Label>
						<Input
							type='text'
							placeholder='0362554000'
							value={companyDetails.phone}
							onChange={(event) =>
								updateDetails('phone', event.currentTarget.value)
							}
						/>
						{isNext && !companyDetails.phone && (
							<Input.Error>Please fill in contact phone</Input.Error>
						)}
					</Box>
				</Group>
				<Box my='lg'>
					<Divider
						my='xs'
						label={
							<Title order={4} className='text-default'>
								Address
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
								<Input.Error>Please select region</Input.Error>
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
							<Text mr='xs'>Next</Text> <BsArrowRight />
						</Button>
					</Flex>
				)}
			</Box>
		</Flex>
	);
};
