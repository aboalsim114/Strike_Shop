// Importation des fonctions nécessaires
import { User } from '../types';

const API_URL = 'http://your-backend-url/api';

export const loginApi = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
    }

    const data = await response.json();
    return {
        user: data.user as User,
        tokens: {
            access: data.access,
            refresh: data.refresh,
        },
    };
};

export const logoutApi = async (refreshToken: string) => {

    return Promise.resolve();
};
