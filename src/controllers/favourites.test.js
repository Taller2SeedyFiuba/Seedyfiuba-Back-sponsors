const {
    search,
    create
  } = require('./favourites');
const { ApiError } = require('../errors/ApiError')
const errMsg = require('../errors/messages')
jest.mock('../models/favourites');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/searchFavourites successful response', async () => {
  const req = {
    query: {
      projectid: 1
    }
  }
  const resObj = {
    data: {
      status: 'success',
      data: [
        {
          "userid": "userid1",
          "projectid": '1',
        },
        {
          "userid": "userid2",
          "projectid": '1',
        }
      ]
    }
  };

  const res = mockResponse();

  await search(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});


test('/searchFavourites error response, bad parameters', async () => {
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

test('/createFavourites successful response', async () => {
  const favourite = {
    userid: 'userid3',
    projectid: '23'
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


test('/createFavourites error response, bad body', async () => {

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

/*
test('/createFavourites error response, bad body', async () => {

  const req = {
    body: {
      userid: 5,//Wrong id
      projectid: '23'
    }
  };

  const expectedThrow = new ApiError(404, errMsg.USER_NOT_FOUND);

  const res = mockResponse();

  expect.assertions(2);

  try{
    await getOneUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedThrow)
  }
});
*/
