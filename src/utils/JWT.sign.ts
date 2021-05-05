import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import IUser from '../interfaces/user';

export const signWithJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    let expirationTimeInSeconds = 60 * 60 * 24;
    
    try{
        jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET,
            {
                issuer: 'elvir-issuer',
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
        (error, token) => {
            if (error){
                callback(error, null);
            }else if (token){
                callback(null, token);
            }
        }
        );
    }catch(error){
        callback(error, null);
    }
}