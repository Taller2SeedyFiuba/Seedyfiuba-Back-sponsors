const result = {
  userid: 'userid3',
  preferences: ['software', 'art']
}

const getPreferences = async(id) => {
  return id == result.userid ? result : 0
}

const addPreferences = async(pref) => {
  return pref
}

const updatePreferences = async(pref) => {
    return pref
}

const validatePreferences = (param) => {
  return true
}

module.exports = {
  getPreferences,
  addPreferences,
  updatePreferences,
  validatePreferences
};