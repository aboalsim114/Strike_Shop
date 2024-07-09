import { User } from '../types';

const API_URL = 'http://192.168.8.187:8000/api';

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










export const getProfileApi = async (token: string): Promise<User> => {
    try {
        console.log('Fetching profile with token:', token);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        console.log('Headers:', headers); 

        const response = await fetch(`${API_URL}/profile/`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error fetching profile:', error);
            throw new Error(error.detail || 'Failed to fetch user profile');
        }

        const data = await response.json();
        console.log('Profile data:', data); 
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};







export const updateProfileApi = async (token: string, userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/profile/update/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update user profile');
    }

    const data = await response.json();
    return data;
};
