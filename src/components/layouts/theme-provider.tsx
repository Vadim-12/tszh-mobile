import { ThemeContext } from '@/context/theme-context';
import { themeService } from '@/services/theme-service/theme-service';
import { TTheme } from '@/services/theme-service/types';
import {
	DarkTheme as NavDark,
	DefaultTheme as NavLight,
	ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

export function ThemeProvider({ children }: PropsWithChildren) {
	const systemTheme = useColorScheme();
	const [theme, setTheme] = useState<TTheme>('light');

	const mode: 'light' | 'dark' = useMemo(() => {
		if (theme === 'system') {
			return systemTheme === 'dark' ? 'dark' : 'light';
		}
		return theme;
	}, [theme, systemTheme]);

	const paper = useMemo(
		() => (mode === 'dark' ? MD3DarkTheme : MD3LightTheme),
		[mode],
	);

	const nav = useMemo(() => {
		const base = mode === 'dark' ? NavDark : NavLight;
		return {
			...base,
			colors: {
				...base.colors,
				primary: paper.colors.primary,
				background: paper.colors.background,
				card: paper.colors.elevation.level2,
				text: paper.colors.onSurface,
				border: paper.colors.outline,
				notification: paper.colors.error,
			},
		};
	}, [paper, mode]);

	useEffect(() => {
		const initTheme = async () => {
			const storedTheme = await themeService.getPreferredTheme();
			if (storedTheme) {
				setTheme(storedTheme);
			} else if (systemTheme) {
				setTheme(systemTheme);
			}
		};
		initTheme();
	}, []);

	const switchTheme = async (newTheme: TTheme) => {
		setTheme(newTheme);
		await themeService.setPreferredTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			<PaperProvider theme={paper}>
				<NavThemeProvider value={nav}>{children}</NavThemeProvider>
			</PaperProvider>
		</ThemeContext.Provider>
	);
}
