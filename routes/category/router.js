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

const data = require('../../data/categories.json');
const { writeFileSync, generationID,validateSchema, checkIdSchema } = require('../../utils');

router.route('/')
  .get(getAll)
  .post(create);

router.route('/:id')
  .get(getId, validateSchema(checkIdSchema))
  .patch( update,validateSchema(checkIdSchema),validateSchema(updateProductSchema))
  .delete(hardDelete, validateSchema(checkIdSchema));

router.get('/search')
  .get(getDetail)

module.exports = router;
