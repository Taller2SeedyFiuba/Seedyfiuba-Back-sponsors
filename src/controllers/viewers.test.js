const {
  isViewer,
  search,
  addProjectViewer,
  createViewer,
  viewerVoteProject
} = require('./viewers');
const { ApiError } = require('../errors/ApiError')
const { db } = require('../models/__mocks__/viewers')

jest.mock('../models/viewers');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/search successful response', async () => {
  const req = {
    query: {
      projectid: 1
    }
  }
  const resObj = {
    data: {
      status: 'success',
      data: db.viewers
    }
  };

  const res = mockResponse();

  await search(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});


test('/search error response, bad parameters', async () => {
  const req = {
    query: {
      projectid: 'bad-parameter'
    }
  }

  const res = mockResponse();
  expect.assertions(2);

  try{
    await search(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});

test('/createViewer successful response', async () => {

  const req = {
    body: {
      userid: 'userid3'
    }
  };

  const resObj = {
    data: {
      status: 'success',
      data: req.body
    }
  };

  const res = mockResponse();

  await createViewer(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);

});

/*

test('/createSponsor error response, bad body', async () => {

const req = {
  body: {
    userid: 5,//Wrong id
    projectid: '23'
  }
};

const res = mockResponse();

expect.assertions(2);

try{
  await create(req, res);
} catch(err){
  expect(err).toBeInstanceOf(ApiError);
  expect(err).toHaveProperty('code', 400);
}
});
*/
