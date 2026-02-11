import { Text } from 'react-native-paper';

interface IProps {
	message: string;
}

export function ErrorMessage({ message }: IProps) {
	return <Text style={{ color: 'red' }}>{message}</Text>;
}
