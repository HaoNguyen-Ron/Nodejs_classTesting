var express = require('express');
var router = express.Router();
const fs = require('fs');


const {
  getAll,
  getId,
  getDetail,
  create,
  hardDelete,
  update
} = require('./controller')

const {updateProductSchema} = require('./validation')

// V-1
// const generationID = () => Math.floor(Date.now());
// const writeFileSync = (path, data) => {
//   fs.writeFileSync(path, JSON.stringify(data), function (err) {
//     if (err) {
//       console.log('««««« err »»»»»', err);
//       throw err
//     };
//     console.log('Saved!');
//   });
// };
// let data = [
//   { id: 1, name: 'iPhone 14 Pro Max', price: 1500 },
//   { id: 2, name: 'iPhone 13 Pro Max', price: 1200 },
//   { id: 3, name: 'iPhone 12 Pro Max', price: 1000 },
//   { id: 4, name: 'iPhone 11 Pro Max', price: 800 },
//   { id: 9, name: 'iPhone X', price: 500 },
// ];



//V-2 : Chuyển về file data, utils
const data = require('../../data/products.json');
const { writeFileSync, generationID, validateSchema,checkIdSchema } = require('../../utils');



//////////////////GET
//GET V-1
// router.get('/', function (req, res, next) {
//   res.send(data);
// });

// router.get('/', getAll);


// Get one by search (query: K bắt buộc phải có trong DB)
// router.get('/search', getDetail);



// Get one by id (param: Bắt buộc phải có trong DB)
//GET ID V-1
// router.get('/:id', function (req, res, next) {
//   const { id } = req.params;
//   const validationSchema = yup.object().shape({
//     id: yup.number(),
//   });

//   schema
//     .validate({ id })
//     .then(() => {
//       let result = data.find((x) => x.id == id);
//       if (result) {
//         return res.send({ code: 200, payload: result });
//       }

//       return res.send(404, { message: "Not found" });
//     })
//     .catch((err) => console.log(err));
// }
// );


//GET ID V-2
// router.get('/:id', function (req, res, next) {
//   const { id } = req.params;

//   const validationSchema = yup.number();

//   validationSchema
//     .validate(id)
//     .then(() => {
//       let result = data.find((x) => x.id == id);

//       if (result) {
//         return res.send({ code: 200, payload: result });
//       }
//       return res.send(404, { message: "Not found" });
//     })
//     .catch((err) => res.send(400, { message: "Bad request" })
//     );
// });


//GET ID V-3 : tách ra từ v-2

// router.get('/:id', getId);


//////////////////// POST
//POST V-1
// router.post('/', function (req, res, next) {
//   const { name, price } = req.body;

//   const checkUnique = data.find((item) => item.id.toString() === id.toString());

//   if (checkUnique) {
//     return res.send(400, {
//       message: "Tạo không thành công"
//     })
//   }

//   const newP = { name, price, id }

// });


//POST V-2
// router.post('/', create);


//////////////////////PATCH
///PATCH V-3 
// router.patch('/:id', validateSchema(updateProductSchema), update);



///////////////////////DELETE
///DELETE V-3 

// router.delete('/:id', hardDelete);


/// FULL V-3: tách biệt và gộp các router
router.route('/')
  .get(getAll)
  .post(validateSchema(updateProductSchema), create);

router.route('/:id')
  .get(validateSchema(checkIdSchema), getId)
  .patch(validateSchema(checkIdSchema),validateSchema(updateProductSchema), update)
  .delete(validateSchema(checkIdSchema), hardDelete);

router.get('/search')
  .get(getDetail)

module.exports = router;
