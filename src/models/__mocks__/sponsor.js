const sponsors = [{
    "userid": "userid1",
    "projectid": '1',
  },
  {
    "userid": "userid2",
    "projectid": '1',
  }
]

const sponsorExists = async(sponsor) => {
  return 0
}

const addSponsor = async(sponsor) => {
  return sponsor
}

const getSponsors = async(params) => {
    return sponsors
}

const validateSearch = (param) => {
  return true
}

module.exports = {
  sponsorExists,
  addSponsor,
  getSponsors,
  validateSearch
};
