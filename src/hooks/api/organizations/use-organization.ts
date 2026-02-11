import { organizationsService } from '@/services/organizations-service/organizations-service';
import { useQuery } from '@tanstack/react-query';

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ['organizations', id],
    enabled: Boolean(id),
    queryFn: () => organizationsService.getById(id),
  });
}
