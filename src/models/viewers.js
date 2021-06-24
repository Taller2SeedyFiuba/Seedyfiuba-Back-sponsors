const Joi = require("joi");
const { 
  Viewer,
  ViewerOf
} = require("../database");


async function exists(userid) {
  return await Viewer.findByPk(userid) ? true : false
}

async function hasProject(viewer) {
    return await ViewerOf.findOne({ where: viewer }) ? true : false
  }

async function addViewer(viewer) {
  return await Viewer.create(viewer)
}

async function addProject(data) {
  return await ViewerOf.create(data)
}

async function getViewers(params) {
  const searchParams = { 
    'limit': params.limit || 10,
    'offset': (params.page - 1) * params.limit || 0,
    'order': [
      ['projectid', 'asc'],
      ['userid', 'asc']
    ],   
    'raw': true
  }   
  if (params.userid){
    searchParams.where = { userid: params.userid }
  }
  if (params.projectid){
    searchParams.where = {
      ...searchParams.where,
      projectid: params.projectid
    }
  }

  return await ViewerOf.findAll(searchParams)
}


function validateNewViewer(viewer){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(viewer);
}


function validateNewProject(viewer){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(viewer);
}

function validateSearch(params){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255),
    projectid: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(params);
}

module.exports = {
  exists,
  hasProject,
  getViewers,
  addViewer,
  addProject,
  validateNewViewer,
  validateNewProject,
  validateSearch
}