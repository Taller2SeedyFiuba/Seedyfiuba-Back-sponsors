const Joi = require("joi");
const { 
  Preferences,
} = require("../database");

async function getPreferences(id){
  const pref = await Preferences.findAll({
    attributes: ['type'],
    where: {
      userid: id
    } 
  })
  return { userid: id, preferences: pref }
}

async function addPreferences(data) {
  const pref = data.preferences.map(p => {
    return { userid: data.userid, type: p }
  })
  const result = await Preferences.bulkCreate(pref, { returning: true })
  const preferences = result.map(r => {
    return r.dataValues.type
  })
  return { userid: data.userid, preferences }
}

async function updatePreferences(data) {
  await Preferences.destroy({ where: { userid: data.userid } });
  return await addPreferences(data)
}

const type_enum = ['software', 'electronics', 'art']

function validatePreferences(preferences){
  const JoiSchema = Joi.object({
    userid: Joi.string().max(255).required(),
    preferences: Joi.array().items(Joi.string().valid(...type_enum)).min(1).required()
  }).options({ abortEarly: false });
  
  return JoiSchema.validate(preferences);
}

module.exports = {
  addPreferences,
  updatePreferences,
  validatePreferences
}