import { Card } from '@/components/card';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Text } from 'react-native-paper';

interface IProps {
	id: string;
	shortTitle: string;
	legalAddress: string;
}

export function OrganizationItem({ shortTitle, legalAddress, id }: IProps) {
	const router = useRouter();

	const content = useMemo(() => <Text>{legalAddress}</Text>, [legalAddress]);

	const onPress = useCallback(() => {
		router.push(`/organizations/${id}`);
	}, [id, router]);

	return <Card header={shortTitle} content={content} onPress={onPress} />;
}
