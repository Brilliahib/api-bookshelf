const Joi = require("joi");

const bookSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  readPage: Joi.number().integer().max(Joi.ref("pageCount")).required(),
  reading: Joi.boolean().required(),
});

module.exports = bookSchema;
