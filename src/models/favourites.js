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

async function deleteFavourite(fav) {
  const result = await FavouriteProjects.destroy({
    where: {
      userid: fav.userid,
      projectid: fav.projectid
    }
  })
  return result ? fav : 0
}

async function getFavourites(params) {
  const searchParams = {
    'limit': params.limit || 10,
    'offset': (params.page - 1) * params.limit || 0,
    'raw': true,
    'order': [
      ['projectid', 'asc'],
      ['userid', 'asc']
    ]
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

module.exports = {
  favouriteExists,
  addFavourite,
  getFavourites,
  deleteFavourite
}
