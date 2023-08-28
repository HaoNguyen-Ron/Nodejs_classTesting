
const { fuzzySearch } = require('../../utils');

const  Employee  = require('./model');


const getAll = async (req, res, next) => {
    try {
        const payload = await Employee.find({
            isDeleted: false
        });
        res.send(200, {
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tạo thất bại"
        });
    }
};

//get detail
const getDetail = async function (req, res, next) {
    try {
        const { id } = req.params;

        const payload = await Employee.findOne({
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

//getList 
const getList = async function (req, res, next) {
    try {
        const { page, pageSize } = req.query;
        const limit = pageSize || 3;
        const skip = limit * (page - 1) || 0;

        const conditionFind = { isDeleted: false };

        let results = await Employee.find(conditionFind)
            .skip(skip)
            .limit(limit)

        const total = await Employee.countDocuments(conditionFind)

        return res.send({ code: 200, payload: results, total });
    } catch (error) {
        console.log('««««« error »»»»»', error);
        return res.send(404, {
            message: "Không tìm thấy",
            error,
        });
    }
};

//search
const search = async function (req, res, next) {
    try {
        const { firstName, lastName, address, email } = req.query;
        const conditionFind = { isDeleted: false };

        if (firstName) conditionFind.firstName = fuzzySearch(firstName);
        if (lastName) conditionFind.lastName = fuzzySearch(lastName);
        if (address) conditionFind.address = fuzzySearch(address);
        if (email) conditionFind.email = fuzzySearch(email);

        const payload = await Employee.find(conditionFind);

        res.send(200, {
            payload,
            message: "Tìm kiếm thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tìm kiếm không thành công"
        });
    }
};


/** CREATE */

const create = async function (req, res, next) {
    try {
      const { firstName, lastName, email, phoneNumber, address, password, birthday } = req.body;
  
      const newEmployee = new Employee({
        firstName, lastName, email, phoneNumber, address, password, birthday
      });
  
      const payload = await newEmployee.save();
  
      res.send(200, {
        payload,
        message: "Tạo thành công"
      });
    } catch (error) {
      console.log('««««« error »»»»»', error);
      res.send(400, {
        error,
        message: "Tạo không thành công"
      });
    }
  };

/** UPDATE */
const update = async function (req, res, next) {
    console.log('««««« saadas »»»»»');
    try {
        const { id } = req.params;

        const payload = await Employee.findOneAndUpdate(
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
        const payload = await Employee.findOneAndUpdate(
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
    update,
    getList
};