const express = require('express')
const {
  getMaladies,
  getMaladie,
  createMaladie,
  updateMaladie,
  deleteMaladie,
} = require('../controllers/maladies')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Maladie = require('../models/Maladie')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(
    advancedResults(Maladie, ['employee', 'startDate', 'endDate', 'document']),
    getMaladies,
  )
  .post(createMaladie)

router.route('/:id').get(getMaladie).put(updateMaladie).delete(deleteMaladie)

module.exports = router
