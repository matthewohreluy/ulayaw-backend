import { validationResult } from 'express-validator';
import {RequestHandler} from 'express';
import Post from '../models/post';



export namespace Feed{
    export const getPosts: RequestHandler = (req, res, next) =>{
        console.log('getpost');
        res.status(200).json({
            _id: 1,
            posts: [{title: 'First Post', 
            content: 'This is the first post!',
            imageUrl: 'images/duck.jpg',
            creator: { name: 'Matt',},
            createdAt: new Date()
             }]
        })
    }
    export const createPost: RequestHandler = (req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                errors: errors.array()
            })
        }
        const title = req.body.title;
        const content = req.body.content;
        // Create post in db
        const post = new Post({
            title: title, 
            content: content,
            imageUrl: 'images/duck.jpg',
            creator: { name: 'Matt'}
        });
        post.save()
        .then((result)=>{
            res.status(201).json({
                message: 'Post created Successfully!',
                post: result
            })
        })
        .catch(console.error);
    }
}
