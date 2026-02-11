export interface IOrganizationCreationDto {
	fullTitle: string;
	shortTitle: string;
	INN: string;
	email: string;
	legalAddress: string;
}

export interface ICreateOrganizationRequestDto {
	full_title: string;
	short_title: string;
	INN: string;
	email: string;
	legal_address: string;
}

export interface ICreateOrganizationResponseDto {
	id: string;
	full_title: string;
	short_title: string;
	INN: string;
	email: string;
	legal_address: string;
	created_at: string;
	updated_at: string;
}

export interface IOrganizationRaw {
	id: string;
	full_title: string;
	short_title: string;
	INN: string;
	email: string;
	legal_address: string;
	created_at: string;
	updated_at: string;
}

export interface IOrganization {
	id: string;
	fullTitle: string;
	shortTitle: string;
	INN: string;
	email: string;
	legalAddress: string;
	createdAt: string;
	updatedAt: string;
}
