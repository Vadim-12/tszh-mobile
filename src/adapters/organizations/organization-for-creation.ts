import {
	ICreateOrganizationRequestDto,
	IOrganizationCreationDto,
} from '@/services/organizations-service/types';

export function organizationForCreation(
	dto: IOrganizationCreationDto
): ICreateOrganizationRequestDto {
	return {
		full_title: dto.fullTitle,
		short_title: dto.shortTitle,
		INN: dto.INN,
		email: dto.email,
		legal_address: dto.legalAddress,
	};
}
