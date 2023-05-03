import express from "express";
import Product from "./model";
import { fileFilter, fileStorage } from "../../utils/multer";
import Tag from "../tags/model";
import ProductAtrribute from "../relational/products_attributes";
import { isAuthenticated } from "../../middleware/checkJWT";
const multer = require('multer');
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const router = express.Router();

router.get('/products', isAuthenticated, async (req, res) => {
  try {
    await Product.sync();
    await Tag.sync();
    const users = await Product.findByPk(4);
    const roles = await users?.getTag();

    console.log('ini adalah'+roles);
    res.json(users);
  } catch (error) {
    res.json({'error' : error})
  }
  
});

router.post('/products', upload.single('image'), async(req, res) => {
  const {name, price, stock, category, tags } = req.body;
  const image = req.file;
  
  try {
     await Product.sync();
     await Tag.sync();
     await ProductAtrribute.sync();
     const product = await Product.create({ name, price, stock, image_url: `http://localhost:3000/public/${image?.originalname}`, category});
     
     for(let i = 0; i < tags.length; i++){
      const tag = await Tag.findAll();
      let same : number = 0;
      if(tag.length < 0){
        const value = await Tag.create({name: tags[i]});
        const products = await Product.findByPk(product?.id);
        const attribute = await Tag.findByPk(value?.id);
        await products?.addTag(attribute);
      } else {
        for(let j = 0; j < tag.length; j++){
          console.log('ini adalah *'+tags[i]+'* ini adalah j'+tag[j].name)
          if(tags[i] === tag[j].name){
            same +=1;
          } 
        }

        if(same === 0){
          const value = await Tag.create({name: tags[i]});
          const products = await Product.findByPk(product?.id);
          const attribute = await Tag.findByPk(value?.id);
          await products?.addTag(attribute);
        } else{
          const products = await Product.findByPk(product?.id);
          const attribute = await Tag.findOne({ where: { name : tags[i] } });
          await products?.addTag(attribute);
        } 
      }
     }
     
        res.json({
            "message": product?.id
        });

  } catch (error) {
    res.json({'error' : error})
  }
})

router.put('/products/:id', upload.single('image'), async(req, res) => {
  const {name, price, stock, category, tags } = req.body;
  const image = req.file;
  try {
    await Product.sync();
    await Tag.sync();
    await ProductAtrribute.sync();

    await Product.update({name, price, stock, image_url: `http://localhost:3000/public/${image?.originalname}`, category}, {where: {id : req.params.id}});
    const attribute = await ProductAtrribute.findAll({where: {ProductId : req.params.id}});
    console.log( attribute);

    res.json({
      message: 'Success'
    })

  } catch (error) {
    res.json({error})
  }
})

router.delete('/products/:id', async(req, res) => {
  console.log('coba');
  try {
    await Product.sync();
    await ProductAtrribute.sync();

    await Product.destroy({where : {id :req.params.id}});
    await ProductAtrribute.destroy({where : {ProductId :req.params.id}});

    res.json({
      message: 'Successfully'
    })
  } catch (error) {
    res.json({
      error: error
    })
  }
})

module.exports = router;