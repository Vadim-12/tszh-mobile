import { Field } from '@/components/field';
import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { ThemeToggler } from '@/components/theme-toggler';
import { useLogout } from '@/hooks/api/auth/use-logout';
import { useMe } from '@/hooks/api/user/use-me';
import { Loader } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
	const { t } = useTranslation();
	const { data, isLoading } = useMe();
	const { mutate: logoutMutate } = useLogout();

	return (
		<Container>
			<View style={styles.wrapper}>
				<Header title={t('profile.title')} />
				<View style={styles.content}>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{data?.full_name && (
								<Field
									label={t('profile.fields.fullName')}
									value={data.full_name}
								/>
							)}
							{data?.email && (
								<Field label={t('profile.fields.email')} value={data.email} />
							)}
							{data?.phone_number && (
								<Field
									label={t('profile.fields.phoneNumber')}
									value={data.phone_number}
								/>
							)}
						</>
					)}
					<ThemeToggler />
				</View>

				<Button
					mode='contained'
					icon='logout'
					onPress={() => logoutMutate()}
					style={styles.button}
				>
					{t('profile.buttons.exit')}
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
	content: {
		width: '100%',
		flex: 1,
		marginBottom: 10,
	},
	button: {
		width: '100%',
	},
});
