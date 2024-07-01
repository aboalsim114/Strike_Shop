export interface User {
    user: any;
    id: string;
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'user';
    avatar: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    stock: boolean;
    category_id: string;
    created_at: string;
    updated_at: string;
}

export interface Cart {
    id: string;
    user_id: string;
    product: Product;
    quantity: number;
    created_at: string;
    updated_at: string;
}


export interface ProductReview {
    id: string;
    product_id: string;
    user_id: string;
    comment: string;
    created_at: string;
}

export interface Payment {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: string;
    order: string;
    product: string;
    quantity: number;
    unit_price: number;
}

export interface CartState {
    items: Cart[];
    loading: boolean;
    error: string | null;
}



export interface Review {
    id: string;
    product_id: string;
    user_id: string;
    comment: string;
    username: string;
    
}