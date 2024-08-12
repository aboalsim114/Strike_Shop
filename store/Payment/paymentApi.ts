// paymentApi.ts
const API_URL = 'http://192.168.11.102:8000/api'; 

export const createPaymentIntentApi = async (amount: number, token: string, paymentMethodId: string, currency: string): Promise<string> => {
    try {
        const response = await fetch(`${API_URL}/process-payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                amount: amount * 100, // Convert the amount to cents
                currency, 
                payment_method_id: paymentMethodId // Send with the correct key
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error response from backend:', errorData); // Log error response
            throw new Error(errorData.message || 'Failed to create payment intent');
        }

        const data = await response.json();
        return data.clientSecret;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};
