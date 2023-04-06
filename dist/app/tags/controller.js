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
const Tag = require('./model');
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    console.log(req.body);
    try {
        yield Tag.sync();
        yield Tag.create({ name });
        res.json({
            "message": "Tag Created"
        });
    }
    catch (error) {
        res.send({ 'error': error });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Tag.sync();
        const tags = yield Tag.findAll();
        res.send(tags);
    }
    catch (error) {
        res.send(error);
    }
});
module.exports = {
    store,
    index
};
