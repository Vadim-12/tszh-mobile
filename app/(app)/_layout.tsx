import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Building2, Home, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function AppLayout() {
	const { t } = useTranslation();
	const { colors } = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: colors.card },
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.text,
				tabBarHideOnKeyboard: false,
				freezeOnBlur: false,
			}}
		>
			<Tabs.Screen
				name='organizations'
				options={{
					title: t('organizations.title'),
					tabBarIcon: ({ color, size }) => (
						<Building2 color={color} size={size ?? 24} />
					),
				}}
			/>
			<Tabs.Screen
				name='buildings'
				options={{
					title: t('buildings.title'),
					tabBarIcon: ({ color, size }) => (
						<Home color={color} size={size ?? 24} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: t('profile.title'),
					tabBarIcon: ({ color, size }) => (
						<User color={color} size={size ?? 24} />
					),
				}}
			/>
		</Tabs>
	);
}
