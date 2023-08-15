const Avenant = require('../models/Avenant')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Contrat = require('../models/Contrat')
// @desc      Add avenant to contrat
// @route     POST /worshift/api/v1/contrats/:id/avenants
// @access    Private/Admin
exports.addAvenantToContrat = asyncHandler(async (req, res, next) => {
  const contratId = req.params.contratId // Assurez-vous que l'ID du contrat dans l'URL est bien 'id'

  const contrat = await Contrat.findById(contratId)

  if (!contrat) {
    return next(
      new ErrorResponse(`Contrat not found with ID of ${contratId}`, 404),
    )
  }

  req.body.contrat = contratId

  const avenant = await Avenant.create(req.body)

  // Push the avenant into the contrat's avenants array
  contrat.avenants.push(avenant._id)
  await contrat.save()

  res.status(200).json({
    success: true,
    data: avenant,
  })
})

//@description: Get all avenants
//@route: GET /worshift/api/v1/avenants
//@access: Public
exports.getAvenants = asyncHandler(async (req, res, next) => {
  const avenants = await Avenant.find()
  res.status(200).json({ success: true, data: avenants })
})

//@description: Get a single avenant
//@route: GET /worshift/api/v1/avenants/:id
//@access: Public
exports.getAvenant = asyncHandler(async (req, res, next) => {
  const avenant = await Avenant.findById(req.params.id)

  if (!avenant) {
    return next(
      new ErrorResponse(`Avenant not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: avenant })
})

//@description: Update an avenant
//@route: PUT /worshift/api/v1/avenants/:id
//@access: Private
exports.updateAvenant = asyncHandler(async (req, res, next) => {
  const avenant = await Avenant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!avenant) {
    return next(
      new ErrorResponse(`Avenant not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: avenant })
})

//@description: Delete an avenant
//@route: DELETE /worshift/api/v1/avenants/:id
//@access: Private
exports.deleteAvenant = asyncHandler(async (req, res, next) => {
  await Avenant.findByIdAndDelete(req.params.id)
  res.status(200).json({ success: true, data: {} })
})
