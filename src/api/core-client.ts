import { API_URL } from '@/config/env';
import { authService } from '@/services/auth-service/auth-service';
import { tokensService } from '@/services/tokens-service/tokens-service';
import axios, { AxiosError } from 'axios';

let isRefreshing = false;
let waitQueue: ((t: string | null) => void)[] = [];

export const coreApi = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 10000,
});

coreApi.interceptors.request.use(async (config) => {
	const access = await tokensService.getAccess();
	if (access) config.headers.Authorization = `Bearer ${access}`;
	return config;
});

coreApi.interceptors.response.use(
	(res) => res,
	async (err: AxiosError) => {
		const status = err.response?.status;
		const original = err.config as any;
		if (status !== 401 || original?._retry) {
			// не наш случай/уже пробовали — пробрасываем дальше
			throw err;
		}
		original._retry = true;

		// если рефреш уже идет — ждём его завершения
		if (isRefreshing) {
			const token = await new Promise<string | null>((resolve) => {
				waitQueue.push(resolve);
			});
			if (!token) throw err; // рефреш провалился
			original.headers = {
				...(original.headers || {}),
				Authorization: `Bearer ${token}`,
			};
			return axios(original);
		}

		// запускаем рефреш
		try {
			isRefreshing = true;
			const refreshResponse = await authService.refresh();
			if (!refreshResponse) {
				throw new Error('No refresh token');
			}

			// разбудим очередь
			waitQueue.forEach((fn) => fn(refreshResponse.data.access_token));
			waitQueue = [];

			// повторяем исходный запрос с новым токеном
			original.headers = {
				...(original.headers || {}),
				Authorization: `Bearer ${refreshResponse.data.access_token}`,
			};
			return axios(original);
		} catch (e) {
			console.error('ERROR REFRESHING:', e);
			// провал — всем сказать «нет токена»
			waitQueue.forEach((fn) => fn(null));
			waitQueue = [];
			// чистим локальные токены и кидаем 401 дальше — пусть слой выше сделает logout
			await tokensService.clearTokens();
			throw err;
		} finally {
			isRefreshing = false;
		}
	}
);
