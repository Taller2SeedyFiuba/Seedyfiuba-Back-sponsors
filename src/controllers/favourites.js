const { ApiError } = require("../errors/ApiError");
const Favourites = require("../models/favourites")

async function search(req, res) {
  //Construimos el espacio de busqueda de la BD
  const dbParams = { 
      userid: req.query.userid,
      projectid: req.query.projectid,
      limit: req.query.limit, 
      page: req.query.page
  }
  const { error } = Favourites.validateSearch(dbParams)
  if (error) throw ApiError.badRequest(error.message)
  const favs = await Favourites.getFavourites(dbParams)
  return res.status(200).json({
    status: "success",
    data: favs
  });
}

async function create(req, res) {
  const { error } = Favourites.validateNew(req.body)
  if (error) throw ApiError.badRequest(error.message)
  const alreadyInDatabse = await Favourites.favouriteExists(req.body)
  if (alreadyInDatabse){
    throw ApiError.badRequest("The user already has this project as favourite")
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