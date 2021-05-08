import { Request, Response, NextFunction } from 'express';
export declare const register: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const login: (req: Request, res: Response, next: NextFunction) => void;
export declare const changePassword: (req: Request, res: Response) => Promise<void>;
export declare const profile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
