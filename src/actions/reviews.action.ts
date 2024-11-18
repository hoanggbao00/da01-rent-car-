'use server';

import { NOTIFICATION_MSG } from '@/consts';
import { IResCarProps, IResReviewProps } from '@/models/res.model';
import { Database } from '@/models/supabase';
import {
	User,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getReviewsById = async (
	car_id: number
): Promise<IResReviewProps[]> => {
	const supabase = createServerComponentClient<Database>({ cookies });

	let { data: reviews } = await supabase
		.from('reviews')
		.select(
			'id, created_at, rate, comment, likes, dislikes, car_id, providers(*), users(*)'
		)
		.eq('car_id', car_id);

	if (!reviews) {
		return [];
	}

	return reviews as IResReviewProps[];
};

export const createReview = async (
	user_id: string,
	payload: { car_id: number; provider_id: string; content: string }
) => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { car_id, provider_id, content } = payload;

	const { data: review } = await supabase
		.from('reviews')
		.insert({
			car_id,
			user_id,
			provider_id,
			comment: content,
			likes: 1,
		})
		.select(
			'provider_id, id, created_at, rate, comment, likes, dislikes, car_id, users(id, firstName, lastName), cars(make, model)'
		)
		.single();

	if (!review?.id) {
		return null;
	}

	// add noti
	await supabase.from('notifications').insert({
		transfer_id: user_id,
		receiver_id: review.provider_id!,
		content: NOTIFICATION_MSG.REVIEW_SENT.key,
		entity_name: `${review.cars?.make} ${review.cars?.model} ${payload.content}`,
		path: `/cars/${car_id}`,
	});

	// update is read
	await supabase.from('users').update({ is_read: false }).eq('id', provider_id);

	return review as IResReviewProps;
};
