"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(port, middleware, routes) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.middleware(middleware);
        this.routes(routes);
    }
    middleware(mware) {
        mware.forEach((m) => {
            this.app.use(m);
        });
    }
    routes(routes) {
        routes.forEach((r) => {
            this.app.use(r[0], r[1]);
        });
    }
    addMiddleWare(mware) {
        this.app.use(mware);
    }
    mongoDB(uri, callback) {
        console.log('establishing database connection...');
        mongoose_1.default
            .connect(uri)
            .then(result => callback(result))
            .catch(err => callback(err));
        // mongoose.connection.on("disconnected", connect)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on PORT: ${this.port}`);
        });
    }
}
exports.App = App;
