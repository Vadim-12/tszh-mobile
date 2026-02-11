import { organizationFromBackend } from '@/adapters/organizations/organization-from-backend';
import { organizationsFromBackend } from '@/adapters/organizations/organizations-from-backend';
import { coreApi } from '@/api/core-client';
import {
	ICreateOrganizationRequestDto,
	ICreateOrganizationResponseDto,
	IOrganization,
	IOrganizationRaw,
} from '@/services/organizations-service/types';
import { AxiosResponse } from 'axios';

class OrganizationsService {
	async create(
		dto: ICreateOrganizationRequestDto,
	): Promise<ICreateOrganizationResponseDto> {
		const response = await coreApi.post<
			ICreateOrganizationResponseDto,
			AxiosResponse<ICreateOrganizationResponseDto>,
			ICreateOrganizationRequestDto
		>('/organizations', dto);

		return response.data;
	}

	async getAll(): Promise<IOrganization[]> {
		const response = await coreApi.get<
			IOrganizationRaw[],
			AxiosResponse<IOrganizationRaw[]>
		>('/organizations');

		const data = organizationsFromBackend(response.data);
		return data;
	}

	async getById(id: string): Promise<IOrganization> {
		const response = await coreApi.get<IOrganizationRaw>(
			`/organizations/${id}`,
		);

		const data = organizationFromBackend(response.data);
		return data;
	}
}

export const organizationsService = new OrganizationsService();
