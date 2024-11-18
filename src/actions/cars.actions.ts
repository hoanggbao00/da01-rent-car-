'use server';

import { IResCarProps } from '@/models/res.model';
import { Database } from '@/models/supabase';
import {
	User,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSearchedCars = async (
	searchParams: any
): Promise<IResCarProps[]> => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const matchFilter: any = {};

	if (searchParams.region) {
		matchFilter.region = Number(searchParams.region);
	}

	if (searchParams.make && searchParams.make !== 'all') {
		matchFilter.make = searchParams.make;
	}

	let { data: cars } = await supabase
		.from('cars')
		.select(
			'id, regions(code, name), make, model, type, year, transmission, seatingCapacity, images, status, fuelType, pricePerDay'
		)
		.match(matchFilter);


	return cars as IResCarProps[];
};

export const getCarDetails = async (user: User, id: string) => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data: car, error } = await supabase
		.from('cars')
		.select('*, regions(code, name)')
		.eq('id', id)
		.single();

	if (error) {
		throw new Error('Failed to load car details');
	}

	const [userRes, providerRes, reviewsRes] = await Promise.all([
		supabase
			.from('users')
			.select('id, firstName, lastName, regions(name)')
			.match({ id: user.id })
			.single(),
		supabase
			.from('providers')
			.select('companyName, avatar, email, phone')
			.match({ id: car?.provider_id })
			.single(),
		supabase
			.from('reviews')
			.select('*, users(firstName, lastName)')
			.match({ car_id: car?.id }),
	]);

	if (userRes.error || providerRes.error || reviewsRes.error) {
		throw new Error('Failed to load car details');
	}

	return {
		car: car as IResCarProps,
		user: userRes.data as any,
		provider: providerRes.data as any,
		reviews: reviewsRes.data as any,
	};
};
