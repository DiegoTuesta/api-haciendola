export interface UserModel {
    id?:number;
    name?: string;
    username?: string;
    password?: string;
    status?: boolean;
}

export interface UserLogin {
    id: number;
    username: string;
    token: string;
}