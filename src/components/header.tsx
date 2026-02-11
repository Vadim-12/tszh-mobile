import { Text } from 'react-native-paper';

interface IProps {
	title: string;
}

export default function Header({ title }: IProps) {
	return (
		<Text
			variant='headlineSmall'
			style={{ textAlign: 'center', marginBottom: 8 }}
		>
			{title}
		</Text>
	);
}
