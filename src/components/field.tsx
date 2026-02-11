import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface IProps {
	label: string;
	value: ReactNode;
}

export function Field({ label, value }: IProps) {
	return (
		<View style={styles.tableRow}>
			<Text style={styles.tableCell}>{label}</Text>
			<Text style={styles.tableCell}>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	tableRow: {
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	tableCell: {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
