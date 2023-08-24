const { fuzzySearch } = require('../../utils');

const Product = require('./model');
const Category = require('./../category/model')
const Supplier = require('./../supplier/model')


module.exports = {
  getAll: async (req, res, next) => { // NOTE
    try {
      let results = await Product.find({
        isDeleted: false,
      })
        .populate('category') //productSchema.virtual('category'), at models/product
        .populate('supplier') //productSchema.virtual('supplier'), at models/product
        .lean();

      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.send(404, {
        message: "Không tìm thấy",
        err,
      });
    }
  },

  getList: async (req, res, next) => { // NOTE
    try {
      const { page, pageSize } = req.query;
      const limit = pageSize || 12;
      const skip = limit * (page - 1) || 0;

      const conditionFind = { isDeleted: false };

      let results = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier')
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Product.countDocuments(conditionFind)

      return res.send({ code: 200, payload: results, total });
    } catch (err) {
      return res.send(404, {
        message: "Không tìm thấy",
        err,
      });
    }
  },

  //search
  search: async (req, res, next) => {
    try {
      const { name, categoryId, priceStart, priceEnd, supplierId, limit, stockStart, stockEnd, page } = req.query;
      const conditionFind = { isDeleted: false };

      if (name) conditionFind.name = fuzzySearch(name);

      if (categoryId) {
        conditionFind.categoryId = categoryId;
      };

      if (supplierId) {
        conditionFind.supplierId = supplierId;
      };

      if (priceStart && priceEnd) { // 20 - 50
        const compareStart = { $lte: ['$price', priceEnd] }; // '$field'
        const compareEnd = { $gte: ['$price', priceStart] };
        conditionFind.$expr = { $and: [compareStart, compareEnd] };
      } else if (priceStart) {
        conditionFind.price = { $gte: parseFloat(priceStart) };
      } else if (priceEnd) {
        conditionFind.price = { $lte: parseFloat(priceEnd) };
      }

      const result = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier');

      res.send(200, {
        message: "Thành công",
        payload: result,
      });
    } catch (error) {
      return res.send(404, {
        message: "Không tìm thấy",
      })
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let result = await Product.findOne({
        _id: id,
        isDeleted: false,
      })
        .populate('category')
        .populate('supplier');

      if (result) {
        return res.send({ code: 200, payload: result });
      }

      return res.status(404).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    }
  },

  //CREATE
  create: async (req, res, next) => {
    try {
      const { name, price, discount, stock, description, supplierId, categoryId } = req.body;

      // const existSupplier = await Supplier.find({
      //   _id: supplierId,
      //   isDeleted: false,
      // });
      // const existCategory = await Category.find({
      //   _id: categoryId,
      //   isDeleted: false,
      // });
      const getSupplier = Supplier.findOne({
        _id: supplierId,
        isDeleted: false,
      });
      const getCategory = Category.findOne({
        _id: categoryId,
        isDeleted: false,
      });

      const [existSupplier, existCategory] = await Promise.all([getSupplier, getCategory]);

      const error = [];
      if (!existSupplier) error.push("Nhà cung cấp không khả dụng");
      if (!existCategory) error.push("Danh mục không khả dụng");

      if (error.length > 0) {
        return res.send(400, {
          error,
          message: "Không khả dụng"
        });
      }

      // if (!existSupplier && !existCategory) {
      //   return res.send(400, {
      //     message: "Nhà cung cấp & Danh mục không khả dụng",
      //   });
      // }
      // if (!existSupplier) {
      //   return res.send(400, {
      //     message: "Nhà cung cấp không khả dụng",
      //   });
      // }
      // if (!existCategory) {
      //   return res.send(400, {
      //     message: "Danh mục không khả dụng",
      //   });
      // }

      const newRecord = new Product({
        name, price, discount, stock, description, supplierId, categoryId,
      });

      let result = await newRecord.save();

      return res.send(200, {
        message: "Thành công",
        payload: result,
      });
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return res.send(404, {
        message: "Có lỗi",
        error,
      });
    }
  },

  //UPDATE
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, discount, stock, description, supplierId, categoryId } = req.body;

      // Check if the product exists and is not deleted
      const product = await Product.findOne({ _id: id, isDeleted: false });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the supplier exists and is not deleted
      if (product.supplierId !== supplierId) {
        const supplier = await Supplier.findOne({ _id: supplierId, isDeleted: false });

        if (!supplier) {
          return res.status(400).json({ message: "Supplier not available" });
        }
      }

      // Check if the category exists and is not deleted
      if (product.categoryId !== categoryId) {
        const category = await Category.findOne({ _id: categoryId, isDeleted: false });

        if (!category) {
          return res.status(400).json({ message: "Category not available" });
        }
      }

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id, isDeleted: false },
        { name, price, discount, stock, description, supplierId, categoryId },
        { new: true }
      );

      if (updatedProduct) {
        return res.status(200).json({
          message: "Update successful",
          payload: updatedProduct,
        });
      }

      return res.status(400).json({ message: "Update failed" });

    } catch (error) {
      console.log('««««« error »»»»»', error);
      return res.send(404, {
        message: "Có lỗi",
        error,
      });
    }
  },

  //DELETE
  hardDelete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
      );

      if (result) {
        return res.send(200, {
          message: "Xóa thành công",
          payload: result,
        });
      }

      return res.send(400, {
        message: "Thất bại",
      });
    } catch (error) {
      return res.send(404, {
        message: "Không tìm thấy",
        error,
      });
    }
  },
};