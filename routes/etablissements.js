const express = require('express')
const {
  getEtablissements,
  getEtablissement,
  createEtablissement,
  updateEtablissement,
  deleteEtablissement,
} = require('../controllers/etablissements')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Etablissement = require('../models/Etablissement')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Etablissement, 'customer'), getEtablissements)
  .post(createEtablissement)

router
  .route('/:id')
  .get(getEtablissement)
  .put(updateEtablissement)
  .delete(deleteEtablissement)

module.exports = router
