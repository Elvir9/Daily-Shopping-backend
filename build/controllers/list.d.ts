import { Request, Response, NextFunction } from 'express';
export declare const shoppingList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const editList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const aggregateList: (req: Request, res: Response) => Promise<void>;
