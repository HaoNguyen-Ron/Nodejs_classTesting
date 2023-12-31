const fs = require('fs');
const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  writeFileSync: (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data), function (err) {
      if (err) {
        console.log('««««« err »»»»»', err);
        throw err
      };
      console.log('Saved!');
    });
  },

  generationID: () => Math.floor(Date.now()),

  validateSchema: (schema) => async (req, res, next) => { // thực thi việc xác thực
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      },
        {
          abortEarly: false,
        },
      );

      return next();
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(400).json({ type: err.name, errors: err.errors, provider: "YUP" });
    }
  },

  // checkIdSchema: yup.object({
  //   params: yup.object({
  //     id: yup.number(),
  //   })
  // }),
  checkIdSchema: yup.object({
    params: yup.object({
      id: yup.string().test('inValid', 'ID sai định dạng', (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),


  fuzzySearch: (text) => {
    const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    return new RegExp(regex, 'gi');
  },

  toObjectId: (id = '') => ObjectId(id),

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  },

  getQueryDateTime: (from, to, type = 'IN') => {
    fromDate = new Date(from);

    const tmpToDate = new Date(to);
    toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

    let query = {};

    if (type === 'IN') {
      const compareFromDate = { $gte: ['$createdDate', fromDate] };
      const compareToDate = { $lt: ['$createdDate', toDate] };

      query = {
        $expr: { $and: [compareFromDate, compareToDate] },
      };
    } else {
      const compareFromDate = { $lt: ['$createdDate', fromDate] };
      const compareToDate = { $gt: ['$createdDate', toDate] };

      query = {
        $expr: { $or: [compareFromDate, compareToDate] },
      };
    }

    return query;
  },
}