const router = require("express").Router();
const { hocError } = require('../errors/handler');
const pc = require("../controllers/sponsors");

router.get('/', hocError(pc.search))
router.get('/:id/recomendation', hocError(pc.search))
router.post('/', hocError(pc.create));


module.exports = router;


