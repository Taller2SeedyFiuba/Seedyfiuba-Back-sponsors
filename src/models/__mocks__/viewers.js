const viewers = [
  {
    "userid": "userid1"
  },
  {
    "userid": "userid2"
  }
]

const viewerOf = [
  {
    "userid": "userid1",
    "projectid": 1,
  },
  {
    "userid": "userid2",
    "projectid": 1,
  }
]

const votes = [
  {
    "userid": "userid1",
    "projectid": 1,
    "stage": 0,
  },
  {
    "userid": "userid1",
    "projectid": 1,
    "stage": 1,
  },
  {
    "userid": "userid2",
    "projectid": 1,
    "stage": 0
  }
]

const exists = id => {
  return viewers.find(viewer => viewer.userid == id) != undefined
}

const hasProject = async(viewerProject) => {
  const cmp = JSON.stringify(viewerProject)
  return viewerOf.some(viewer => JSON.stringify(viewer) == cmp)
}

const addViewer = async(viewer) => {
  return viewer
}

const addProject = async(viewerProject) => {
  return viewerProject
}

const addVote = async(vote) => {
  return vote
}

const hasVoted = async(vote) => {
  const cmp = JSON.stringify(vote)
  return viewerOf.some(_vote => JSON.stringify(_vote) == cmp)
}

const getViewers = async(params) => {
  return viewers
}



module.exports = {
  exists,
  hasProject,
  getViewers,
  addViewer,
  addProject,
  addVote,
  hasVoted,
  db:{
    viewers,
    viewerOf,
    votes
  }
}
