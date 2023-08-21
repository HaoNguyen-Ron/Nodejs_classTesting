const { default: mongoose } = require('mongoose');

const { fuzzySearch } = require('../../utils');

const {Customer} = require('../../models');

// mongoose.connect('mongodb://localhost:27017/node-32-database');
mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');


const getAll = async (req, res, next) => {
    try {
        const payload = await Customer.find({
            isDeleted: false
        });
        res.send(200, {
            payload: payload,
            message: "Tìm kiếm tất cả thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tìm kiếm tất cả thất bại"
        });
    }
};

//get detail
const getDetail = async function (req, res, next) {
    try {
        const { id } = req.params;

        const payload = await Customer.findOne({
            _id: id,
            isDeleted: false,
        });

        res.send(200, {
            payload: payload,
            message: "Tìm kiếm thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tìm kiếm không thành công hoặc sai mã Id"
        });
    }
};

//search
const search = async function (req, res, next) {
    try {
        const { name } = req.query;

        const conditionFind =  {isDeleted: false};

        if(name){
            conditionFind.name = fuzzySearch(name)
        };

        const payload = await Customer.find(conditionFind);

        res.send(200, {
            payload: payload,
            message: "Tim kiếm tên thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tim kiếm tên thất bại"
        });
    }
};

/** CREATE */

const create = async function (req, res, next) {
    const { firstName, lastName , birthday, email, phoneNumber, isDeleted, address, password } = req.body;

    try {
        const newCustomer = new Customer({
            firstName, 
            lastName , 
            birthday, 
            email, 
            phoneNumber, 
            isDeleted, 
            address, 
            password 
        });

        const payload = await newCustomer.save();


        res.send(200, {
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (err) {
        res.send(400, {
            err,
            message: "Tạo thất bại"
        });
    }
};

/** UPDATE */
const update = async function (req, res, next) {
    console.log('««««« saadas »»»»»');
    try {
      const { id } = req.params;
  
      const payload = await Customer.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { ...req.body },
        { new: true },
      );
  
      if (payload) {
        return res.send(200, {
          payload,
          message: "Cập nhập thành công"
        });
      }
      return res.send(404, { message: "Không tìm thấy" });
    } catch (error) {
      console.log('««««« error »»»»»', error);
      res.send(400, {
        error,
        message: "Cập nhập không thành công"
      });
    }
  };


/** DELETE */
const hardDelete = async function (req, res, next) {

    try {
        const { id } = req.params;
        const payload = await Customer.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false
            },
            { isDeleted: true },
            { new: true }
        );
        if (payload) {
            res.send(200, {
                payload: payload,
                message: "Xóa thành công"
            });
        }
        return res.send(200, 'Không tìm thấy tên nhà cung cấp')
    } catch (err) {
        res.send(400, {
            err,
            message: "Xóa thất bại"
        });
    }
};

module.exports = {
    getAll,
    search,
    getDetail,
    create,
    hardDelete,
    update
};