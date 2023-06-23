const { ObjectId } = require('mongodb');
const products = require('../../models/product.model.js');
const Category = require('../../models/category.model.js');

module.exports = {
    GetProducts: async (req, res, next) => {
        try {
            const { page, limit, categoryId, name } = req.query;
            let match = {};
            
            // search by category
            if (categoryId) {
                match = {
                    ...match,
                    'category': categoryId,
                }
            }
            if (name) {
                match = {
                    ...match,
                    name: { $regex: name, $options: 'i' },
                }
            }
            const results = await 
            products.find(match)
                    .populate('category')
                    .populate('tags')
                    .limit(limit || 4) // jumlah yg dicari dari query
                    .skip(limit * (page - 1)) // jumlah data yg di abaikan
            const totalData = await products.find(match).count();
            const totalPages = Math.ceil(Number(totalData)/Number(limit || 5));
            return res.status(200).json({
                error: false,
                message: 'success',
                data: {
                    pagination: {
                        page: Number(page),
                        totalData,
                        totalPages,
                    },
                    results
                },
            });
        } catch (error) {
            next(error);
        }
    },

    GetProduct: async (req, res, next) => {
        try {
            const product = await 
            products.findById(req.params.id)
                    .populate('category')
                    .populate('tags');
            return res.status(200).json({
                error: false,
                message: 'success',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    },

    CreateProduct: async (req, res, next) => {
        try {
            const { name, description, price, stock, imageUrl, categoryId, tagIds } = req.body;
            await products.create({
                name,
                description,
                price,
                stock,
                category: categoryId,
                tags: tagIds,
                imageUrl,
            });
            return res.status(201).json({
                error: false,
                message: 'new product added',
            });
        } catch (error) {
            console.log(error);
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
    },

    DeleteProduct: async (req, res, next) => {
        try {
            await products.deleteOne({ _id: new ObjectId(req.params.id) });
            return res.status(201).json({
                error: false,
                message: 'product deleted',
            })
        } catch (error) {
            next(error);
        }
    }
}