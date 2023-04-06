import express, { Request, Response } from "express";
import User from "../users/model";
const router = express.Router();

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