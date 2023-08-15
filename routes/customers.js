const express = require('express')
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  uploadCustomerLogo,
} = require('../controllers/customers')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Customer = require('../models/Customer')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Customer), getCustomers)
  .post(createCustomer)

router.route('/:id').get(getCustomer).put(updateCustomer).delete(deleteCustomer)
router.route('/:id/logo').put(uploadCustomerLogo)

module.exports = router
