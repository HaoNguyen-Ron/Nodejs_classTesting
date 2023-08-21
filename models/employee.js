const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Tên nhân viên không được bỏ trống"],
      maxLength: [20, "Tên nhân viên không vượt quá 20 kí tự"],
      unique: [true, "Tên nhân viên không được trùng nhau"],
    },

    lastName: {
      type: String,
      required: [true, "Tên nhân viên không được bỏ trống"],
      maxLength: [20, "Tên nhân viên không vượt quá 20 kí tự"],
      unique: [true, "Tên nhân viên không được trùng nhau"],
    },

    email: {
      type: String,
      validate: {
        validator: function (value) {
          const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return emailRegex.test(value);
        },
        message: `{value} không phải là email hợp lệ`,
      },
      required: [true, "Email không được bỏ trống"],
      unique: true,
    },

    phoneNumber: {
      type: Number,
      validate: {
        validator: function (value) {
          const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          return phoneRegex.test(value);
        },
        message: `{value} không phải là số điện thoại hợp lệ`,
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
      unique: true,
    },

    password: {
        type: String,
        validate: {
            validator: function (value) {
              const passRegex = `^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$`;
              return passRegex.test(value);
            },
            message: `{value} không phải là mật khẩu hợp lệ`,
          },
    },

    birthday: {
        type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }

);

const Employee = model("employees", employeeSchema);
module.exports = Employee;
