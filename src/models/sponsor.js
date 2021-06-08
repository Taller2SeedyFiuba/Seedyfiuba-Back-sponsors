const Joi = require("joi");
const { 
  SponsorOf
} = require("../database");


async function sponsorExists(sponsor) {
  return await SponsorOf.findOne({ where: sponsor })
}

async function addSponsor(sponsor) {
  return await SponsorOf.create(sponsor)
}

async function getSponsors(params) {
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

  return await SponsorOf.findAll(searchParams)
}



function validateNew(sponsor){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    projectid: Joi.number().integer().required()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(sponsor);
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
  sponsorExists,
  addSponsor,
  getSponsors,
  validateNew,
  validateSearch
}