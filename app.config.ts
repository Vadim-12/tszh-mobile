import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

const ENV_MODE =
	process.env.APP_ENV ?? process.env.EAS_BUILD_PROFILE ?? 'development';
const EAS_PROJECT_ID = '8b7bee05-0412-45f1-a7c7-92914e10bc35';

const config: ExpoConfig = {
	name: 'ТСЖ для людей',
	slug: 'tszh-for-people',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './src/assets/images/icon.png',
	scheme: 'tszh-for-people',
	userInterfaceStyle: 'automatic',
	newArchEnabled: true,
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'com.agarkov-vadim.tszh-for-people',
	},
	android: {
		adaptiveIcon: {
			backgroundColor: '#E6F4FE',
			foregroundImage: './src/assets/images/android-icon-foreground.png',
			backgroundImage: './src/assets/images/android-icon-background.png',
			monochromeImage: './src/assets/images/android-icon-monochrome.png',
		},
		predictiveBackGestureEnabled: false,
		edgeToEdgeEnabled: true,
		package: 'com.agarkov_vadim.tszh-for-people',
	},
	web: {
		output: 'single',
		favicon: './src/assets/images/favicon.png',
	},
	plugins: [
		'expo-router',
		[
			'expo-splash-screen',
			{
				image: './src/assets/images/splash-icon.png',
				imageWidth: 200,
				resizeMode: 'contain',
				backgroundColor: '#ffffff',
				dark: {
					backgroundColor: '#000000',
				},
			},
		],
		[
			'expo-secure-store',
			{
				configureAndroidBackup: true,
				faceIDPermission:
					'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
			},
		],
		'expo-localization',
	],
	experiments: {
		typedRoutes: true,
		reactCompiler: false,
	},
	extra: {
		apiUrl: process.env.API_URL,
		envMode: ENV_MODE,
		eas: {
			projectId: EAS_PROJECT_ID,
		},
	},
};

export default config;
