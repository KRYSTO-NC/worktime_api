const express = require('express')
const {
  getPointages,
  getPointage,
  createPointage,
  updatePointage,
  deletePointage,
} = require('../controllers/pointages')

const router = express.Router({ mergeParams: true })
const Pointage = require('../models/Pointage')

// Middleware pour la protection des routes et l'autorisation des rôles
const { protect, authorize } = require('../middlewares/auth')

// Middleware pour les résultats avancés (tri, pagination, etc.)
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger toutes les routes
// router.use(protect);

// Appliquez des autorisations spécifiques si nécessaire
// Exemple : Seuls les admin peuvent créer ou supprimer des enregistrements de pointage
// router.route('/').post(protect, authorize('admin'), createPointage);
// router.route('/:id').delete(protect, authorize('admin'), deletePointage);

router
  .route('/')
  .get(advancedResults(Pointage), getPointages)
  .post(createPointage)

router.route('/:id').get(getPointage).put(updatePointage).delete(deletePointage)

module.exports = router
