const Joi = require("joi");
const { 
  FavouriteProjects,
} = require("../database");


async function favouriteExists(fav) {
  return await FavouriteProjects.findOne({ where: fav })
}

async function addFavourite(fav) {
  return await FavouriteProjects.create(fav)
}

async function getFavourites(params) {
  const searchParams = { 
    'limit': params.limit || 10,
    'offset': (params.page - 1) * params.limit || 0,
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

  return await FavouriteProjects.findAll(searchParams)
}


function validateNew(fav){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(fav);
}

function validateSearch(params){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255),
    projectid: Joi.number().integer(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(params);
}

module.exports = {
  favouriteExists,
  addFavourite,
  getFavourites,
  validateNew,
  validateSearch
}