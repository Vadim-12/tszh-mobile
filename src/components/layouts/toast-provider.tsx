import { useKeyboardHeight } from '@/hooks/use-keyboard-height';
import {
	AlertTriangle,
	CheckCircle2,
	Info,
	XCircle,
} from 'lucide-react-native';
import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Snackbar, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

type ShowOptions = {
	type?: ToastType;
	message: string;
	duration?: number;
	actionLabel?: string;
	onAction?: () => void;
};

type ToastContextType = {
	show: (opts: ShowOptions) => void;
	hide: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error('useToast must be used inside <ToastProvider />');
	return ctx;
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const keyboardHeight = useKeyboardHeight();

	const [visible, setVisible] = useState(false);
	const [opts, setOpts] = useState<ShowOptions>({ message: '', type: 'info' });

	const palette = useMemo(() => {
		const isDark = theme.dark;
		return {
			success: { bg: '#22c55e', fg: '#ffffff' },
			error: { bg: '#ef4444', fg: '#ffffff' },
			warning: { bg: '#f59e0b', fg: '#0b0b0b' },
			info: { bg: isDark ? '#60a5fa' : '#3b82f6', fg: '#ffffff' },
		} as const;
	}, [theme.dark]);

	const IconByType = {
		success: CheckCircle2,
		error: XCircle,
		warning: AlertTriangle,
		info: Info,
	} as const;

	const show = useCallback((next: ShowOptions) => {
		setOpts({ duration: 3000, type: 'info', ...next });
		setVisible(true);
	}, []);

	const hide = useCallback(() => setVisible(false), []);

	const { bg, fg } = palette[opts.type ?? 'info'];
	const Icon = IconByType[opts.type ?? 'info'];

	const base = insets.bottom + 32;
	const withKeyboard = keyboardHeight > 0 ? keyboardHeight - 16 : base;

	return (
		<ToastContext.Provider value={{ show, hide }}>
			{children}

			<Portal>
				<Snackbar
					visible={visible}
					onDismiss={hide}
					duration={opts.duration ?? 3000}
					action={
						opts.actionLabel
							? {
									label: opts.actionLabel,
									onPress: opts.onAction ?? (() => {}),
							  }
							: undefined
					}
					wrapperStyle={[styles.wrapper, { bottom: withKeyboard }]}
					style={[styles.snackbar, { backgroundColor: bg }]}
				>
					<View style={styles.row}>
						<Icon size={18} color={fg} style={styles.icon} />
						<Text style={[styles.text, { color: fg }]}>{opts.message}</Text>
					</View>
				</Snackbar>
			</Portal>
		</ToastContext.Provider>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	snackbar: {
		borderRadius: 12,
	},
	row: { flexDirection: 'row', alignItems: 'center' },
	icon: { marginRight: 8, marginTop: 1 },
	text: { fontSize: 15, flexShrink: 1 },
});
