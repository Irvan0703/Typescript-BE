import express, { Request, Response } from "express";
import Tag from "./model";
import { isAuthenticated } from "../../middleware/checkJWT";
const router = express.Router();

router.get('/tags',isAuthenticated, async(req:Request,res:Response) => {
  try {
      await Tag.sync();
      const tags = await Tag.findAll();
      res.json(tags);
  } catch (error) {
      res.json(error);
  }
});

router.post('/tags',isAuthenticated, async(req:Request,res:Response) => {
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

router.put('/tags/:id',isAuthenticated,async(req:Request,res:Response) => {
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

router.delete('/tags/:id',isAuthenticated,async(req:Request,res:Response) => {
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