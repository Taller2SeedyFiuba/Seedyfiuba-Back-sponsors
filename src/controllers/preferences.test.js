const { 
    update,
    create
  } = require('./preferences');

jest.mock('../models/preferences');
jest.mock('../proxy/proxy');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/createPreferences successful response', async () => {
  const preferences = {
    id: 'userid1',
    projectid: ['software', 'art']
  }
  const req = {
    body: preferences
  };

  const resObj = {
    data: {
      status: 'success',
      data: preferences
    }
  };
  
  const res = mockResponse();

  await create(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});


test('/updatePreferences successful response', async () => {
  const preferences = ['software', 'art']
  const id = 'userid3'
  const req = {
    params: { id },
    body: {
      preferences
    }
  };

  const resObj = {
    data: {
      status: 'success',
      data: {
        userid: id,
        preferences
      }
    }
  };
  
  const res = mockResponse();
  
  await update(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});
