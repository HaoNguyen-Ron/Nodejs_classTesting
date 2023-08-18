const yup = require('yup');
const fs = require('fs');
let data = require('../../data/categories.json');
const { writeFileSync, generationID, validateSchema, checkIdSchema, fuzzySearch } = require('../../utils');
const Category = require('../../models/category')

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
    const { name } = req.query;
    const filter = data.filter((item) => fuzzySearch(name).test(item.name))
    res.send(filter);
};

const create = async function (req, res, next) {
    const { name, isDeleted, description  } = req.body;

    const newP = { id: generationID(), name, isDeleted, description };
    if (data?.length > 0) {
        await writeFileSync('data/categories.json', [...data, newP]);
    } else {
        await writeFileSync('data/categories.json', [newP]);
    }
    squadJSON = JSON.parse(fs.readFileSync('data/categories.json', 'utf8'));

    res.send(200, {
        payload: squadJSON,
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

    await writeFileSync('data/products.json', data);

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