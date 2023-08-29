const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getDetailSchema,
  createSchema,
  updateEmployeeSchema,
  updateShippingDateSchema,
  updateStatusSchema,
} = require('./validation');
const {
  getAll,
  getDetail,
  create,
  updateStatus,
  updateShippingDate,
  updateEmployee,
} = require('./controller');

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
    validators: [validateSchema(createSchema)],
    handlers: [create],
  },
  {
    path: '/:id',
    method: 'post',
    validators: [validateSchema(getDetailSchema)],
    handlers: [getDetail],
  },
  {
    path: '/status/:id',
    method: 'patch',
    validators: [validateSchema(updateStatusSchema)],
    handlers: [updateStatus],
  },
  {
    path: '/shipping/:id',
    method: 'patch',
    validators: [validateSchema(updateShippingDateSchema)],
    handlers: [updateShippingDate],
  },
  {
    path: '/employee/:id',
    method: 'patch',
    validators: [validateSchema(updateEmployeeSchema)],
    handlers: [updateEmployee],
  },
]

for (const route of routes) {
  // router.route('/').get()
  // router.route('/').post()
  // why ? coz: inside get() we have get(getAll) so we cannot code like this:
  // router.route(route.path, route.method(...route.validators, ...route.handlers) XXXX
  // or 
  //  ==> router.route('/')[router.method] : dynamic 
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}

///----------- re-factor from this below :

// router.route('/')
//   .get(getAll)
//   .post(validateSchema(createSchema), create)

// router.route('/:id')
//   .get(validateSchema(getDetailSchema), getDetail)

// router.route('/status/:id')
//   .patch(validateSchema(updateStatusSchema), updateStatus)

// router.route('/shipping/:id')
//   .patch(validateSchema(updateShippingDateSchema), updateShippingDate)

// router.route('/employee/:id')
//   .patch(validateSchema(updateEmployeeSchema), updateEmployee)

module.exports = router;