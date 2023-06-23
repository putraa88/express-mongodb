const { ObjectId } = require('mongodb');

const dbProduct = require('../../config/mongoDb').collection('products');
module.exports = {
    GetProducts: async (req, res, next) => {
        try {
            const products = await dbProduct.find().toArray();
            return res.status(200).json(products);
        } catch (error) {
            
        }
    },

    GetProduct: async (req, res, next) => {
        await dbProduct.findOne({
            _id: new ObjectId(req.params.id)
        })
    },

    CreateProduct: async (req, res, next) => {
        try {
            await dbProduct.insertOne({
                ...req.body,
            });
            return res.status(201).json({ msg: 'product added' });
        } catch (error) {
            
        }
    },

    UpdateProduct: async (req, res, next) => {
        try {
            await dbProduct.updateOne({ _id: new ObjectId(req.params.id) },
            {
                $set: {
                    ...req.body
                }
            });
        } catch (error) {
            
        }
    }
}