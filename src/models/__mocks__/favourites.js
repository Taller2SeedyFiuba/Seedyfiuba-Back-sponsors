const favourites = [
  {
    "userid": "userid1",
    "projectid": 1,
  },
  {
    "userid": "userid2",
    "projectid": 1,
  }
]

const favouriteExists = async(fav) => {
  const cmp = JSON.stringify(fav)
  return favourites.some(_fav => JSON.stringify(_fav) == cmp)
}

const addFavourite = async(fav) => {
  return fav
}

const getFavourites = async(params) => {
  return favourites
}

module.exports = {
  favouriteExists,
  addFavourite,
  getFavourites,
  db:{
    favourites
  }
};
