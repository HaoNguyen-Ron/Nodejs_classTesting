const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../utils');

const {
  loginSchema,
} = require('./validation');

const {
  login,
  checkRefreshToken,
  getMe,
  basicLogin,
} = require('./controller');

const routes = [
  {
    path: '/login',
    method: 'post',
    validators: [validateSchema(loginSchema)],
    handlers: [
      passport.authenticate('local', { session: false }),
      login
    ],
  },
  {
    path: '/refresh-token',
    method: 'post',
    validators: [],
    handlers: [checkRefreshToken],
  },
  {
    path: '/basic',
    method: 'post',
    validators: [],
    handlers: [
      passport.authenticate('basic', { session: false }),
      basicLogin,
    ],
  },
  {
    path: '/profile',
    method: 'get',
    validators: [],
    handlers: [
      passport.authenticate('jwt', { session: false }),
      getMe,
    ],
  },
]

for (const route of routes) {
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}


module.exports = router;