import { Maybe } from '@/types/common';

export interface ILoginRequestDto {
	phone_number: string;
	password: string;
}

export interface ILoginResponseDto {
	user: {
		id: string;
		full_name: string;
	};
	tokens: {
		access: string;
		refresh: string;
	};
	error?: string;
}

export interface IRegisterRequestDto {
	full_name: string;
	phone_number: string;
	email?: string;
	password: string;
}

export interface IRegisterResponseDto {
	user: {
		id: string;
		full_name: string;
	};
	tokens: {
		access: string;
		refresh: string;
	};
	error?: string;
}

export interface IRefreshRequestDto {
	refresh_token: string;
}

export interface IRefreshResponseDto {
	tokens: {
		access: string;
		refresh: string;
	};
	error?: string;
}

export interface ILogoutRequestDto {
	refresh_token: Maybe<string>;
}

export interface ILogoutResponseDto {
	error?: string;
}
