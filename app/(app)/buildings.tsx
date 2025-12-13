import { Container } from '@/components/layouts/container';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

export default function BuildingsScreen() {
	const { t } = useTranslation();
	return (
		<Container>
			<Text
				variant='headlineSmall'
				style={{ textAlign: 'center', marginBottom: 8 }}
			>
				{t('buildings.title')}
			</Text>
		</Container>
	);
}
