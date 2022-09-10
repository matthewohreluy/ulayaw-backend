"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        return res.status(401).json({ error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'longapiKey');
    }
    catch (err) {
        err.statusCode = 500;
        // throw err
        return res.status(401).json({ error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED' });
    }
    if (!decodedToken) {
        const error = new Error('Not Authenticated.');
        // throw error;
        return res.status(401).json({ error: 401, message: 'This request is not authenticated', key: 'UNAUTHENTICATED' });
    }
    req.body.userId = decodedToken.userId;
    req.body.email = decodedToken.email;
    next();
};
exports.isAuth = isAuth;
