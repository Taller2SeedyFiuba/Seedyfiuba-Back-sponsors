const router = require("express").Router();
const { hocError } = require('../errors/handler');
const pc = require("../controllers/preferences");

router.post('/', hocError(pc.create))
router.put('/:id', hocError(pc.update))

module.exports = router;