const axios = require('axios');
const { msErrorHandler } = require('../errors/handler');
const USER_URL = process.env.USER_SERVICE_URL || 'http://user-service:8080/api/users';
const PROJECT_URL = process.env.PROJECT_SERVICE_URL || 'http://project-service:8082/api';
//const URL = 'https://seedyfiuba-back-users.herokuapp.com/api';

async function validateUserExistance(id){
  return await axios.get(USER_URL + '/' + id);
}

async function validateProjectExistance(id){
  return await axios.get(PROJECT_URL + '/view/' + id);
}

module.exports = { 
  validateUserExistance,
  validateProjectExistance
}
