import { ThemeContext } from '@/context/theme-context';
import { useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Switch } from 'react-native-paper';

export function ThemeToggler() {
	const ctx = useContext(ThemeContext);
	const system = useColorScheme();

	const isDark = useMemo(() => {
		if (ctx?.theme === 'dark') return true;
		if (ctx?.theme === 'light') return false;
		return system === 'dark';
	}, [ctx?.theme, system]);

	if (!ctx) return null;
	return (
		<Switch
			value={isDark}
			onValueChange={(next) => ctx.switchTheme(next ? 'dark' : 'light')}
			style={{ position: 'absolute', top: 16, right: 16 }}
		/>
	);
}
