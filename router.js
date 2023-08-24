
// var indexRouter = require('./modules/index');
// var usersRouter = require('./modules/users');
// var productRouter = require('./modules/product/router');
// var categoryRouter = require('./modules/category/router');
// var suppliersRouter = require('./modules/supplier/router');
// var employeesRouter = require('./modules/employee/router');
// var customerRouter = require('./modules/customer/router');
// var orderRouter = require('./modules/order/router');
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', productRouter);
// app.use('/categories', categoryRouter);
// app.use('/suppliers', suppliersRouter);
// app.use('/employees', employeesRouter);
// app.use('/customers', customerRouter);
// app.use('/orders', orderRouter);

const routes = [
    {
        path: '/products',
        router: require('./modules/product/router')
    },
    {
        path: '/categories',
        router: require('./modules/category/router')
    },
    {
        path: '/suppliers',
        router: require('./modules/supplier/router')
    },
    {
        path: '/employees',
        router: require('./modules/employee/router')
    },
    {
        path: '/customers',
        router: require('./modules/customer/router')
    },
    {
        path: '/orders',
        router: require('./modules/order/router')
    },
];

module.exports = routes

