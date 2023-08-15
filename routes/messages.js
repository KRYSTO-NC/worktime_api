const express = require('express')
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/messages')

const router = express.Router({ mergeParams: true })
const Message = require('../models/Message')
// Middleware pour la protection des routes et l'autorisation des rôles
const { protect, authorize } = require('../middlewares/auth')

// Middleware pour les résultats avancés (tri, pagination, etc.)
const advancedResults = require('../middlewares/advancedResults')

// Utilisez le middleware protect si vous souhaitez protéger toutes les routes
// router.use(protect);

// Appliquez des autorisations spécifiques si nécessaire
// Exemple : Seuls les admin peuvent créer ou supprimer des messages
// router.route('/').post(protect, authorize('admin'), createMessage);
// router.route('/:id').delete(protect, authorize('admin'), deleteMessage);

router
  .route('/')
  .get(advancedResults(Message, 'from to'), getMessages)
  .post(createMessage)

router.route('/:id').get(getMessage).put(updateMessage).delete(deleteMessage)

module.exports = router
