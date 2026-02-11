import { ErrorMessage } from '@/components/error-message';
import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { Loader } from '@/components/loader';
import { OrganizationItem } from '@/components/organizations/OrganizationItem';
import { useOrganizations } from '@/hooks/api/organizations/use-organizattions';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function OrganizationsScreen() {
	const { t } = useTranslation();
	const router = useRouter();

	const { data, isLoading, error } = useOrganizations();

	const handleCreate = useCallback(() => {
		router.push('/organizations/create');
	}, [router]);

	return (
		<Container>
			<Header title={t('organizations.title')} />
			{isLoading ? (
				<Loader />
			) : error ? (
				<ErrorMessage message={error.message} />
			) : (
				<>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<OrganizationItem
								id={item.id}
								shortTitle={item.shortTitle}
								legalAddress={item.legalAddress}
							/>
						)}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
					/>
					<Button icon='plus' mode='contained' onPress={handleCreate}>
						{t('organizations.buttons.create')}
					</Button>
				</>
			)}
		</Container>
	);
}
