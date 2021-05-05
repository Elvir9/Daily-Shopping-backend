import User from '../models/user';
import { Request, Response, NextFunction } from 'express'

export const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction) => {
    try{
        User.findOne({
            username: req.body.username
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: 'Username is already in use!' });
            }
        })
        next()
    }catch(error){
        return res.status(500).send({message: error})
    }  
}
