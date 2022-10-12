import { RequestHandler } from 'express';
import User from '../models/user'



export namespace UserController{
    export const getNonGuestUsers: RequestHandler = (req, res, next) =>{
        const searchKey = req.query.searchKey;
        const queryMaker: Record<any,any> = {
            status: {$ne: 'Deleted'},
        }

        queryMaker['role'] = { $ne: 'Guest'}
        if(searchKey){
           queryMaker['$or'] = [
            {
                firstName: { $regex: searchKey, '$options' : 'i' }
            },
            {
                lastName: { $regex: searchKey, '$options' : 'i'}
            }
           ]           
        }
        console.log(queryMaker)
        User.find(queryMaker,(err: any, user: any)=>{
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
        User.findByIdAndUpdate({_id: id}, {...body,dateUpdated: new Date(),},{new: true}, (err: any, user: any)=>{
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

    export const getCustomerSatisfaction: RequestHandler = (req, res, next) =>{
        let queryMaker = {
            'feedback.description': { $ne: '' },
            'role': 'Guest',
        }

        User
        .find(queryMaker,(err: any, users: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: users
            })
        })
        .sort({dateUpdated: -1})
        .limit(10).then((users)=>{
            console.log(users);
        })
    }
}
