import { StorageKeysEnum } from '@/constants/storage.keys';
import { TTheme } from '@/services/theme-service/types';
import { Maybe } from '@/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeService {
	async getPreferredTheme(): Promise<Maybe<TTheme>> {
		const storedTheme = await AsyncStorage.getItem(StorageKeysEnum.ColorMode);
		if (storedTheme === 'light' || storedTheme === 'dark') {
			return storedTheme;
		}
		return null;
	}

	async setPreferredTheme(theme: TTheme): Promise<void> {
		await AsyncStorage.setItem(StorageKeysEnum.ColorMode, theme);
	}
}

export const themeService = new ThemeService();
