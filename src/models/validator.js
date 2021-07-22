const Joi = require("joi");


function Favourite(fav){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });

  return JoiSchema.validate(fav);
}

function Sponsor(sponsor){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });

  return JoiSchema.validate(sponsor);
}


function Viewer(viewer){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required()
  }).options({ abortEarly: false });

  return JoiSchema.validate(viewer);
}

function ViewerProject(viewer){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });

  return JoiSchema.validate(viewer);
}

function Vote(vote){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required(),
    stage:  Joi.number().integer().min(0).required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(vote);
}

function Search(params){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255),
    projectid: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(params);
}

function Metrics(data) {
  const JoiSchema = Joi.object({
    timeinterval: Joi.string().equal(...['month', 'week', 'day', 'hour', 'minute', 'second']),
    fromdate: Joi.date(),
    todate: Joi.date(),
    limit: Joi.number().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(data);
}

module.exports = {
  Favourite,
  Sponsor,
  Viewer,
  ViewerProject,
  Vote,
  Metrics,
  Search
}
