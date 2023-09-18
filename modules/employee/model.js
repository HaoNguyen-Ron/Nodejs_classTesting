const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const bcrypt = require('bcryptjs');


const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Tên nhân viên không được bỏ trống"],
      maxLength: [20, "Tên nhân viên không vượt quá 20 kí tự"]
    },

    lastName: {
      type: String,
      required: [true, "Tên nhân viên không được bỏ trống"],
      maxLength: [20, "Tên nhân viên không vượt quá 20 kí tự"]
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
      unique: true,
    },

    password: {
        type: String,
        validate: {
            validator: function (value) {
              const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
              return passRegex.test(value);
            },
            message: `{VALUE} không phải là mật khẩu hợp lệ`,
          },
    },

    birthday: {
        type: Date
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }

);

employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

employeeSchema.pre('save', async function (next) {
  try {
    // generate salt key
    const salt = await bcrypt.genSalt(10); // 10 ký tự ABCDEFGHIK + 123456
    // generate password = salt key + hash key
    const hashPass = await bcrypt.hash(this.password, salt);
    // override password
    this.password = hashPass;

    next();
  } catch (err) {
    next(err);
  }
});

employeeSchema.methods.isValidPass = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// Config
employeeSchema.set('toJSON', { virtuals: true });
employeeSchema.set('toObject', { virtuals: true });
//
employeeSchema.plugin(mongooseLeanVirtuals);

const Employee = model("employees", employeeSchema);
module.exports = Employee;
