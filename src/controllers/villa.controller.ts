import {RequestHandler} from 'express';
import Villa from '../models/villa';



export namespace VillaController{
    export const getVillas: RequestHandler = (req, res, next) =>{
        Villa.find({}, (err: any, villas: any)=>{
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villas
            })
        })
    }

    export const getVilla: RequestHandler = (req, res, next) => {
        const id = req.params.id;
        Villa.findOne({
            _id: id
        }, (err: any, villa: any)=>{
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villa
            })
        })
    }
    
    export const addVilla: RequestHandler = (req, res, next) =>{
        const villa = new Villa({...req.body});
        villa.save((err, newVilla)=>{
            if(err){
                next(err)
            }
        return res.status(201).json({message: 'Villa created!', villaId: newVilla._id})
        })
        
    }
}
