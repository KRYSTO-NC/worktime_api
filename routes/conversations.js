const express = require('express')
const {
  getConversations,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
} = require('../controllers/conversations')

const router = express.Router({ mergeParams: true })
const Conversation = require('../models/Conversation')
// Middleware pour la protection des routes et l'autorisation des rôles
const { protect, authorize } = require('../middlewares/auth')

// Middleware pour les résultats avancés (tri, pagination, etc.)
const advancedResults = require('../middlewares/advancedResults')

// Utilisez le middleware protect si vous souhaitez protéger toutes les routes
// router.use(protect);

// Appliquez des autorisations spécifiques si nécessaire
// Exemple : Seuls les admin peuvent créer ou supprimer des conversations
// router.route('/').post(protect, authorize('admin'), createConversation);
// router.route('/:id').delete(protect, authorize('admin'), deleteConversation);

router
  .route('/')
  .get(advancedResults(Conversation), getConversations)
  .post(createConversation)

router
  .route('/:id')
  .get(getConversation)
  .put(updateConversation)
  .delete(deleteConversation)

module.exports = router
