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
const multer_1 = require("../../utils/multer");
const model_2 = __importDefault(require("../tags/model"));
const products_attributes_1 = __importDefault(require("../relational/products_attributes"));
const checkJWT_1 = require("../../middleware/checkJWT");
const multer = require('multer');
const upload = multer({ storage: multer_1.fileStorage, fileFilter: multer_1.fileFilter });
const router = express_1.default.Router();
router.get('/products', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.sync();
        yield model_2.default.sync();
        const users = yield model_1.default.findByPk(4);
        const roles = yield (users === null || users === void 0 ? void 0 : users.getTag());
        console.log('ini adalah' + roles);
        res.json(users);
    }
    catch (error) {
        res.json({ 'error': error });
    }
}));
router.post('/products', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, stock, category, tags } = req.body;
    const image = req.file;
    try {
        yield model_1.default.sync();
        yield model_2.default.sync();
        yield products_attributes_1.default.sync();
        const product = yield model_1.default.create({ name, price, stock, image_url: `http://localhost:3000/public/${image === null || image === void 0 ? void 0 : image.originalname}`, category });
        for (let i = 0; i < tags.length; i++) {
            const tag = yield model_2.default.findAll();
            let same = 0;
            if (tag.length < 0) {
                const value = yield model_2.default.create({ name: tags[i] });
                const products = yield model_1.default.findByPk(product === null || product === void 0 ? void 0 : product.id);
                const attribute = yield model_2.default.findByPk(value === null || value === void 0 ? void 0 : value.id);
                yield (products === null || products === void 0 ? void 0 : products.addTag(attribute));
            }
            else {
                for (let j = 0; j < tag.length; j++) {
                    console.log('ini adalah *' + tags[i] + '* ini adalah j' + tag[j].name);
                    if (tags[i] === tag[j].name) {
                        same += 1;
                    }
                }
                if (same === 0) {
                    const value = yield model_2.default.create({ name: tags[i] });
                    const products = yield model_1.default.findByPk(product === null || product === void 0 ? void 0 : product.id);
                    const attribute = yield model_2.default.findByPk(value === null || value === void 0 ? void 0 : value.id);
                    yield (products === null || products === void 0 ? void 0 : products.addTag(attribute));
                }
                else {
                    const products = yield model_1.default.findByPk(product === null || product === void 0 ? void 0 : product.id);
                    const attribute = yield model_2.default.findOne({ where: { name: tags[i] } });
                    yield (products === null || products === void 0 ? void 0 : products.addTag(attribute));
                }
            }
        }
        res.json({
            "message": product === null || product === void 0 ? void 0 : product.id
        });
    }
    catch (error) {
        res.json({ 'error': error });
    }
}));
router.put('/products/:id', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, stock, category, tags } = req.body;
    const image = req.file;
    try {
        yield model_1.default.sync();
        yield model_2.default.sync();
        yield products_attributes_1.default.sync();
        yield model_1.default.update({ name, price, stock, image_url: `http://localhost:3000/public/${image === null || image === void 0 ? void 0 : image.originalname}`, category }, { where: { id: req.params.id } });
        const attribute = yield products_attributes_1.default.findAll({ where: { ProductId: req.params.id } });
        console.log(attribute);
        res.json({
            message: 'Success'
        });
    }
    catch (error) {
        res.json({ error });
    }
}));
router.delete('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('coba');
    try {
        yield model_1.default.sync();
        yield products_attributes_1.default.sync();
        yield model_1.default.destroy({ where: { id: req.params.id } });
        yield products_attributes_1.default.destroy({ where: { ProductId: req.params.id } });
        res.json({
            message: 'Successfully'
        });
    }
    catch (error) {
        res.json({
            error: error
        });
    }
}));
module.exports = router;
