module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: { '@': './src', '@/app': './app' },
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
				},
			],
			'react-native-paper/babel', // оптимизация Paper (серверные стили/тема)
		],
	};
};
