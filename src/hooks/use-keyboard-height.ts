import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

export function useKeyboardHeight() {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const showEvent =
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
		const hideEvent =
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

		const onShow = (e: KeyboardEvent) => setHeight(e.endCoordinates.height);
		const onHide = () => setHeight(0);

		const s1 = Keyboard.addListener(showEvent, onShow);
		const s2 = Keyboard.addListener(hideEvent, onHide);

		return () => {
			s1.remove();
			s2.remove();
		};
	}, []);

	return height;
}
