
const API_URL = 'http://192.168.1.24:8000/api';

export const createPaymentIntentApi = async (amount: number): Promise<string> => {
    const response = await fetch(`${API_URL}/create-payment-intent/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
    }

    const data = await response.json();
    return data.clientSecret;
};
