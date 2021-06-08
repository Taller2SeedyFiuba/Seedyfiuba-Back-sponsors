const { ApiError } = require("../errors/ApiError");
const Sponsor = require("../models/sponsor")
const Proxy = require("../proxy/proxy")


async function search(req, res) {
  //Construimos el espacio de busqueda de la BD
  const dbParams = { 
      userid: req.query.userid,
      projectid: req.query.projectid,
      limit: req.query.limit, 
      page: req.query.page
  }
  const { error } = Sponsor.validateSearch(dbParams)
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
  const alreadyInDatabse = await Sponsor.sponsorExists(req.body)
  if (alreadyInDatabse){
    throw ApiError.badRequest("The user is already sponsoring this project")
  }
  await Proxy.validateUserExistance(req.body.userid)
  await Proxy.validateProjectExistance(req.body.projectid)
  const sponsor = await Sponsor.addSponsor(req.body)
  return res.status(200).json({
    status: "success",
    data: sponsor
  });
}


async function recomend(req, res) {
  //Pensar como hacer este algoritmo y que retornar.
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


module.exports = { 
  search,
  create,
  recomend
}