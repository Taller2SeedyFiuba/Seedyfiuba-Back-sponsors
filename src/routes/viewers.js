const router = require("express").Router();
const { hocError } = require('../errors/handler');
const pc = require("../controllers/viewers");

router.get('/', hocError(pc.search))                            //Buscar entre todas las revisiones
router.get('/:id', hocError(pc.isViewer))                            //Consultar si el usuario es veedor
router.post('/', hocError(pc.createViewer));                    //Crea un nuevo veedor
router.post('/:id/projects', hocError(pc.addProjectViewer));    //Conecta a un veedor existente con un proyecto
router.post('/:id/vote', hocError(pc.viewerVoteProject))

module.exports = router;
