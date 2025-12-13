import { ITokens } from '@/services/tokens-service/types';
import { createContext } from 'react';

interface IAuthContextValue {
	tokens: ITokens | null;
	setTokens: (tokens: ITokens | null) => Promise<void>;
}

export const AuthContext = createContext<IAuthContextValue | null>(null);
