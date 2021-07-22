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
    "projectid": '1',
  },
  {
    "userid": "userid2",
    "projectid": '1',
  }
]

const votes = [
  {
    "userid": "userid1",
    "projectid": '1',
    "stage": 0,
  },
  {
    "userid": "userid1",
    "projectid": '1',
    "stage": 1,
  },
  {
    "userid": "userid2",
    "projectid": '1',
    "stage": 0
  }
]

const exists = async(viewer) => {
  return viewers.includes(viewer)
}

const hasProject = async(viewerProject) => {
  return viewerOf.includes(viewerProject)
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
  return votes.includes(vote)
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
