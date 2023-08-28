const { getQueryDateTime } = require('../../utils');

const {
  Category,
  Supplier,
  Customer,
  Employee,
  Product,
  Order,
} = require('../../model');

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount } = req.query;
      const conditionFind = {};

      if (discount) conditionFind.discount = { $gte: discount };

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const { discount, type } = req.query;
      const conditionFind = {};

      if (discount) {
        switch (Number(type)) {
          case 0:
            conditionFind.discount = { $eq: discount };
            break;

          case 1:
            conditionFind.discount = { $lt: discount };
            break;

          case 2:
            conditionFind.discount = { $lte: discount };
            break;

          case 3:
            conditionFind.discount = { $gt: discount };
            break;

          case 4:
            conditionFind.discount = { $gte: discount };
            break;

          default:
            conditionFind.discount = { $eq: discount };
            break;
        }
      }

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
      
    }
  },

  question2: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 5 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const { stock } = req.query;
      const conditionFind = {};

      if (stock) conditionFind.stock = { $lte: stock };

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const { stock, type } = req.query;
      const conditionFind = {};

      if (stock) {
        switch (Number(type)) {
          case 0:
            conditionFind.stock = { $eq: stock };
            break;

          case 1:
            conditionFind.stock = { $lt: stock };
            break;

          case 2:
            conditionFind.stock = { $lte: stock };
            break;

          case 3:
            conditionFind.stock = { $gt: stock };
            break;

          case 4:
            conditionFind.stock = { $gte: stock };
            break;

          default:
            conditionFind.stock = { $eq: stock };
            break;
        }
      }

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
      
    }
  },
};