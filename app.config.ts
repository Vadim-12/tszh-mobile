import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

const ENV_MODE = process.env.APP_ENV ?? process.env.EAS_BUILD_PROFILE ?? 'development';
const EAS_PROJECT_ID = 'f9e84d3b-c66d-4fc9-9c1c-0bb3f41e7188';

const config: ExpoConfig = {
  owner: 'agarkov_vadim',
  name: 'ТСЖ для людей',
  slug: 'tszh-for-people',
  version: '1.0.0',
  runtimeVersion: {
    policy: 'fingerprint',
  },
  updates: {
    url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
  },
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'tszh-for-people',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    backgroundColor: '#333333',
    bundleIdentifier: 'me.agarkov.tszhforpeople',
    infoPlist: { ITSAppUsesNonExemptEncryption: false },
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
    package: 'me.agarkov.tszhforpeople',
  },
  web: {
    output: 'single',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-web-browser',
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
        faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
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
