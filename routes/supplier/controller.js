const { default: mongoose } = require('mongoose');

const { fuzzySearch } = require('../../utils');

const Supplier = require('../../models/supplier');

// mongoose.connect('mongodb://localhost:27017/node-32-database');
mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');


const getAll = async (req, res, next) => {
    try {
        const payload = await Supplier.find({
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

        const payload = await Supplier.findOne({
            _id: id,
            isDeleted: false,
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

//search
const search = async function (req, res, next) {
    try {
        const { name } = req.query;

        const conditionFind =  {isDeleted: false};

        if(name){
            conditionFind.name = fuzzySearch(name)
        };

        const payload = await Supplier.find(conditionFind);

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
    const { name, email, phoneNumber, isDeleted, address } = req.body;

    try {
        const newSupplier = new Supplier({
            name,
            email,
            phoneNumber,
            address,
            isDeleted
        });

        const payload = await newSupplier.save();


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
const update = function (req, res, next) {
    try {
        const { id } = req.params;

        const patchData = req.body;

        let found = data.find((x) => x.id == id);

        if (found) {
            for (let propertyName in patchData) {
                found[propertyName] = patchData[propertyName];
            }
            res.send({ ok: true, message: 'Updated' });
        }
        res.send({ ok: false, message: 'Updated fail' });
    } catch (error) {
        res.send({ ok: false, message: 'Updated fail' });
    }
};


/** DELETE */
const hardDelete = async function (req, res, next) {

    try {
        const { id } = req.params;
        const payload = await Supplier.findOneAndUpdate(
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