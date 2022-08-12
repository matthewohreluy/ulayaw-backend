import { Router } from "express";
import { body } from 'express-validator';

import { Feed } from "../controllers/feed.controller";
import { isAuth } from '../middleware/util/isAuth.util';

const router = Router();

router.get('/posts',isAuth, Feed.getPosts);

router.post('/post', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
] ,Feed.createPost);

export default router;