const { ApiError } = require("../errors/ApiError");
const Viewers = require("../models/viewers")
const validator = require("../models/validator")
const errMsg = require("../errors/messages")


async function isViewer(req, res) {
  const exists = await Viewers.exists(req.params.id)
  return res.status(200).json({
    status: "success",
    data: exists
  });
}

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
  const viewers = await Viewers.getViewers(dbParams)
  return res.status(200).json({
    status: "success",
    data: viewers
  });
}


async function createViewer(req, res) {
  const { error } = validator.Viewer(req.body)
  if (error) throw ApiError.badRequest(error.message)
  const alreadyInDatabse = await Viewers.exists(req.body.userid)
  if (alreadyInDatabse){
    throw ApiError.badRequest(errMsg.USER_ALREADY_VIEWER)
  }
  const viewer = await Viewers.addViewer(req.body)
  return res.status(201).json({
    status: "success",
    data: viewer
  });
}

async function addProjectViewer(req, res) {
  const data = {
      userid: req.params.id,
      projectid: req.body.projectid
  }

  const { error } = validator.ViewerProject(data)
  if (error) throw ApiError.badRequest(error.message)

  const viewerInDatabse = await Viewers.exists(data.userid)
  if (!viewerInDatabse){
    throw ApiError.badRequest(errMsg.USER_NOT_VIEWER)
  }

  const projectViewed = await Viewers.hasProject(data)
  if (projectViewed){
    throw ApiError.badRequest(errMsg.USER_ALREADY_VIEWING_PROJECT)
  }

  const viewerProject = await Viewers.addProject(data)
  return res.status(201).json({
    status: "success",
    data: viewerProject
  });
}


async function viewerVoteProject(req, res) {

  const viewer = {
    userid: req.params.id,
    projectid: req.body.projectid
  }

  const vote = {
    userid: viewer.userid,
    projectid: viewer.projectid,
    stage: req.body.stage
  }

  const { error } = validator.Vote(vote)
  if (error) throw ApiError.badRequest(error.message)

  const isViewer = await Viewers.hasProject(viewer)
  if (!isViewer){
    throw ApiError.badRequest(errMsg.USER_NOT_VIEWER_OF_PROJECT)
  }

  const voted = await Viewers.hasVoted(vote)
  if (voted){
    throw ApiError.badRequest(errMsg.USER_ALREADY_VOTED)
  }

  const result = await Viewers.addVote(vote)

  return res.status(201).json({
    status: "success",
    data: result
  });
}



module.exports = {
  isViewer,
  search,
  addProjectViewer,
  createViewer,
  viewerVoteProject
}
