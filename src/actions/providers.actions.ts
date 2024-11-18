'use server';

import {
	IResCarProps,
	IResProviderProps,
	IResReviewProps,
} from '@/models/res.model';
import { Database } from '@/models/supabase';
import {
	User,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getProviderCars = async (user: User): Promise<IResCarProps[]> => {
	const supabase = createServerComponentClient<Database>({ cookies });

	let { data: cars, error } = await supabase
		.from('cars')
		.select('*, regions(code, name)')
		.eq('provider_id', user.id);

	if (error || cars == null) {
		return []
	}
	return cars as IResCarProps[];
};

export const getProviderReviews = async (
	user: User
): Promise<IResReviewProps[]> => {
	const supabase = createServerComponentClient<Database>({ cookies });

	let { data: reviews, error } = await supabase
		.from('reviews')
		.select('*, users(firstName, lastName), cars(id, make, model)')
		.eq('provider_id', user.id);


	if (error || reviews == null) {
		return []
	}

	return reviews as unknown as IResReviewProps[];
};

export const getProviderDetails = async (
	providerId: string
): Promise<IResProviderProps> => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data, error } = await supabase
		.from('providers')
		.select('*')
		.match({ id: providerId })
		.single();

	if (error || data == null) {
		throw new Error('Failed to load provider details');
	}

	return data as IResProviderProps;
};

export const getProviderStats = async (providerId: string) => {
	const supabase = createServerComponentClient<Database>({ cookies });

	// Get total number of bookings
	const { data: bookings } = await supabase
		.from('bookings')
		.select('id')
		.eq('provider_id', providerId)
		.eq('status', 'pending');

	// Get total number of cars
	const { data: cars } = await supabase
		.from('cars')
		.select('id')
		.eq('provider_id', providerId);

	// Get total number of reviews
	const { data: reviews } = await supabase
		.from('reviews')
		.select('id')
		.eq('provider_id', providerId);

	// Get total number of client of bookings
	const { data: users } = await supabase
		.from('users')
		.select('distinct(user_id)')
		.eq('provider_id', providerId);

	return {
		bookings: bookings?.length || 0,
		cars: cars?.length || 0,
		reviews: reviews?.length || 0,
		users: users?.length || 0,
	};
};
