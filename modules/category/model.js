const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: { 
            type: String, 
            required: [true,'Tên danh mục không được bỏ trống'], 
            maxLength: [50,'Tên danh mục không vượt quá 50 kí tự'],
            unique:[true, 'Tên danh mục không được trùng nhau']
        },
        description: { 
            type: String, 
            maxLength: [500,'Tên danh mục không vượt quá 500 kí tự'] 
        },
        isDeleted: { 
            type: Boolean, 
            required: true, 
            default: false 
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Category = model('categories', categorySchema);
module.exports = Category;