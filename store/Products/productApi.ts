import { Product } from '../types';

const API_URL = 'http://192.168.8.23:8000/api';

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






export const getProductByIdApi = async (productId: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${productId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch product details');
    }

    return response.json();
};