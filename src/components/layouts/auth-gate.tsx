import { AuthContext } from '@/context/auth-context';
import { initI18n } from '@/localization/init';
import { authService } from '@/services/auth-service/auth-service';
import { tokensService } from '@/services/tokens-service/tokens-service';
import { ITokens } from '@/services/tokens-service/types';
import { Maybe } from '@/types/common';
import { isExpired } from '@/utils/jwt-checks';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export function AuthGate({ children }: PropsWithChildren) {
	const router = useRouter();
	const segments = useSegments();
	const isNavReady = Boolean(useRootNavigationState().key);

	const [tokens, setTokensLocal] = useState<Maybe<ITokens>>(null);
	const [isLocalizationReady, setIsLocalizationReady] =
		useState<boolean>(false);
	const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

	async function setTokens(tokens: Maybe<ITokens>) {
		if (tokens) {
			await tokensService.saveTokens(tokens);
		} else {
			await tokensService.clearTokens();
		}
		setTokensLocal(tokens);
	}

	useEffect(() => {
		let cancelled = false;

		(async () => {
			try {
				const tokens = await tokensService.getTokens();
				if (cancelled) return;

				if (tokens && !isExpired(tokens.access)) {
					await setTokens(tokens);
					if (cancelled) return;
					setIsAuthReady(true);
					return;
				}

				const refreshResult = await authService.refresh();

				if (cancelled) return;
				await setTokens(refreshResult?.tokens ?? null);

				if (cancelled) return;
				setIsAuthReady(true);
			} catch {
				if (cancelled) return;
				await setTokens(null);

				if (cancelled) return;
				setIsAuthReady(true);
			}
		})();

		initI18n().then(() => {
			if (!cancelled) setIsLocalizationReady(true);
		});

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		console.log(1, isAuthReady, isLocalizationReady, isNavReady);
		if (!isAuthReady || !isLocalizationReady || !isNavReady) return;
		const inAuth = segments[0] === '(auth)';
		console.log(2, inAuth, tokens);
		if (tokens && inAuth) {
			router.replace('/(app)/buildings');
		} else if (!tokens && !inAuth) {
			router.replace('/(auth)/login');
		}
	}, [segments, isNavReady, isAuthReady, isLocalizationReady, router, tokens]);

	if (!(isNavReady && isLocalizationReady && isAuthReady)) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator animating size='large' />
			</View>
		);
	}
	return (
		<AuthContext.Provider value={{ tokens, setTokens }}>
			{children}
		</AuthContext.Provider>
	);
}
