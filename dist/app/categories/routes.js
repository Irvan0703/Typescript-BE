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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("./model"));
const router = express_1.default.Router();
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.sync();
        const category = yield model_1.default.findAll();
        res.json(category);
    }
    catch (error) {
        res.json(error);
    }
}));
router.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield model_1.default.sync();
        yield model_1.default.create({ name });
        res.json({
            "message": "Category Created"
        });
    }
    catch (error) {
        res.send(error);
    }
}));
module.exports = router;
