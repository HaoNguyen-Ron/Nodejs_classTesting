var express = require('express');

const yup = require('yup');

const updateProductSchema = yup.object({
    body: yup.object({
        name: yup.string().max(50).required(),
        isDeleted: yup.bool().required(),
        description: yup.string().max(500),
    }),
});
module.exports = {
    updateProductSchema,
};