import { userService } from '@/services/user-service/user-service';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
	return useQuery({
		queryKey: ['me'],
		queryFn: userService.getMe,
	});
}
