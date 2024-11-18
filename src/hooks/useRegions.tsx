import { getRegionsAsync } from '@/services/supabase.service';
import { useQuery } from '@tanstack/react-query';

export function useRegions() {
	const {
		isLoading,
		data: regions,
		error,
	} = useQuery(['regions'], () => getRegionsAsync());

	return {
		isLoading,
		regions,
		error,
	};
}
