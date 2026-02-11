import { coreApi } from '@/api/core-client';
import { IUserMeResponseDto } from '@/services/user-service/types';
import { AxiosResponse } from 'axios';

class UserService {
	async getMe(): Promise<IUserMeResponseDto> {
		const response = await coreApi.get<
			IUserMeResponseDto,
			AxiosResponse<IUserMeResponseDto>
		>('/users/me');

		console.log('response in userService.getMe()', response);
		return response.data;
	}
}

export const userService = new UserService();
