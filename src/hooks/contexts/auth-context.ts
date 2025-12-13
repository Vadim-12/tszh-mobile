import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

export function useAuthContext() {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error('Auth context in undefined');
	}
	return authContext;
}
