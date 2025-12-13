import { API_URL } from '@/config/env';
import axios from 'axios';

export const authApi = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 10000,
});
