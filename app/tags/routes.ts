import express, { Request, Response } from "express";
import Tag from "./model";
const router = express.Router();

router.get('/tags', async(req:Request,res:Response) => {
  try {
      await Tag.sync();
      const tags = await Tag.findAll();
      res.json(tags);
  } catch (error) {
      res.json(error);
  }
});

router.post('/tags', async(req:Request,res:Response) => {
  const {name} = req.body;
  try {
      await Tag.sync();
      await Tag.create({name});
      res.json({
          "message": "Tag Created"
      });
    } catch (error) {
      res.send({'error' : error})
    }
});

router.put('/tags/:id',async(req:Request,res:Response) => {
  const {name} = req.body;
  try {
      await Tag.sync();
      await Tag.update({name}, {
        where: {
            id: req.params.id
        }
      });
      res.json({
          "message": "Tag Updated"
      });
    } catch (error) {
      res.send({'error' : error})
    }
});

router.delete('/tags/:id',async(req:Request,res:Response) => {
  try {
      await Tag.sync();
      await Tag.destroy({
        where: {
            id: req.params.id
          }
    });
    res.json({
      "message": "Tag Deleted"
  });
  } catch (error) {
      res.json(error);
  }
})

module.exports = router;