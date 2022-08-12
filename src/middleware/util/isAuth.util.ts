import { IUserRequest } from './../../interfaces/user.interface';
import { NextFunction, Response, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';



export const isAuth: RequestHandler = (req: any, res: Response, next: NextFunction) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated');
        return res.status(401).json({error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED'})
    }
    const token = authHeader.split(' ')[1]!;
    let decodedToken: JwtPayload;
    try{
        decodedToken = jwt.verify(token, 'longapiKey') as JwtPayload;
    }catch (err: any){
        err.statusCode = 500;
        // throw err
        return res.status(401).json({error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED'})
    }

    if(!decodedToken){
        const error = new Error('Not Authenticated.');
        // throw error;
        return res.status(401).json({error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED'})
    }
    req.userId = decodedToken.userId;
    next();
};

