"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
var path = require('path');
var bodyParser = require('body-parser');
const product = require('./app/products/routes');
const tag = require('./app/tags/routes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', product);
app.use(tag);
app.use('/', function (req, res) {
    res.render('index', {
        title: 'Eduwork API Service'
    });
});
app.listen(3000, () => {
    console.log("Node server started running");
    /*try {
        await sequelizeConnection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }*/
});
