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

router.route('/')
  .get(getAll)
  .post(create);

router.route('/:id')
  .get(validateSchema(checkIdSchema), getId)
  .patch( validateSchema(checkIdSchema),validateSchema(updateProductSchema), update)
  .delete( validateSchema(checkIdSchema),hardDelete);

router.get('/search')
  .get(getDetail)

module.exports = router;
