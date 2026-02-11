import { useToast } from '@/components/layouts/toast-provider';
import { OrganizationsErrors } from '@/constants/errors/organizations';
import { organizationsService } from '@/services/organizations-service/organizations-service';
import { ICreateOrganizationRequestDto } from '@/services/organizations-service/types';
import { IApiError } from '@/types/api-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function useCreateOrganization() {
	const toast = useToast();
	const { t } = useTranslation();
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (p: ICreateOrganizationRequestDto) =>
			organizationsService.create(p),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['organizations'] });
			router.back();
		},
		onError: (error) => {
			console.log('useCreateOrganization() onError error', error);
			if (axios.isAxiosError<IApiError>(error)) {
				const data = error.response?.data;

				if (data?.code === OrganizationsErrors.NotValidData) {
					toast.show({
						type: 'error',
						message: `${t('organizations.screens.creation.errors.title')}. ${t(
							'organizations.screens.creation.errors.description.not-valid-data',
						)}`,
					});
					return;
				}
				if (data?.code === OrganizationsErrors.INNAlreadyExists) {
					toast.show({
						type: 'error',
						message: `${t('organizations.screens.creation.errors.title')}. ${t(
							'organizations.screens.creation.errors.description.inn-already-exists',
						)}`,
					});
					return;
				}
				if (data?.code === OrganizationsErrors.RequestTimeout) {
					toast.show({
						type: 'error',
						message: `${t('errors.request-timeout.title')}. ${t(
							'errors.request-timeout.description',
						)}`,
					});
					return;
				}
			}
			toast.show({
				type: 'error',
				message: `${t('errors.internal-server-error.title')}. ${t(
					'errors.internal-server-error.description',
				)}`,
			});
		},
	});
}
