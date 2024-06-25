import { Product } from '../types';

const API_URL = 'http://proven-quietly-raptor.ngrok-free.app/api';

export const getProductsApi = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch products');
    }

    return response.json();
};
