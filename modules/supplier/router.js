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
const { supplierSchema } = require('./validation');

const routes = [
  {
    path: '/',
    method: 'get',
    validators: [],
    handlers: [getAll],
  },
  {
    path: '/',
    method: 'post',
    validators: [validateSchema(supplierSchema)],
    handlers: [create]
  },
  {
    path: '/:id',
    method: 'get',
    validators: [validateSchema(checkIdSchema)],
    handlers: [getDetail]
  },
  {
    path: '/:id',
    method: 'put',
    validators: [validateSchema(checkIdSchema), validateSchema(supplierSchema)],
    handlers: [update]
  },
  {
    path: '/:id',
    method: 'delete',
    validators: [validateSchema(checkIdSchema)],
    handlers: [hardDelete]
  },
];

for (const route of routes) {
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
};


// router.route('/')
//   .get(getAll)
//   .post(validateSchema(supplierSchema),create);

// router.route('/:id')
//   .get(validateSchema(checkIdSchema), getDetail)
//   .put(validateSchema(checkIdSchema), validateSchema(supplierSchema), update)
//   .delete(validateSchema(checkIdSchema), hardDelete);

module.exports = router;
