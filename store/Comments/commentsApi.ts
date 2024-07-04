import { Review, AddReviewPayload } from '../types';

const API_URL = 'http://192.168.11.197:8000/api';

export const fetchReviewsApi = async (productId: string): Promise<Review[]> => {
    const response = await fetch(`${API_URL}/products/${productId}/reviews/`);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch reviews');
    }

    const data = await response.json();
    return data;
};






export const addReviewApi = async (review: AddReviewPayload): Promise<Review> => {
    const response = await fetch(`${API_URL}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add review');
    }

    const data = await response.json();
    return data;
};