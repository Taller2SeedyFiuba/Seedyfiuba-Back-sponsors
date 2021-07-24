const {
  isViewer,
  search,
  addProjectViewer,
  createViewer,
  viewerVoteProject
} = require('./viewers');
const { ApiError } = require('../errors/ApiError')
const { db } = require('../models/__mocks__/viewers')
const errMsg = require('../errors/messages')

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


test('/isViewer successful response, exists', async () => {
  const req = {
    params: {
      id: 'userid1'
    }
  }
  const resObj = {
    data: {
      status: 'success',
      data: true
    }
  };

  const res = mockResponse();

  await isViewer(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/isViewer successful response, not exists', async () => {
  const req = {
    params: {
      id: 'not-exists'
    }
  }
  const resObj = {
    data: {
      status: 'success',
      data: false
    }
  };

  const res = mockResponse();

  await isViewer(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});


test('/createViewer error response, bad body', async () => {

  const req = {
    body: {
      userid: 5,//Wrong id
    }
  };

  const res = mockResponse();

  expect.assertions(2);

  try{
    await createViewer(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});

test('/addProjectViewer successful response', async () => {

  const data = {
    userid: 'userid1',
    projectid: 10
  }

  const req = {
    body: {
      projectid: data.projectid
    },
    params: {
      id: data.userid
    }
  };

  const resObj = {
    data: {
      status: 'success',
      data
    }
  };

  const res = mockResponse();

  await addProjectViewer(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);

});

test('/addProjectViewer error response, bad body', async () => {

  const req = {
    body: {
      projectid: 1,
    },
    params: {
      //Missing id
    }
  };

  const res = mockResponse();

  expect.assertions(2);

  try{
    await addProjectViewer(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});


test('/addProjectViewer error response, user is not viewer', async () => {

  const req = {
    body: {
      projectid: 1
    },
    params: {
      id: 'userid3' //This id is not from a viewer
    }
  };

  const res = mockResponse();

  const expectedError = ApiError.badRequest(errMsg.USER_NOT_VIEWER)

  expect.assertions(2);

  try{
    await addProjectViewer(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedError);
  }
});

test('/addProjectViewer error response, user already viewing', async () => {

  const req = {
    body: {
      projectid: 1,
    },
    params: {
      id: 'userid1'
    }
  };

  const res = mockResponse();
  const expectedError = ApiError.badRequest(errMsg.USER_ALREADY_VIEWING_PROJECT)
  expect.assertions(2);

  try{
    await addProjectViewer(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedError);
  }
});

test('/viewerVoteProject successful response', async () => {

  const data = {
    userid: 'userid1',
    projectid: 1,
    stage: 0
  }

  const req = {
    body: {
      projectid: data.projectid,
      stage: data.stage
    },
    params: {
      id: data.userid
    }
  };

  const resObj = {
    data: {
      status: 'success',
      data
    }
  };

  const res = mockResponse();

  await viewerVoteProject(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);

});

test('/viewerVoteProject error response, bad body', async () => {

  const data = {
    userid: 'userid1',
    projectid: 'STRING', //Bad body
    stage: 0
  }

  const req = {
    body: {
      projectid: data.projectid,
      stage: data.stage
    },
    params: {
      id: data.userid
    }
  };

  const res = mockResponse();

  expect.assertions(2);

  try{
    await viewerVoteProject(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400);
  }
});

test('/viewerVoteProject error response, user is not viewer of the project', async () => {

  const data = {
    userid: 'userid1',
    projectid: 2,
    stage: 0
  }

  const req = {
    body: {
      projectid: data.projectid,
      stage: data.stage
    },
    params: {
      id: data.userid
    }
  };

  const res = mockResponse();

  const expectedError = ApiError.badRequest(errMsg.USER_NOT_VIEWER_OF_PROJECT)

  expect.assertions(2);

  try{
    await viewerVoteProject(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedError);
  }
});
