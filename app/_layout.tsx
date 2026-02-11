import { AuthGate } from '@/components/layouts/auth-gate';
import { ThemeProvider } from '@/components/layouts/theme-provider';
import { ToastProvider } from '@/components/layouts/toast-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync();
		}
	}, [isReady]);

	return (
		<ThemeProvider>
			<ToastProvider>
				<QueryClientProvider client={queryClient}>
					<AuthGate setIsReady={setIsReady}>
						{isReady && (
							<Stack
								screenOptions={{
									headerShown: false,
									freezeOnBlur: false,
								}}
							>
								<Stack.Screen name='(auth)' />
								<Stack.Screen name='(app)' />
							</Stack>
						)}
					</AuthGate>
				</QueryClientProvider>
			</ToastProvider>
		</ThemeProvider>
	);
}
