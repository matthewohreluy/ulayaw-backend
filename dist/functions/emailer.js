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
exports.sendCustomEmail = exports.sendEmail = void 0;
const SibApiV3Sdk = __importStar(require("sib-api-v3-typescript"));
const dotenv = __importStar(require("dotenv"));
const currentEnvironment = 'dev';
dotenv.config({ path: `src/environment/${currentEnvironment}/.env` });
const sendEmail = (userData, html) => {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SIB_API);
    apiInstance.sendTransacEmail({
        'subject': '[ULAYAW] Confirm your email',
        'sender': { 'email': 'support@ulayaw.com', 'name': 'Ulayaw Support Team' },
        'to': [{ 'email': userData.email, 'name': userData.firstName + ' ' + userData.lastName },],
        'htmlContent': html,
    }).then(function (data) {
    }, function (error) {
        console.error(error);
    });
};
exports.sendEmail = sendEmail;
const sendCustomEmail = (data) => {
    return new Promise((resolve, reject) => {
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SIB_API);
        apiInstance.sendTransacEmail({
            'subject': '[ULAYAW] ' + data.subject,
            'sender': { 'email': data.email, 'name': data.name },
            'to': [{ 'email': data.receiver, 'name': data.receiverName },],
            'htmlContent': data.message,
        }).then(function (data) {
            resolve(data);
        }, function (error) {
            reject(error);
        });
    });
};
exports.sendCustomEmail = sendCustomEmail;
// const SibApiV3Sdk = require('sib-api-v3-typescript');
// let apiInstance = new SibApiV3Sdk.AccountApi()
// Configure API key authorization: apiKey
// apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, 'YOUR API KEY');
// apiInstance.getAccount().then(function(data) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
//   console.error(error);
// });
