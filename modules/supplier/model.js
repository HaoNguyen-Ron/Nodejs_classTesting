const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục không được bỏ trống"],
      maxLength: [50, "Tên danh mục không vượt quá 50 kí tự"],
      unique: [true, "Tên danh mục không được trùng nhau"],
    },

    email: {
      type: String,
      validate: {
        validator: function (value) {
          const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return emailRegex.test(value);
        },
        message: `{VALUE} không phải là email hợp lệ`,
      },
      required: [true, "Email không được bỏ trống"],
      unique: true,
    },

    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          return phoneRegex.test(value);
        },
        message: `{VALUE} không phải là số điện thoại hợp lệ`,
      },
      unique: true,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    address: {
      type: String,
      maxLength: [500, "Địa chỉ không vượt quá 500 kí tự"],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }

);

const Supplier = model("suppliers", supplierSchema);
module.exports = Supplier;
