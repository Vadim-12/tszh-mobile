import { authApi } from '@/api/auth-client';
import {
	ILoginRequestDto,
	ILoginResponseDto,
	ILogoutRequestDto,
	ILogoutResponseDto,
	IRefreshRequestDto,
	IRefreshResponseDto,
	IRegisterRequestDto,
	IRegisterResponseDto,
} from '@/services/auth-service/types';
import { tokensService } from '@/services/tokens-service/tokens-service';
import { AxiosResponse } from 'axios';

class AuthService {
	async login(dto: ILoginRequestDto) {
		const response = await authApi.post<
			ILoginResponseDto,
			AxiosResponse<ILoginResponseDto>,
			ILoginRequestDto
		>('/auth/sign-in', dto);
		console.log('response in authService.login()', response);

		const { data } = response;
		await tokensService.saveTokens({
			access: data.tokens.access,
			refresh: data.tokens.refresh,
		});
		return data;
	}

	async register(dto: IRegisterRequestDto) {
		const response = await authApi.post<
			IRegisterResponseDto,
			AxiosResponse<IRegisterResponseDto>,
			IRegisterRequestDto
		>('/auth/sign-up', dto);
		console.log('response in authService.register()', response);

		const { data } = response;
		await tokensService.saveTokens({
			access: data.tokens.access,
			refresh: data.tokens.refresh,
		});
		return data;
	}

	async refresh() {
		const token = await tokensService.getRefresh();
		if (!token) {
			return;
		}
		const response = await authApi.post<
			IRefreshResponseDto,
			AxiosResponse<IRefreshResponseDto>,
			IRefreshRequestDto
		>('/auth/refresh', { refresh_token: token });
		console.log('reponse in authService.refresh()', response);

		const { data } = response;
		await tokensService.saveTokens({
			access: data.tokens.access,
			refresh: data.tokens.refresh,
		});

		return data;
	}

	async logout(dto: ILogoutRequestDto) {
		const response = await authApi.post<
			ILogoutResponseDto,
			AxiosResponse<ILogoutResponseDto>,
			ILogoutRequestDto
		>('/auth/logout', dto);
		console.log('response in authService.logout()', response);

		await tokensService.clearTokens();
		return response.data;
	}
}

export const authService = new AuthService();
