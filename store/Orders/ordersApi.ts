const API_URL = 'http://192.168.11.102:8000/api'; 

export const fetchUserOrdersApi = async (token: string): Promise<any> => {
    const response = await fetch(`${API_URL}/orders/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
    }

    const data = await response.json();
    return data;
};
