const { ObjectId } = require('mongodb');
const products = require('../../models/product.model.js');
const Category = require('../../models/category.model.js');
const Tag = require('../../models/tag.model.js');

module.exports = {
    GetTags: async (req, res, next) => {
      try {
          const results = await Tag.find();
          return res.status(200).json({
              error: false,
              message: 'success',
              data: results,
          });
      } catch (error) {
          next(error);
      }
    },
    
    CreateTag: async (req, res, next) => {
        try {
            const { name } = req.body;
            
            await Tag.create({
                name,
            });
            return res.status(201).json({
                error: false,
                message: 'new tag added',
            });
        } catch (error) {
            next(error);
        }
    },

    UpdateProduct: async (req, res, next) => {
        try {
            await products.updateOne({ _id: new ObjectId(req.params.id) }, {
                ...req.body,
            })
            return res.status(201).json({
                error: false,
                message: 'product edited',
            });
        } catch (error) {
            next(error);
        }
    }
}