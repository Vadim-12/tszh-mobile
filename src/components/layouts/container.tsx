import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = PropsWithChildren<{
	withKeyboard?: boolean;
	withScroll?: boolean;
}>;

export function Container({
	children,
	withKeyboard = false,
	withScroll = false,
}: ContainerProps) {
	const { colors, dark } = useTheme();

	const inner = (
		<SafeAreaView
			style={{
				flex: 1,
				width: '100%',
				paddingHorizontal: 20,
				backgroundColor: dark ? colors.background : colors.surface,
			}}
		>
			{withScroll ? (
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
				>
					{children}
				</ScrollView>
			) : (
				<View style={{ flex: 1 }}>{children}</View>
			)}
		</SafeAreaView>
	);

	if (!withKeyboard) return inner;

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			{inner}
		</KeyboardAvoidingView>
	);
}
