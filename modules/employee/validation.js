var express = require('express');

const yup = require('yup');

const employeeSchema = yup.object({
    body: yup.object({
        firstName: yup.string().max(50).required(),
        lastName: yup.string().max(50).required(),
        isDeleted: yup.bool().required(),
        email: yup.string().email(),
        address: yup.string().max(500),
        phoneNumber: yup
            .string()
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại sai định dạng')
            // .test("phoneErr", "Số điện thoại sai rồi", (value) => {
            //   const regex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
            //   return regex.test(value);
            // })
            .required('Required!'),
        birthday: yup.date(),
        password: yup.string()
            .min(6, 'Minimum 6 characters')
            .max(20, 'Minimum 12 characters')
            .required('Required!'),
    }),
});
module.exports = {
    employeeSchema,
};