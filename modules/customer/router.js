var express = require('express');
var router = express.Router();

const { validateSchema, checkIdSchema } = require('../../utils');
const { customerSchema } = require('./validation');

const {
  getAll,
  getDetail,
  create,
  hardDelete,
  update,
  search
} = require('./controller')

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
    validators: [validateSchema(customerSchema)],
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
    validators: [validateSchema(checkIdSchema), validateSchema(customerSchema)],
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

module.exports = router