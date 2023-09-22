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

const { updateProductSchema } = require('./validation')
const { validateSchema, checkIdSchema } = require('../../utils');

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
    validators: [validateSchema(updateProductSchema)],
    handlers: [create]
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
    validators: [validateSchema(checkIdSchema), validateSchema(updateProductSchema)],
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

// // xác thực data => kiếm tra tồn tại => tạo mới
// // validator => service => repository 
// // router.route('/').post(function() {}, function() {})

// router.route('/') // { get: blabla, post: blabla, put: blabla, }
//   .get(getAll)
//   .post(validateSchema(updateProductSchema), create);


// router.route('/search')
// .get(search)


// router.route('/:id')
//   .get( validateSchema(checkIdSchema), getDetail)
//   .put( validateSchema(checkIdSchema),validateSchema(updateProductSchema), update)
//   .delete(validateSchema(checkIdSchema), hardDelete);

module.exports = router;
