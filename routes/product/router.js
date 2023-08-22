var express = require('express');
var router = express.Router();

const {
  getAll,
  getDetail,
  create,
  hardDelete,
  update
} = require('./controller')


const { validateSchema, checkIdSchema } = require('../../utils');
const { validationSchema, validationQuerySchema, } = require('./validation');

router.route('/')
  .get(getAll)
  .post(validateSchema(validationSchema), create);

router.get('/search')
  .get(getDetail)

router.route('/:id')
  .get(validateSchema(checkIdSchema), getDetail)
  .put(validateSchema(checkIdSchema), validateSchema(validationSchema), update)
  .delete(validateSchema(checkIdSchema), hardDelete);

module.exports = router;
