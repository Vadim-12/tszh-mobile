import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { useTranslation } from 'react-i18next';

export default function BuildingsScreen() {
	const { t } = useTranslation();

	return (
		<Container>
			<Header title={t('buildings.title')} />
		</Container>
	);
}
