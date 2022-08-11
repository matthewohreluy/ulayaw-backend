"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
var Feed;
(function (Feed) {
    Feed.getPosts = (req, res, next) => {
        console.log('getpost');
        res.status(200).json({
            _id: 1,
            posts: [{ title: 'First Post',
                    content: 'This is the first post!',
                    imageUrl: 'images/duck.jpg',
                    creator: { name: 'Matt', },
                    createdAt: new Date()
                }]
        });
    };
    Feed.createPost = (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                errors: errors.array()
            });
        }
        const title = req.body.title;
        const content = req.body.content;
        // Create post in db
        const post = new post_1.default({
            title: title,
            content: content,
            imageUrl: 'images/duck.jpg',
            creator: { name: 'Matt' }
        });
        post.save()
            .then((result) => {
            res.status(201).json({
                message: 'Post created Successfully!',
                post: result
            });
        })
            .catch(console.error);
    };
})(Feed = exports.Feed || (exports.Feed = {}));
