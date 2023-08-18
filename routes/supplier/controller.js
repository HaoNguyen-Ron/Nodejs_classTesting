const yup = require('yup');
const fs = require('fs');
let data = require('../../data/suppliers.json');
const { writeFileSync, generationID, validateSchema, checkIdSchema } = require('../../utils');

const getAll = (req, res, next) => {
    res.send(data)
};

const getId = function (req, res, next) {
    const { id } = req.params;

    const validationSchema = yup.number();

    validationSchema
        .validate(id)
        .then(() => {
            let result = data.find((x) => x.id == id);

            if (result) {
                return res.send({ code: 200, payload: result });
            }
            return res.send(404, { message: "Not found" });
        })
        .catch((err) => res.send(400, { message: "Bad request" })
        );
};

const getDetail = function (req, res, next) {
    const { price } = req.query;
    const filter = data.filter((item) => item.price >= price)
    res.send(filter);
};

const create = async function (req, res, next) {
    const { name, isDelete, email, phoneNumber, address } = req.body;

    const newP = { name, isDelete, email, phoneNumber, address, id: generationID() };
    if (data?.length > 0) {
        await writeFileSync('data/suppliers.json', [...data, newP]);
    } else {
        await writeFileSync('data/suppliers.json', [newP]);
    }

    res.send(200, {
        payload: newP,
        message: "Tạo thành công"
    });
};

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

const hardDelete = async function (req, res, next) {
    const { id } = req.params;

    data = data.filter((x) => x.id.toString() !== id.toString());

    await writeFileSync('data/suppliers.json', data);

    res.send({ ok: true, message: 'Deleted' });
};

module.exports = {
    getAll,
    getId,
    getDetail,
    create,
    hardDelete,
    update
};