const { ObjectId } = require('mongodb');
const products = require('../../models/product.model.js');
const Category = require('../../models/category.model.js');

module.exports = {
      GetCategories: async (req, res, next) => {
        try {
            const results = await Category.find();
            return res.status(200).json({
                error: false,
                message: 'success',
                data: results,
            });
        } catch (error) {
            next(error);
        }
    },
    
    CreateCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            
            await Category.create({
                name,
            });
            return res.status(201).json({
                error: false,
                message: 'new category added',
            });
        } catch (error) {
            next(error);
        }
    },

    DeleteCateogry: async (req, res, next) => {
        // TODO:
        /*
        
            logic goes here
        */
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