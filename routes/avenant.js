const express = require('express')
const {
  addAvenantToContrat,
  getAvenants,
  getAvenant,
  updateAvenant,
  deleteAvenant,
} = require('../controllers/avenants')

const router = express.Router({ mergeParams: true })

router.route('/').post(addAvenantToContrat).get(getAvenants) // Si vous souhaitez aussi récupérer tous les avenants pour un contrat spécifique

router.route('/:id').get(getAvenant).put(updateAvenant).delete(deleteAvenant)

module.exports = router
