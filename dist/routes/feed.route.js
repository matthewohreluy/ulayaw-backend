"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const feed_controller_1 = require("../controllers/feed.controller");
const isAuth_util_1 = require("../middleware/util/isAuth.util");
const router = (0, express_1.Router)();
router.get('/posts', isAuth_util_1.isAuth, feed_controller_1.Feed.getPosts);
router.post('/post', [
    (0, express_validator_1.body)('title').trim().isLength({ min: 5 }),
    (0, express_validator_1.body)('content').trim().isLength({ min: 5 })
], feed_controller_1.Feed.createPost);
exports.default = router;
