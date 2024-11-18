import { IResReviewProps } from '@/models/res.model';
import { Card } from '@mantine/core';
import { ReviewCard } from '../../../components/ReviewCard';

interface Props {
  reviews: IResReviewProps[];
}
export const Reviews = ({ reviews }: Props) => {
  return (
    <Card my="md">
      {reviews.length === 0 ? (
        <i>Chưa có đánh giá cho phương tiện này</i>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </Card>
  );
};
