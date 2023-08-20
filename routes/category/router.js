var express = require('express');
var router = express.Router();

const {
  getAll,
  getDetail,
  search,
  create,
  hardDelete,
  update
} = require('./controller')

const {updateProductSchema} = require('./validation')
const { validateSchema, checkIdSchema } = require('../../utils');

router.route('/')
  .get(getAll)
  .post(validateSchema(updateProductSchema),create);

  
router.route('/search')
.get(search)


router.route('/:id')
  .get( validateSchema(checkIdSchema), getDetail)
  .put( validateSchema(checkIdSchema),validateSchema(updateProductSchema), update)
  .delete(validateSchema(checkIdSchema), hardDelete);

module.exports = router;
