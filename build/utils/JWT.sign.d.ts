import IUser from '../interfaces/user';
export declare const signWithJWT: (user: IUser, callback: (error: Error | null, token: string | null) => void) => void;
