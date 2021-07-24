const sponsors = [{
    "userid": "userid1",
    "projectid": 1,
  },
  {
    "userid": "userid2",
    "projectid": 1,
  }
]

const sponsorExists = async(sponsor) => {
  const cmp = JSON.stringify(sponsor)
  return sponsors.some(_sponsor => JSON.stringify(_sponsor) == cmp)
}

const addSponsor = async(sponsor) => {
  return sponsor
}

const getSponsors = async(params) => {
  return sponsors
}

module.exports = {
  sponsorExists,
  addSponsor,
  getSponsors,
  db:{
    sponsors
  }
};
