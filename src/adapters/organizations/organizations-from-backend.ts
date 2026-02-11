import { organizationFromBackend } from '@/adapters/organizations/organization-from-backend';
import {
	IOrganization,
	IOrganizationRaw,
} from '@/services/organizations-service/types';

export function organizationsFromBackend(
	orgs: IOrganizationRaw[],
): IOrganization[] {
	return orgs.map(organizationFromBackend);
}
