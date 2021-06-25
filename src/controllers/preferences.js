const { ApiError } = require("../errors/ApiError");
const Preferences = require("../models/preferences")

async function create(req, res) {
  const { error } = Preferences.validatePreferences(req.body)
  if (error) throw ApiError.badRequest(error.message)

  const alreadyInDatabse = await Preferences.getPreferences(req.body.id)
  if (alreadyInDatabse){
    throw ApiError.badRequest("user-has-preferences")
  }
  
  const result = await Preferences.addPreferences(req.body)
  return res.status(200).json({
    status: "success",
    data: result
  });
}

async function update(req, res) {
    const pref = { 
      userid: req.params.id,
      preferences: req.body.preferences
    }
    const { error } = Preferences.validatePreferences(pref)
    if (error) throw ApiError.badRequest(error.message)

    const alreadyInDatabse = await Preferences.getPreferences(req.params.id)
    if (!alreadyInDatabse){
      throw ApiError.badRequest("user-not-have-preferences")
    }
    const result = await Preferences.updatePreferences(pref)
    return res.status(200).json({
      status: "success",
      data: result
    });
  }


module.exports = { 
  create,
  update,
}