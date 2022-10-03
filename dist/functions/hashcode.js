"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.generateCode = void 0;
const generateCode = (num) => {
    const maxLength = num;
    const numbers = "0123456789";
    let code = "";
    for (let x = 0; x < maxLength; x++) {
        code += numbers.charAt(Math.random() * numbers.length);
    }
    return code;
};
exports.generateCode = generateCode;
const generatePassword = (num) => {
    const maxLength = num;
    const numbers = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@$%&";
    let code = "";
    for (let x = 0; x < maxLength; x++) {
        code += numbers.charAt(Math.random() * numbers.length);
    }
    return code;
};
exports.generatePassword = generatePassword;
