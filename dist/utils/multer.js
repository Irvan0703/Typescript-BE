"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorage = exports.fileFilter = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require('path');
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        // ...Do your stuff here.
        callback(null, file.originalname);
    }
});
