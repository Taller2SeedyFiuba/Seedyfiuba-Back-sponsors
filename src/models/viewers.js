const Joi = require("joi");
const {
  Viewer,
  ViewerOf,
  VotedFor,
  sequelize,
  Sequelize
} = require("../database");


async function exists(userid) {
  return await Viewer.findByPk(userid) ? true : false
}

async function hasProject(viewer) {
  return await ViewerOf.findOne({ where: viewer }) ? true : false
}

async function addViewer(viewer) {
  return await Viewer.create(viewer)
}

async function addProject(data) {
  return await ViewerOf.create(data)
}

async function getViewers(params) {
  const searchParams = {
    'limit': params.limit || 10,
    'offset': (params.page - 1) * params.limit || 0,
    'order': [
      ['projectid', 'asc'],
      ['userid', 'asc']
    ],
    'raw': true
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

  return await ViewerOf.findAll(searchParams)
}

async function addVote(vote) {
  return await VotedFor.create(vote)
}

async function hasVoted(vote) {
  return await VotedFor.findOne({ where : vote }) ? true : false
}


const castAndCumulateMetric = function(data){
  if (!data) return null
  let sum = 0;
  return data.map(elem => {
    sum += Number(elem.metric)
    elem.metric = sum
    return elem
  })
}

const getViewersMetrics = async(params) => {
  aggDateFunction = sequelize.fn('date_trunc', params.timeinterval || 'day', sequelize.col('promotedate'))

  const searchParams = {
    'group': [aggDateFunction],
    'attributes': [
      [aggDateFunction, 'timestamp'],
      [sequelize.fn('COUNT', aggDateFunction), 'metric']
    ],
    'where': {
      'promotedate': {
        [Sequelize.Op.gte]: params.fromdate || '1800-01-01',
        [Sequelize.Op.lte]: params.todate || '2200-01-01'
      }
    },
    'order': [[aggDateFunction, 'ASC']],
    'raw': true
  }

  const result = {
    'viewershistory': castAndCumulateMetric(await Viewer.findAll(searchParams))
  }

  return result
}

module.exports = {
  exists,
  hasProject,
  getViewers,
  addViewer,
  addProject,
  addVote,
  hasVoted,
  getViewersMetrics
}
