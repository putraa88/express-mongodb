const addressDB = require('../../models/delivery-address.model');

module.exports = {
  async createAddress (req, res, next) {
    try {
      await addressDB.create({ ...req.body, user: req.user.id });
      res.status(201).json({
        error: false,
        message: 'address created',
      })
    } catch (error) {
      next(error);
    }
  },
  async getAddresses (req, res, next) {
    try {
      // construct where clause (bedain mana yg login sebagai user dan admin)
      let where = {};
      if (!req.user.isAdmin) {
        where = {
          ...where,
          user: req.user.id,
        }
      }
      const result = await addressDB.find(where);
      return res.status(200).json({
        error: false,
        data: result,
      })
    } catch (error) {
      next(error);
    }
  }
}