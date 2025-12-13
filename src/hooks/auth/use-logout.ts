import { useAuthContext } from '@/hooks/contexts/auth-context';
import { authService } from '@/services/auth-service/auth-service';
import { tokensService } from '@/services/tokens-service/tokens-service';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
	const { setTokens } = useAuthContext();

	return useMutation({
		mutationFn: async () => {
			const refresh = await tokensService.getRefresh();
			const response = await authService.logout({ refresh_token: refresh });
			return response;
		},
		onSettled: () => {
			setTokens(null);
		},
	});
}
