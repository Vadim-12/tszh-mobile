import { Container } from '@/components/layouts/container';
import { useLogout } from '@/hooks/auth/use-logout';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native-paper';

export default function ProfileScreen() {
	const { t } = useTranslation();
	const { mutate: logoutMutate } = useLogout();

	return (
		<Container>
			<Text
				variant='headlineSmall'
				style={{ textAlign: 'center', marginBottom: 8 }}
			>
				{t('profile.title')}
			</Text>
			<Button
				style={{ backgroundColor: 'yellow' }}
				onPress={() => logoutMutate()}
			>
				{t('profile.buttons.exit')}
			</Button>
		</Container>
	);
}
