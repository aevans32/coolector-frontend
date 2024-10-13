export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    relation: 'classmate' | 'professor' | 'coworker' | 'friend' | 'other'; 
}