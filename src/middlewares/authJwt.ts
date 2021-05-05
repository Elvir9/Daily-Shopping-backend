import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {JWT_SECRET} from '../config/auth';


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
 
    // check json web token exists & is verified
    if(token){
        jwt.verify(token, JWT_SECRET, (error: any, decodedToken: any) => {
            if(error){
                res.status(401).json({error: error.message});
            }else{
                res.locals.jwt = decodedToken;
                next()
            }
        })
    }
    else{
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
