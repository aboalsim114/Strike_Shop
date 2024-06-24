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