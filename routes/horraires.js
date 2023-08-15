const express = require('express')
const {
  getHorraires,
  getHorraire,
  createHorraire,
  updateHorraire,
  deleteHorraire,
} = require('../controllers/horraires')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Horraire = require('../models/Horraire')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Horraire, 'employee'), getHorraires)
  .post(createHorraire)

router.route('/:id').get(getHorraire).put(updateHorraire).delete(deleteHorraire)

module.exports = router
