"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
var AdminController;
(function (AdminController) {
    AdminController.sendEmail = (req, res, next) => {
        const body = req.body;
        console.log('asdasd');
        return res.status(200).json({
            key: 'SUCCESS',
            payload: 'data'
        });
        // sendCustomEmail(body)
        // .then((data)=>{
        //     return res.status(200).json({
        //         key: 'SUCCESS',
        //         payload: data
        //     })
        // })
        // .catch((error)=>{
        //     return res.status(500).json({
        //         key: 'ERROR',
        //         error: error
        //     })
        // })
    };
})(AdminController = exports.AdminController || (exports.AdminController = {}));
