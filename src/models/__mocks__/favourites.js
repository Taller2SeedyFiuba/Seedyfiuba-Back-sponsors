const favourites = [{
    "userid": "userid1",
    "projectid": '1',
  },
  {
    "userid": "userid2",
    "projectid": '1',
  }
]

const favouriteExists = async(fav) => {
  return 0
}

const addFavourite = async(fav) => {
  return fav
}

const getFavourites = async(params) => {
    return favourites
}

const validateNew = (param) => {
  return true
}

const validateSearch = (param) => {
  return true
}

module.exports = {
  favouriteExists,
  addFavourite,
  getFavourites,
  validateNew,
  validateSearch
};
