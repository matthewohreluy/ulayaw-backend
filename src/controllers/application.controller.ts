import {RequestHandler} from 'express';
import Application from '../models/app';



export namespace ApplicationController{
    export const getApp: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;
        const query = {...body}
        Application.findById({_id: '636e5d86a8823d1bddddb65d'}, (err: any, application: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: application
            })
        })
    }


    export const updateApp: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;
        const query = {...body}
        Application.findByIdAndUpdate({_id: '636e5d86a8823d1bddddb65d'}, query,{new: true}, (err: any, application: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: application
            })
        })
    }

    export const updateLogo: RequestHandler = (req, res, next) =>{
        Application.findByIdAndUpdate({_id: '636e5d86a8823d1bddddb65d'}, {
            businessLogo: 'https://ulayaw-backend.herokuapp.com/logo/' + req.file!.filename
        },{new: true}, (err: any, application: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: application
            });
        })
    }

    export const addApp: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;
        const query = {...body}
        Application.insertMany({
            contact:'1',
             location: '1',
             email: '1',
             fbLink: '1',
             instaLink: '1',
             businessLogo: '1'
        }, (err: any, app: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: app
            })
        })
    }

}
