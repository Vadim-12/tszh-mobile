import { useToast } from '@/components/layouts/toast-provider';
import { AuthErrors } from '@/constants/errors/auth';
import { authService } from '@/services/auth-service/auth-service';
import { IApiError } from '@/types/api-error';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export function useRegister() {
	const { t } = useTranslation();
	const toast = useToast();

	return useMutation({
		mutationFn: async (p: {
			fullName: string;
			phoneNumber: string;
			email?: string;
			password: string;
		}) => {
			const response = await authService.register({
				full_name: p.fullName,
				phone_number: p.phoneNumber,
				email: p.email,
				password: p.password,
			});
			console.log('response in mutation', response);
			return response;
		},
		onSuccess() {
			toast.show({ type: 'success', message: t('auth.toast.sign-up.success') });
		},
		onError(error) {
			console.log('onError()', error);
			if (axios.isAxiosError<IApiError>(error)) {
				const data = error.response?.data;
				console.log('response data', data);

				if (data?.code === AuthErrors.PhoneNumberAlreadyExists) {
					toast.show({
						type: 'error',
						message: `${t('auth.toast.sign-up.errors.title')}. ${t(
							'auth.toast.sign-up.errors.description.phone-number-already-exists'
						)}`,
					});
					return;
				}
				if (data?.code === AuthErrors.EmailAlreadyExists) {
					toast.show({
						type: 'error',
						message: `${t('auth.toast.sign-up.errors.title')}. ${t(
							'auth.toast.sign-up.errors.description.email-already-exists'
						)}`,
					});
					return;
				}
				if (data?.code === AuthErrors.RequestTimeout) {
					toast.show({
						type: 'error',
						message: `${t('errors.request-timeout.title')}. ${t(
							'errors.request-timeout.description'
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
