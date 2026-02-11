import { organizationsService } from '@/services/organizations-service/organizations-service';
import { useQuery } from '@tanstack/react-query';

export function useOrganizations() {
	return useQuery({
		queryKey: ['organizations'],
		queryFn: () => organizationsService.getAll(),
	});
}
