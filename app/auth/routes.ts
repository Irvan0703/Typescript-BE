import express, { Request, Response } from "express";
import User from "../users/model";
import config from "../config";
import { isAuthenticated } from "../../middleware/checkJWT";
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email:string, password:string, done:any) => {
  const user = await User.findOne({where:{email}});

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

passport.deserializeUser(async(id: number, done: any) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

router.post('/register', async(req:Request,res:Response) => {
    const { name, email, password, role } = req.body;
    try {
        await User.sync();
        const user = await User.create({ name, email, password, role});
        res.json(user);
      } catch (error) {
        res.send({'error' : error})
      }
  })

router.post('/login',passport.authenticate('local', { session: false }), async(req:any, res) => {
  const token = jwt.sign({ id: req?.user?.id }, config.jwtSecret);

  const user  = await User.update({token},{where:{id: req.user.id}});

  res.json({
    message: 'Login Successfully',
    user,
    token
});
});

router.get('/dashboard', isAuthenticated, async(req:any, res) => {

  console.log(req.body.id);
  const user  = await User.findOne({where:{id: req.body.id}});

  res.json({
    message: 'Login Successfully',
    user
});
});

router.post('/logout', isAuthenticated, async(req:any, res) => {

  await User.update({token:''},{where:{id: req.user.id}});

  res.json({
    message: 'Login Successfully',
});
})

module.exports = router;