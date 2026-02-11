import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export function Loader() {
	return (
		<View style={{ display: 'flex', justifyContent: 'center' }}>
			<ActivityIndicator />
		</View>
	);
}
