import { RequestHandler } from 'express';
import User from '../models/user'



export namespace UserController{
    export const getUsers: RequestHandler = (req, res, next) =>{
        const query = req.query;
        
    }

    export const getOne: RequestHandler = (req, res, next) => {
        // get id
        const id = req.params.id;
        User.findById({_id: id}, (err: any, user: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: user
            })
        })
        
    }

    export const updateOne: RequestHandler = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        User.findByIdAndUpdate({_id: id}, {...body},{new: true}, (err: any, user: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: user
            })
        })
    }
}
