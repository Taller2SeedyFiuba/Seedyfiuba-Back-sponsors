const { ApiError } = require("../errors/ApiError");
const Viewers = require("../models/viewers")


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
  const { error } = Viewers.validateSearch(dbParams)
  if (error) throw ApiError.badRequest(error.message)
  const viewers = await Viewers.getViewers(dbParams)
  return res.status(200).json({
    status: "success",
    data: viewers
  });
}


async function createViewer(req, res) {
  const { error } = Viewers.validateNewViewer(req.body)
  if (error) throw ApiError.badRequest(error.message)
  const alreadyInDatabse = await Viewers.exists(req.body.userid)
  if (alreadyInDatabse){
    throw ApiError.badRequest("This user is currently a viewer")
  }
  const viewer = await Viewers.addViewer(req.body)
  return res.status(200).json({
    status: "success",
    data: viewer
  });
}

async function addProjectViewer(req, res) {
  const data = {
      userid: req.params.id,
      projectid: req.body.projectid
  }
  
  const { error } = Viewers.validateNewProject(data)
  if (error) throw ApiError.badRequest(error.message)

  const viewerInDatabse = await Viewers.exists(data.userid)
  if (!viewerInDatabse){
    throw ApiError.badRequest("This user is not a viewer")
  }

  const projectViewed = await Viewers.hasProject(data)
  if (projectViewed){
    throw ApiError.badRequest("This user is currently reviewing this project")
  }

  const viewerProject = await Viewers.addProject(data)
  return res.status(200).json({
    status: "success",
    data: viewerProject
  });
}

module.exports = { 
  isViewer,
  search,
  addProjectViewer,
  createViewer
}