import express from "express";
const app = express();
var path = require('path');
var bodyParser = require('body-parser')
const product = require('./app/products/routes');
const tag = require('./app/tags/routes');
const category = require('./app/categories/routes');
const auth = require('./app/auth/routes')
import passport from 'passport';
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'mySecretKey', // set your own secret key
  resave: false,
  saveUninitialized: false
}));

app.use('/api',product);
app.use(tag);
app.use(category);
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
app.use(express.static(__dirname + '/public'));

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
/*
const connection:any = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'flip',
});

connection.connect((err:Error) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to MySQL');
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email:string, password:string, done:any) => {
  const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) {
    return done(null, false, { message: 'Incorrect email or password.' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return done(null, false, { message: 'Incorrect email or password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err:Error, rows:any) => {
    done(err, rows[0]);
  });
});

app.post('/login', passport.authenticate('local', { session: false }), async(req:any, res) => {
  const token = jwt.sign({ id: req?.user?.id }, config.jwtSecret);

  const user  = await User.update({token},{where:{id: req.user.id}});

  res.json({
    message: 'Login Successfully',
    user,
    token
});
});

app.get('/dashboard', isAuthenticated, (req:any, res) => {
  connection.query('SELECT * FROM users WHERE id = ?', [req.userId], (err:Error, rows:any) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    const user = rows[0];
    res.json({ user });
  });
});

app.use('/logout',isAuthenticated, (req:any, res) => {
  connection.query('UPDATE token=`` FROM users WHERE id = ?', [req.userId], (err:Error, rows:any) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    const user = rows[0];
    res.json({ user });
  });
})*/