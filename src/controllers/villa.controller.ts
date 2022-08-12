import { validationResult } from 'express-validator';
import {RequestHandler} from 'express';
import Villa from '../models/villa';



export namespace VillaController{
    export const getVillas: RequestHandler = (req, res, next) =>{
        
    }

    export const getVilla: RequestHandler = (req, res, next) => {

    }
    
    export const addVilla: RequestHandler = (req, res, next) =>{
        const villa = new Villa({...req.body});
        villa.save((err, newVilla)=>{
            if(err){
                next(err)
            }
        return res.status(201).json({message: 'Villa created!', userId: newVilla._id})
        })
        
    }
}
