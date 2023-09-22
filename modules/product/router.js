var express = require('express');
var router = express.Router();

const {
  getAll,
  getDetail,
  create,
  hardDelete,
  update,
  getList,
  search
} = require('./controller')


const { validateSchema, checkIdSchema } = require('../../utils');
const { validationSchema, validationQuerySchema, } = require('./validation');

const routes = [
  {
    path: '/',
    method: 'get',
    validators: [],
    handlers: [getList],
  },
  {
    path: '/',
    method: 'post',
    validators: [validateSchema(validationSchema)],
    handlers: [create]
  },
  {
    path: '/all',
    method: 'get',
    validators: [],
    handlers: [getAll],
  },
  {
    path: '/search',
    method: 'get',
    validators: [],
    handlers: [search]
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
    validators: [validateSchema(checkIdSchema), validateSchema(validationSchema)],
    handlers: [update]
  },
  {
    path: '/:id',
    method: 'delete',
    validators: [validateSchema(checkIdSchema)],
    handlers: [hardDelete]
  },
]

for (const route of routes) {
  // router.route('/').get()
  // router.route('/').post()
  //  ==> router.route('/')[router.method] : dynamic 
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}

// router.route('/')
//   .get(getList)
//   .post(validateSchema(validationSchema), create);

// router.route('/all')
//   .get(getAll);

// router.get('/search')
//   .get(getDetail);

// router.route('/:id')
//   .get(validateSchema(checkIdSchema), getDetail)
//   .put(validateSchema(checkIdSchema), validateSchema(validationSchema), update)
//   .delete(validateSchema(checkIdSchema), hardDelete);

module.exports = router;
