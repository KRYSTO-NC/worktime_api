const express = require('express')
const {
  getAbsences,
  getAbsence,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} = require('../controllers/absences')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Absence = require('../models/Absence')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router.route('/').get(advancedResults(Absence), getAbsences).post(createAbsence)

router.route('/:id').get(getAbsence).put(updateAbsence).delete(deleteAbsence)

module.exports = router
