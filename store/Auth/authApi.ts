import { User } from '../types';

const API_URL = 'http://proven-quietly-raptor.ngrok-free.app/api';

export const loginApi = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login/`, {
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






export const registerApi = async ({ username, email, password, first_name, last_name }: User) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, first_name, last_name }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register');
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

