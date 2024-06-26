
import { Category } from '../types';


const API_URL = 'http://192.168.8.23:8000/api';

export const getCategoriesApi = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_URL}/categories/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch categories');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
