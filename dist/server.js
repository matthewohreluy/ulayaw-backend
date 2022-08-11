"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes/routes");
const application_1 = require("./application");
const middleware_1 = require("./middleware/middleware");
const dotenv = __importStar(require("dotenv"));
const currentEnvironment = 'dev';
dotenv.config({ path: `src/environment/${currentEnvironment}/.env` });
const port = process.env.PORT || 8080;
const db_uri = process.env.MONGODB_URI;
const app = new application_1.App(port, middleware_1.middleware, routes_1.routes);
app.mongoDB(db_uri, (_response) => {
    console.log('Conenction Successful!');
    app.listen();
});
