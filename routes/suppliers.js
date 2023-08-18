
var express = require('express');
var router = express.Router();
const yup = require('yup');
const fs = require('fs');

const data = require('../data/suppliers.json');
const { writeFileSync, generationID, validateSchema } = require('../utils');

//////////////////GET
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(data);
});


//////////////////POST
router.post('/', async function (req, res, next) {
    const { name, email, phoneNumber, isDeleted = false, address } = req.body;

    const newP = { id: generationID(), name, email, phoneNumber, address };
    if (data?.length > 0) {
        await writeFileSync('data/suppliers.json', [...data, newP]);
    } else {
        await writeFileSync('data/suppliers.json', [newP]);
    }

    res.send(200, {
        payload: newP,
        message: "Tạo thành công"
    });
});

//////////////////PATCH
// const updateProductSchema = yup.object({
//     params: yup.object({
//         id: yup.number(),
//     }),
//     body: yup.object({
//         price: yup.number(),
//         name: yup.string(),
//     }),
// });

router.patch('/:id', function (req, res, next) {
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
  
  });


//////////////////DETELE
router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    data = data.filter((x) => x.id.toString() !== id.toString());

    console.log('««««« data »»»»»', data);

    res.send({ ok: true, message: 'Deleted' });
});

module.exports = router;