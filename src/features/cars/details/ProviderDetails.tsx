import { Avatar, Box, Flex, Text, Title } from '@mantine/core';

interface Props {
	provider: {
		companyName: string;
		avatar: string;
		email: string;
		phone: string;
	};
}
export const ProviderDetails = ({ provider }: Props) => {
	return (
		<Flex
			justify='space-between'
			align={{ base: 'flex-start', md: 'center' }}
			direction={{ base: 'column', md: 'row' }}
			mt={16}
		>
			<Box>
				<Flex align='center' gap={8}>
					<Avatar
						src={provider.avatar}
						style={{ border: '1px solid gray' }}
						radius='xl'
						c='blue.5'
					/>
					<Flex style={{ fontSize: 'small' }} direction='column'>
						<Title order={3} className='text-default'>
							{provider.companyName}
						</Title>
						<div className='flex items-center'>
							<Text
								component='a'
								href={`tel:${provider.phone}`}
								className='text-muted'
							>
								{provider.phone}
							</Text>
							<Text className='text-muted !mx-1'>
								|
							</Text>
							<Text
								component='a'
								href={`mailto:${provider.email}`}
								className='text-muted'
							>
								{provider.email}
							</Text>
						</div>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};
