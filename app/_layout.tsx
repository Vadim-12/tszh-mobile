import { AuthGate } from '@/components/layouts/auth-gate';
import { ThemeProvider } from '@/components/layouts/theme-provider';
import { ToastProvider } from '@/components/layouts/toast-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<ThemeProvider>
			<ToastProvider>
				<QueryClientProvider client={queryClient}>
					<AuthGate>
						<Stack screenOptions={{ headerShown: false, freezeOnBlur: false }}>
							<Stack.Screen name='(auth)' />
							<Stack.Screen name='(app)' />
						</Stack>
					</AuthGate>
				</QueryClientProvider>
			</ToastProvider>
		</ThemeProvider>
	);
}
