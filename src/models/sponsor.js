const Joi = require("joi");
const {
  SponsorOf
} = require("../database");


async function getSponsor(sponsor) {
  return await SponsorOf.findOne({ where: sponsor })
}

async function addSponsor(sponsor) {
  const [_sponsor, created] = await SponsorOf.findOrCreate({ where: sponsor, defaults: sponsor})
  _sponsor.dataValues.newsponsor = created;
  return _sponsor
}

async function getSponsors(params) {
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
    projectid: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(params);
}

module.exports = {
  getSponsor,
  addSponsor,
  getSponsors,
  validateNew,
  validateSearch
}
