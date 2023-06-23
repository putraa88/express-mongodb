const cartDB = require('../../models/cart.model');

module.exports = {
  async createCart (req, res, next) {
    try {
      // productIds = [array of product._id]
      const { productIds } = req.body;

      // ambil id dari decode token
      const { id } = req.user;

      const result = await cartDB.create({
        user: id,
        products: productIds,
      });

      return res.status(201).json({
        error: false,
        message: 'cart created',
        data: result,
      })
    } catch (error) {
      next(error);
    }
  },

  async getCart (req, res, next) {
    try {
      const result = await cartDB.findById(req.params.id).populate('products');
      if (!result) {
        throw ({ code: 404, message: 'cart not found' })
      }
      if (result && (req.user.id == result.user || req.user.isAdmin)) {
        return res.status(200).json({
          error: false,
          data: result,
        })
      } 
      throw ({ code: 403, message: 'unauthorized actions' });
    } catch (error) {
      next(error);
    }
  },

  async getAllCarts (req, res, next) {
    try {
      let result;
      if (!req.user.isAdmin) {
        // non admin only can view their carts
        result = await cartDB
                  .find({ user: req.user.id })
                  .populate('products');
      } else {
        // admin role only can view all carts
        result = await cartDB
                  .find()
                  .populate('products')
                  .populate('user', 'name');
      }
      return res.status(200).json({
        error: false,
        data: result,
      })
    } catch (error) {
      next(error);
    }
  },

  async updateCart (req, res, next) {
    try {
      const { productIds } = req.body;
      const { id } = req.params;
      const cart = await cartDB.findById(id);
      if (!cart) throw ({ code: 404, message: 'cart not found' });
      if (req.user.isAdmin || (req.user.id == cart.user)) {
        await cartDB.updateOne({ _id: id }, { products: productIds });
      } else {
        throw ({ code: 403, message: 'unauthorized actions' });
      }
      return res.status(201).json({
        error: false,
        message: 'cart updated',
      })
    } catch (error) {
      next(error);
    }
  },

  async deleteCart (req, res, next) {
    try {
      const { id } = req.params;
      const cart = await cartDB.findById(id);
      if (!cart) throw ({ code: 404, message: 'cart not found' });
      if (req.user.isAdmin || (req.user.id == cart.user)) {
        await cartDB.deleteOne({ _id: id });
      } else {
        throw ({ code: 403, message: 'unauthorized actions' });
      }
      return res.status(201).json({
        error: false,
        message: 'cart deleted',
      })
    } catch (error) {
      next(error);
    }
  }
}