
import { Category } from '../types';


const API_URL = 'http://proven-quietly-raptor.ngrok-free.app/api';

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
