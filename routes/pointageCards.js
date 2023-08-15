const express = require('express')
const {
  getPointageCards,
  getPointageCard,
  createPointageCard,
  updatePointageCard,
  deletePointageCard,
} = require('../controllers/pointageCards')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middlewares/auth')
const PointageCard = require('../models/PointageCard')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(PointageCard), getPointageCards)
  .post(createPointageCard)

router
  .route('/:id')
  .get(getPointageCard)
  .put(updatePointageCard)
  .delete(deletePointageCard)

module.exports = router
