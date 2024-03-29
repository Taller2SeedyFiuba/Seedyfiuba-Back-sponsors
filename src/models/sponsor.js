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

module.exports = {
  getSponsor,
  addSponsor,
  getSponsors
}
