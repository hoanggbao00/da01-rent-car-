import { formatDate } from '@/functions';
import { IResReviewProps } from '@/models/res.model';
import { Avatar, Box, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	review: IResReviewProps;
	userId: string | undefined;
}
export const ReviewCard = ({ review, userId }: Props) => {
	const name =
		review.users!.id == userId
			? 'You'
			: `${review.users?.firstName} ${review.users?.lastName}`;
	const pathName = usePathname();
	const isProvider = pathName.includes('providers');

	return (
		<>
			<Flex gap={16}>
				<Avatar size='md' radius='xl' color='blue' />
				<Box>
					<Text size='sm' fw={500} className='text-muted'>
						{name}{' '}
						{isProvider && (
							<>
								<span className='text-muted'>has reviewed</span>{' '}
								<Link href={`/cars/${review.cars?.id}`} className='hover:underline'>
									{review.cars?.make} {review.cars?.model}
								</Link>
							</>
						)}
						<time className='text-muted'>
							- {formatDate(review.created_at)}
						</time>
					</Text>
					{/* <Rating value={review.rate} fractions={2} readOnly /> */}
					<Text className='text-default'>{review.comment}</Text>
					{/* <Flex gap="md" my="lg">
            <Box>
              <ActionIcon radius="xl" color="gray.1" bg="blue" size="lg">
                <IconThumbUp />
              </ActionIcon>
              <Text size="xs" ta="center" className="text-muted">
                {review.likes}
              </Text>
            </Box>

            <Box>
              <ActionIcon radius="xl" color="gray.1" bg="blue" size="lg">
                <IconThumbDown />
              </ActionIcon>
              <Text size="xs" ta="center" className="text-muted">
                {review.dislikes}
              </Text>
            </Box>
          </Flex> */}
				</Box>
			</Flex>
		</>
	);
};
