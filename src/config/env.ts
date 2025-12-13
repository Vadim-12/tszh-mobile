import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};
console.log('extra', extra);

export const ENV_MODE = extra.envMode;
export const API_URL = extra.apiUrl;
console.log('API_URL from extra', API_URL);

export const isDev = ENV_MODE === 'development';
export const isProd = ENV_MODE === 'production';
export const isStaging = ENV_MODE === 'staging';
