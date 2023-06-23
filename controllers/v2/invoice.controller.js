const invoiceDB = require('../../models/invoice.model');

const invGenerator = require('../../utils/invoice-number-generator');

module.exports = {
  async generate (req, res, next) {
    try {
      const { cartId, addressId } = req.body;
      await invoiceDB.create({
        invoiceNumber: invGenerator(req.user.id),
        user: req.user.id,
        cart: cartId,
        address: addressId,
        isPaid: false,
      });
      res.status(201).json({
        error: false,
        message: 'invoice generated'
      })
    } catch (error) {
      next(error);
    }
  },

  async getInvoices (req, res, next) {
    try {
      const result = await invoiceDB
                .find({ user: req.user.id }) // invoice table yg user: user_id = token
                .populate('user', 'name') // left join ke user ambil namanya aja
                .populate({ // left join ke cart ambi id sama products ==> di join ambil id sama nama
                  path: 'cart',
                  select: { _id: 1, products: 1 },
                  populate: {
                    path: 'products',
                    model: 'products',
                    select: { _id: 1, name: 1, }
                  }
                })
                .populate('address', 'address');
      res.status(200).json({
        error: false,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}