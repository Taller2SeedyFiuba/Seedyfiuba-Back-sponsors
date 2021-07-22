const { ApiError } = require("../errors/ApiError");
const Favourites = require("../models/favourites")
const validator = require("../models/validator")
const errMsg = require("../errors/messages")

async function search(req, res) {
  //Construimos el espacio de busqueda de la BD
  const dbParams = {
      userid: req.query.userid,
      projectid: req.query.projectid,
      limit: req.query.limit,
      page: req.query.page
  }
  const { error } = validator.Search(dbParams)
  if (error) throw ApiError.badRequest(error.message)
  const favs = await Favourites.getFavourites(dbParams)
  return res.status(200).json({
    status: "success",
    data: favs
  });
}

async function create(req, res) {
  const { error } = validator.Favourite(req.body)
  if (error) throw ApiError.badRequest(error.message)
  const alreadyInDatabse = await Favourites.favouriteExists(req.body)
  if (alreadyInDatabse){
    throw ApiError.badRequest(errMsg.PROJECT_ALREADY_FAVOURITE)
  }

  const fav = await Favourites.addFavourite(req.body)
  return res.status(200).json({
    status: "success",
    data: fav
  });
}

module.exports = {
  search,
  create
}
