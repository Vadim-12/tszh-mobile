import { useToast } from '@/components/layouts/toast-provider';
import { AuthErrors } from '@/constants/errors/auth';
import { useAuthContext } from '@/hooks/contexts/auth-context';
import { authService } from '@/services/auth-service/auth-service';
import { IApiError } from '@/types/api-error';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export function useLogin() {
	const { t } = useTranslation();
	const toast = useToast();
	const { setTokens } = useAuthContext();

	return useMutation({
		mutationFn: (p: { phoneNumber: string; password: string }) => {
			const promise = authService.login({
				phone_number: p.phoneNumber,
				password: p.password,
			});
			return promise;
		},
		async onSuccess(response) {
			await setTokens(response.tokens);
			toast.show({ type: 'success', message: t('auth.toast.sign-in.success') });
		},
		onError(error) {
			if (axios.isAxiosError<IApiError>(error)) {
				const data = error.response?.data;

				if (data?.code === AuthErrors.WrongCreds) {
					toast.show({
						type: 'error',
						message: `${t('auth.toast.sign-in.errors.title')}. ${t(
							'auth.toast.sign-in.errors.description.wrond-creds'
						)}`,
					});
					return;
				}
			}
			toast.show({
				type: 'error',
				message: `${t('errors.internal-server-error.title')}. ${t(
					'errors.internal-server-error.description'
				)}`,
			});
		},
	});
}
