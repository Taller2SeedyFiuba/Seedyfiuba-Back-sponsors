const { ApiError } = require("../errors/ApiError");
const Sponsor = require("../models/sponsor")
const validator = require("../models/validator")


async function search(req, res) {
  //Construimos el espacio de busqueda de la BD
  const dbParams = {
      userid: req.query.userid,
      projectid: req.query.projectid,
      limit: req.query.limit,
      page: req.query.page
  }
  const { error } = validator.validateSearch(dbParams)
  if (error) throw ApiError.badRequest(error.message)
  const sponsors = await Sponsor.getSponsors(dbParams)
  return res.status(200).json({
    status: "success",
    data: sponsors
  });
}

async function create(req, res) {
  const { error } = Sponsor.validateNew(req.body)
  if (error) throw ApiError.badRequest(error.message)
  const sponsor = await Sponsor.addSponsor(req.body)
  return res.status(201).json({
    status: "success",
    data: sponsor
  });
}

/*
LEGACY: Ver si hacemos un sistema de recomendacion basico o no
async function recomend(req, res) {
  const dbParams = {
    userid: req.params.userid,
    limit: 100,
    page: 1
  }
  const sponsors = await Sponsor.getSponsors(dbParams)
  return res.status(200).json({
    status: "success",
    data: sponsors
  });
}
*/

module.exports = {
  search,
  create
}
