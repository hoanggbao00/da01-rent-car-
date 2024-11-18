import { getNotifications } from '@/actions/notifications.action';
import { useQuery } from '@tanstack/react-query';

export function useNotifications(user_id: string | undefined) {
	const {
		isLoading,
		data,
		error,
	} = useQuery(['notifications'], () => getNotifications(user_id));

	return {
		isLoading,
		is_read: data?.is_read,
		notifications: data?.notifications,
		error,
	};
}
