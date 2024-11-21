'use server';

import { IResNotificationProps } from '@/models/res.model';
import { Database } from '@/models/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getNotifications = async (
	user_id: string | undefined
): Promise<{
	is_read: boolean | null;
	notifications: IResNotificationProps[];
} | null> => {
	if (!user_id) return null;
	const supabase = createServerComponentClient<Database>({ cookies });

	let { data: notifications, error } = await supabase
		.from('notifications')
		.select(
			'*, users!notifications_transfer_id_fkey1(id, firstName, lastName, avatar)'
		)
		.eq('receiver_id', user_id)
		.order('created_at', { ascending: false });

	const is_read = await supabase
		.from('users')
		.select('is_read')
		.eq('id', user_id)
		.single();

	if (!notifications) {
		console.log(error);
		return null;
	}

	return {
		is_read: is_read.data?.is_read || null,
		notifications,
	} as unknown as {
		is_read: boolean | null;
		notifications: IResNotificationProps[];
	};
};

export const createNotification = async (
	user_id: string,
	receiver_id: string,
	payload: {
		content: string;
		path: string | null;
		entity_name: string;
	}
) => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data: notification, error } = await supabase
		.from('notifications')
		.insert({
			transfer_id: user_id,
			receiver_id: receiver_id,
			content: payload.content,
			entity_name: payload.entity_name,
			path: payload.path,
		});

	if (notification) {
		return true;
	}

	console.log(error);

	return false;
};

export const handleReadNotification = async (user_id: string) => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { error } = await supabase
		.from('users')
		.update({ is_read: true })
		.eq('id', user_id)
		.single();

	if (error) {
		return false;
	}

	return true;
};
