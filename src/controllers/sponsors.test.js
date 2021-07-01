const {
    search,
    create,
    recomend
  } = require('./sponsors');

jest.mock('../models/sponsor');
jest.mock('../proxy/proxy');

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
