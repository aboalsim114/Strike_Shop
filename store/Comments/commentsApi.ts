import { Review } from '../types';

const API_URL = 'http://192.168.10.121:8000/api';

export const fetchReviewsApi = async (productId: string): Promise<Review[]> => {
    const response = await fetch(`${API_URL}/products/${productId}/reviews/`);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch reviews');
    }

    const data = await response.json();
    return data;
};