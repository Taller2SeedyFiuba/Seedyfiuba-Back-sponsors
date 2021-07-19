const Joi = require("joi");

function validateSearch(params){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255),
    projectid: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(params);
}

function validateMetrics(data) {
  const JoiSchema = Joi.object({
    timeinterval: Joi.string().equal(...['month', 'week', 'day', 'hour', 'minute', 'second']),
    fromdate: Joi.date(),
    todate: Joi.date(),
    limit: Joi.number().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(data);
}

module.exports = {
  validateMetrics,
  validateSearch
}
