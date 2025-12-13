import { TTheme } from '@/services/theme-service/types';
import { createContext, useContext } from 'react';

interface IThemeContextValue {
	theme: TTheme;
	switchTheme: (t: TTheme) => Promise<void>;
}

export const ThemeContext = createContext<IThemeContextValue | null>(null);
export const useThemePreferred = () => useContext(ThemeContext);
