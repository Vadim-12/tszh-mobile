import { PropsWithChildren } from 'react';
import {
	GestureResponderEvent,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import { Text } from 'react-native-paper';

interface IProps {
	header: string;
	content: PropsWithChildren['children'];
	onPress?: (e: GestureResponderEvent) => void;
}

export function Card({ header, content, onPress }: IProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.wrapper, pressed && { opacity: 0.7 }]}
		>
			<Text style={styles.header}>{header}</Text>
			<View style={styles.content}>{content}</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		borderColor: 'gray',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 10,
		padding: 6,
	},
	header: {
		fontSize: 15,
	},
	content: {
		marginTop: 4,
	},
});
