// https://docs.expo.dev/guides/using-eslint/
// @ts-nocheck
import expoConfig from 'eslint-config-expo/flat';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  eslintConfigPrettier,
]);
