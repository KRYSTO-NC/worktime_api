const express = require('express')
const {
  getPointeuses,
  getPointeuse,
  createPointeuse,
  updatePointeuse,
  deletePointeuse,
} = require('../controllers/pointeuses')

const router = express.Router()

const Pointeuse = require('../models/Pointeuse')

// Middleware pour la protection des routes et l'autorisation des rôles
const { protect, authorize } = require('../middlewares/auth')

// Middleware pour les résultats avancés (tri, pagination, etc.)
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger toutes les routes
// router.use(protect);

// Appliquez des autorisations spécifiques si nécessaire
// Exemple : Seuls les admin peuvent créer ou supprimer des pointeuses
// router.route('/').post(protect, authorize('admin'), createPointeuse);
// router.route('/:id').delete(protect, authorize('admin'), deletePointeuse);

router
  .route('/')
  .get(advancedResults(Pointeuse), getPointeuses)
  .post(createPointeuse)

router
  .route('/:id')
  .get(getPointeuse)
  .put(updatePointeuse)
  .delete(deletePointeuse)

module.exports = router
