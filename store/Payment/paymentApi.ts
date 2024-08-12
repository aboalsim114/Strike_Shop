const API_URL = 'http://192.168.11.102:8000/api'; 

export const createPaymentIntentApi = async (amount: number, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/process-payment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
