import { IResReviewProps } from '@/models/res.model';
import { Button, Card, Divider, Loader, Textarea } from '@mantine/core';
import { ReviewCard } from '@/components/ReviewCard';
import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { createReview } from '@/actions/reviews.action';
import { toast } from 'react-toastify';

interface Props {
	reviews: IResReviewProps[];
	car_id: number;
	provider_id: string;
}
export const Reviews = ({ reviews: _reviews, car_id, provider_id }: Props) => {
	const { session } = useAuthContext();
	const [input, setInput] = useState('');
	const [reviews, setReviews] = useState(_reviews);
	const [loading, setLoading] = useState(false);

	const handleAddReview = async () => {
		if (!session?.user.id) return;

		setLoading(true);
		const isSucess = await createReview(session?.user.id, {
			car_id,
			provider_id,
			content: input,
		});

		if (isSucess) {
			setInput('');
			toast.success('Reviews sent successfully');
			setReviews([...reviews, { ...isSucess }]);
		} else {
			toast.error('Something went wrong!');
		}

		setLoading(false);
	};

	const handleCtrlEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			handleAddReview();
		}
	};

	return (
		<Card my='md' >
			{session?.user.id && session.user.user_metadata.role !== 'provider' && (
				<div className='flex flex-col gap-2 items-end group'>
					<Textarea
						placeholder='Add your review here...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						w={'100%'}
						rows={3}
						className='!text-2xl'
						disabled={loading}
						onKeyDown={handleCtrlEnter}
					/>
					<Button
						rightSection={
							loading ? (
								<Loader size={16} />
							) : (
								<BiSend className='group-hover:!motion-preset-slide-right-lg' />
							)
						}
						disabled={loading || !input}
						onClick={handleAddReview}
					>
						Send Review
					</Button>
				</div>
			)}
			<Divider my={'xs'} />
			{reviews.length === 0 && <i>This car has no reviews</i>}
			<div className='flex flex-col gap-4'>
				{reviews.map((review) => (
					<ReviewCard
						key={review.id}
						review={review}
						userId={review.users?.id}
					/>
				))}
			</div>
		</Card>
	);
};
