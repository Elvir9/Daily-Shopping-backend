import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import {JWT_SECRET} from '../config/auth';
import mongoose from 'mongoose';
import {signWithJWT} from '../utils/JWT.sign';

// Registration for new user
export const register = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try{
        bcrypt.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError
                });
            }
    
            const _user = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                password: hash
            });
    
            return _user
                .save()
                .then((user) => {
                    return res.status(201).json({
                        user
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        });
    }catch(error){
        return res.status(401).json({error: error})
    }
   
};

// User login
export const login = (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    User.find({username})
    .exec()
    .then(users => {
        if(users.length !== 1){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        bcrypt.compare(password, users[0].password, (error, result) => {
            if(error){
                return res.status(401).json({
                    message: 'Check email or password'
                });
            }else if (result){
                signWithJWT(users[0], (_error, token) => {
                    if(_error){
                        return res.status(500).json({
                            message: _error.message,
                            error: _error
                        });
                    }else if(token){
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            user: users[0]
                        });
                    }
                });
            }else {
                return res.status(401).json({success: false, message: 'passwords do not match'});
              }
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
};

// Reset users password
export const changePassword = async (req: Request, res: Response) => {
    const {token, newPassword} = req.body;
    try{
        const user:any = jwt.verify(token, JWT_SECRET);
        const _id = user.id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne(
            {_id},
            {
                $set: {password: hashedPassword}
            }
        )
        res.status(200).json({status: 'Password changed!'})
    }catch(error){
        res.status(500).json({error: error})
    }
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.body.userId, {password: 0});
    if(!user){
        return res.status(404).json('No User found');
    }
    res.json(user);
}
