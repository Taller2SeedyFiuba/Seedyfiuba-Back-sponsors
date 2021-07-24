const {
    search,
    create
  } = require('./favourites');
const { ApiError } = require('../errors/ApiError')
const errMsg = require('../errors/messages');
const { db } = require('../models/__mocks__/favourites');
jest.mock('../models/favourites');

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
      data: db.favourites
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

test('/create successful response', async () => {
  const favourite = {
    userid: 'userid3',
    projectid: 23
  }
  const req = {
    body: favourite
  };

  const resObj = {
    data: {
      status: 'success',
      data: favourite
    }
  };

  const res = mockResponse();

  await create(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});


test('/create error response, bad body', async () => {

  const req = {
    body: {
      userid: 5,//Wrong id
      projectid: 23
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


test('/create error response, already exists', async () => {

  const req = {
    body: {
      userid: 'userid1',
      projectid: 1
    }
  };

  const expectedThrow = new ApiError(400, errMsg.PROJECT_ALREADY_FAVOURITE);

  const res = mockResponse();

  expect.assertions(2);

  try{
    await create(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedThrow)
  }
});

