import { StorageKeysEnum } from '@/constants/storage.keys';
import { ITokens } from '@/services/tokens-service/types';
import { Maybe } from '@/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TokensService {
	async getAccess(): Promise<Maybe<string>> {
		return AsyncStorage.getItem(StorageKeysEnum.AccessToken);
	}

	async getRefresh(): Promise<Maybe<string>> {
		return AsyncStorage.getItem(StorageKeysEnum.RefreshToken);
	}

	async getTokens(): Promise<Maybe<ITokens>> {
		const [access, refresh] = await Promise.all([
			this.getAccess(),
			this.getRefresh(),
		]);
		return access && refresh
			? {
					access,
					refresh,
				}
			: null;
	}

	async saveTokens(tokens: ITokens): Promise<void> {
		await Promise.all([
			AsyncStorage.setItem(StorageKeysEnum.AccessToken, tokens.access),
			AsyncStorage.setItem(StorageKeysEnum.RefreshToken, tokens.refresh),
		]);
	}

	async clearTokens(): Promise<void> {
		await Promise.all([
			AsyncStorage.removeItem(StorageKeysEnum.AccessToken),
			AsyncStorage.removeItem(StorageKeysEnum.RefreshToken),
		]);
	}
}

export const tokensService = new TokensService();
