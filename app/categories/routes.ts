import express, { Request, Response } from "express";
import Category from "./model";
const router = express.Router();

router.get('/categories', async(req:Request,res:Response) => {
    try {
        await Category.sync();
        const category = await Category.findAll();
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});
router.post('/categories', async(req:Request,res:Response) => {
    try {
        const {name} = req.body;
        await Category.sync();
        await Category.create({name});
        res.json({
            "message": "Category Created"
        });
      } catch (error) {
        res.send(error)
      }
});

module.exports = router;