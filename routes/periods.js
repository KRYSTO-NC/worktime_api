const express = require('express')
const {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod,
} = require('../controllers/periods')

const router = express.Router({ mergeParams: true })
const Period = require('../models/Period')
// Middleware pour la protection des routes et l'autorisation des rôles
const { protect, authorize } = require('../middlewares/auth')

// Middleware pour les résultats avancés (tri, pagination, etc.)
const advancedResults = require('../middlewares/advancedResults')

// Utilisez le middleware protect si vous souhaitez protéger toutes les routes
// router.use(protect);

// Appliquez des autorisations spécifiques si nécessaire
// Exemple : Seuls les admin peuvent créer ou supprimer des périodes
// router.route('/').post(protect, authorize('admin'), createPeriod);
// router.route('/:id').delete(protect, authorize('admin'), deletePeriod);

router.route('/').get(advancedResults(Period), getPeriods).post(createPeriod)

router.route('/:id').get(getPeriod).put(updatePeriod).delete(deletePeriod)

module.exports = router
