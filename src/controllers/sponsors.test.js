const {
    search,
    create,
    recomend
  } = require('./sponsors');
const { ApiError } = require('../errors/ApiError')
jest.mock('../models/sponsor');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/searchSponsors successful response', async () => {
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

test('/searchSponsors error response, bad parameters', async () => {
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

test('/createSponsor successful response', async () => {
  const sponsor = {
    userid: 'userid3',
    projectid: '23'
  }
  const req = {
    body: sponsor
  };

  const resObj = {
    data: {
      status: 'success',
      data: sponsor
    }
  };

  const res = mockResponse();

  await create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

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
