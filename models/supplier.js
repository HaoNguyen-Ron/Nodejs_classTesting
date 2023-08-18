const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const supplierSchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

const Category = model('Category', categorySchema);
module.exports = supplier;