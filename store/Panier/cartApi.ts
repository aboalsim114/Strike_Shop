import { Cart } from '../types';

const API_URL = 'http://192.168.1.24:8000/api';

export const fetchCartItemsApi = async (): Promise<Cart[]> => {
    const response = await fetch(`${API_URL}/cart/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }

    const cartItems = await response.json();

    const cartItemsWithProducts = await Promise.all(
        cartItems.map(async (item: any) => {
            const productResponse = await fetch(`${API_URL}/products/${item.product_id}`);
            const product = await productResponse.json();
            return { ...item, product };
        })
    );

    return cartItemsWithProducts;
};

export const addProductToCartApi = async (user_id: string, product_id: string, quantity: number = 1): Promise<Cart> => {
    const response = await fetch(`${API_URL}/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, product_id, quantity }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product to cart');
    }

    return response.json();
};





export const deleteCartItemApi = async (token: string, itemId: string) => {
    const response = await fetch(`${API_URL}/cart/${itemId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete cart item');
    }

    return itemId;
};






