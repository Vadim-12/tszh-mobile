import {
	IOrganization,
	IOrganizationRaw,
} from '@/services/organizations-service/types';

export function organizationFromBackend(
	rawData: IOrganizationRaw,
): IOrganization {
	return {
		id: rawData.id,
		fullTitle: rawData.full_title,
		shortTitle: rawData.short_title,
		INN: rawData.INN,
		email: rawData.email,
		legalAddress: rawData.legal_address,
		createdAt: rawData.created_at,
		updatedAt: rawData.updated_at,
	};
}
