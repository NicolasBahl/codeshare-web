export interface UserData {
    id: string;
    username: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    score?: number;
    level?: string;
}