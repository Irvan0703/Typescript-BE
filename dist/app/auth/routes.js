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
const model_1 = __importDefault(require("../users/model"));
const config_1 = __importDefault(require("../config"));
const checkJWT_1 = require("../../middleware/checkJWT");
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express_1.default.Router();
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({ where: { email } });
    if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
    }
    const isValidPassword = yield bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect email or password.' });
    }
    return done(null, user);
})));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findOne({ where: { id } });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        yield model_1.default.sync();
        const user = yield model_1.default.create({ name, email, password, role });
        res.json(user);
    }
    catch (error) {
        res.send({ 'error': error });
    }
}));
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = jwt.sign({ id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id }, config_1.default.jwtSecret);
    const user = yield model_1.default.update({ token }, { where: { id: req.user.id } });
    res.json({
        message: 'Login Successfully',
        user,
        token
    });
}));
router.get('/dashboard', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.id);
    const user = yield model_1.default.findOne({ where: { id: req.body.id } });
    res.json({
        message: 'Login Successfully',
        user
    });
}));
router.post('/logout', checkJWT_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.default.update({ token: '' }, { where: { id: req.user.id } });
    res.json({
        message: 'Login Successfully',
    });
}));
module.exports = router;
