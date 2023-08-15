const express = require('express')
const {
  getContrats,
  getContrat,
  createContrat,
  updateContrat,
  deleteContrat,
} = require('../controllers/contrats')

// Include other resources routers
const avenantRouter = require('./avenant') // Assurez-vous d'avoir le bon chemin ici

const router = express.Router({ mergeParams: true })

// Re-route into other resource routers
router.use('/:contratId/avenants', avenantRouter) // Cela redirige toutes les requêtes vers /:contratId/avenants vers le router avenants

const { protect, authorize } = require('../middlewares/auth')
const Contrat = require('../models/Contrat')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

// router.route('/').get(getContrats).post(createContrat)
router
  .route('/')
  .get(advancedResults(Contrat, 'customer'), getContrats)
  .post(createContrat)

router.route('/:id').get(getContrat).put(updateContrat).delete(deleteContrat)

module.exports = router
