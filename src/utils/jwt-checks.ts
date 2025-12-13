import { JWTPayload } from '@/types/jwt';
import { jwtDecode } from 'jwt-decode';

export function isExpired(token?: string, leewaySec = 10): boolean {
	if (!token) return true;
	console.log('BEGIN CHECK EXPIRING TOKEN', token);
	try {
		const { exp } = jwtDecode<JWTPayload>(token);
		console.log('exp', exp);
		if (!exp) return true;
		const now = Date.now() / 1000;
		return now >= exp - leewaySec;
	} catch {
		return true;
	}
}

// «скоро протухнет» → пора молча рефрешить (например, за 60 секунд до exp)
export function shouldRefreshSoon(
	token?: string,
	refreshWindowSec = 60
): boolean {
	if (!token) return true;
	try {
		const { exp } = jwtDecode<JWTPayload>(token);
		if (!exp) return true;
		const now = Date.now() / 1000;
		return exp - now <= refreshWindowSec;
	} catch {
		return true;
	}
}
