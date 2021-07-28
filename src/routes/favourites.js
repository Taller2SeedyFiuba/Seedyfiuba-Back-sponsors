const router = require("express").Router();
const { hocError } = require('../errors/handler');
const pc = require("../controllers/favourites");

router.get('/', hocError(pc.search))
router.post('/', hocError(pc.create));
router.delete('/users/:userid/projects/:projectid([0-9]+)', hocError(pc.deleteFavourite));

module.exports = router;
