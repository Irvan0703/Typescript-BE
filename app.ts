import express from "express";
const app = express();
var path = require('path');
const product = require('./app/products/routes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/api',product);

app.use('/',function(req,res){
    res.render('index',{
      title: 'Eduwork API Service'
    });
  })

app.listen(3000, () => {
    console.log("Node server started running");
    /*try {
        await sequelizeConnection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }*/
});