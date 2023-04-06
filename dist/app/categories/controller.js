"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require('./model');
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield Category.sync();
        yield Category.create({ name });
        res.json({
            "message": "Tag Created"
        });
    }
    catch (error) {
        res.send(error);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category.sync();
        const category = yield Category.findAll();
        res.send(category);
    }
    catch (error) {
        res.send(error);
    }
});
module.exports = {
    store,
    index
};
