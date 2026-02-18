import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};
console.log('extra', extra);

export const ENV_MODE = extra.envMode;
export const API_URL = extra.apiUrl;

export const isProd = ENV_MODE === 'production';
export const isBeta = ENV_MODE === 'beta';
