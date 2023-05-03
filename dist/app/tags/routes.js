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
const checkJWT_1 = require("../../middleware/checkJWT");
const router = express_1.default.Router();
router.get('/tags', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.sync();
        const tags = yield model_1.default.findAll();
        res.json(tags);
    }
    catch (error) {
        res.json(error);
    }
}));
router.post('/tags', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        yield model_1.default.sync();
        yield model_1.default.create({ name });
        res.json({
            "message": "Tag Created"
        });
    }
    catch (error) {
        res.send({ 'error': error });
    }
}));
router.put('/tags/:id', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        yield model_1.default.sync();
        yield model_1.default.update({ name }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Tag Updated"
        });
    }
    catch (error) {
        res.send({ 'error': error });
    }
}));
router.delete('/tags/:id', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.sync();
        yield model_1.default.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Tag Deleted"
        });
    }
    catch (error) {
        res.json(error);
    }
}));
module.exports = router;
