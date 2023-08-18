var express = require('express');

const yup = require('yup');

const updateProductSchema = yup.object({
    body: yup.object({
        price: yup.number(),
        name: yup.string(),
    }),
});
module.exports = {
    updateProductSchema,
};