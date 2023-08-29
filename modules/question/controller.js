const { getQueryDateTime, fuzzySearch  } = require('../../utils');

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

  question3: async (req, res, next) => {
    try {
      // let discountedPrice = price * (100 - discount) / 100;
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = { $expr: { $lte: [d, 1000] } };
      // const conditionFind = { $expr: { $lte: [{ $divide: [{ $multiply: ['$price', { $subtract: [100, '$discount'] }] }, 100] }, 1000] } };
      // const conditionFind = { discount : { $lte: 1000 }}; SAI

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier")
        // .select('-categoryId -supplierId -description')
        .lean(); // convert data to object

      // const newResults = results.map((item) => {
      //   const dis = item.price * (100 - item.discount) / 100;
      //   return {
      //     ...item,
      //     dis,
      //   }
      // }).filter((item) => item.dis <= 1000);

      // console.log('««««« newResults »»»»»', newResults);

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

  question3a: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const { price } = req.query;

      const conditionFind = { $expr: { $lte: [d, parseFloat(price)] } };

      let results = await Product.find(conditionFind).lean(); // convert data to object

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

  question3c: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      let results = await Product.aggregate()
        .match({ $expr: { $lte: [d, 20000] } });

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


  //-----------------aggregate
  question3d: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      //-------------Ver-1
      // let results = await Product.aggregate([
      //   { $addFields: { disPrice: d } },
      //   {
      //     $match: { $expr: { $lte: ['$disPrice', 1000] } },
      //   },
      //   {
      //     $project: {
      //       categoryId: 0,
      //       supplierId: 0,
      //       description: 0,
      //     },
      //   },
      // ]);

      //-------------Ver-2
      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match({ $expr: { $lte: ['$disPrice', 10000] } })
        .project({
          categoryId: 0,
          supplierId: 0,
          description: 0,
          isDeleted: 0,
          price: 0,
          discount: 0,
        });

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

  question3e: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match({ $expr: { $lte: ['$disPrice', 1000] } })
        .lookup({
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories',
        })
        .unwind('categories')
        .lookup({
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'suppliers',
        })
        .unwind('suppliers')
        .project({
          categoryId: 0,
          supplierId: 0,
          description: 0,
          isDeleted: 0,
          suppliers: {
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        });

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

  question4: async (req, res, next) => {
    try {
      
      const { address, isDeleted } = req.query;
      const conditionFind = { 
        address: fuzzySearch(address)
      };

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

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

  question5: async (req, res, next) => {
    try {
      
      const { year  } = req.query;
      const conditionFind = {
        $expr: {
          $eq: [{ $year: '$birthday' }, year],
        },
      };
      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

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


};