const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Contrat = require('../models/Contrat')

// @desc      Get all contrats
// @route     GET /worshift/api/v1/contrats
// @access    Private/Admin
exports.getContrats = asyncHandler(async (req, res, next) => {
  const contrats = await Contrat.find()
    .populate('document')
    .populate('etablissement')
    .populate('avenants')
    .populate('customer')

  const responseData = await Promise.all(
    contrats.map(async (contrat) => {
      const avenantEnCours = await contrat.getAvenantEnCours()
      return { ...contrat._doc, avenantEnCours }
    }),
  )

  res.status(200).json({
    success: true,
    data: responseData,
  })
})

// @desc      Get single contrat
// @route     GET /worshift/api/v1/contrats/:id
// @access    Private/Admin
exports.getContrat = asyncHandler(async (req, res, next) => {
  const contrat = await Contrat.findById(req.params.id)
    .populate('document')
    .populate('etablissement')
    .populate('avenants')
    .populate('customer')

  if (!contrat) {
    return next(
      new ErrorResponse(`Contrat not found with ID of ${req.params.id}`, 404),
    )
  }

  const avenantEnCours = await contrat.getAvenantEnCours()

  // Créez un nouvel objet à partir des données de contrat
  const responseData = { ...contrat._doc, avenantEnCours }

  res.status(200).json({
    success: true,
    data: responseData,
  })
})

// @desc      Create contrat
// @route     POST /worshift/api/v1/contrats
// @access    Private/Admin
exports.createContrat = asyncHandler(async (req, res, next) => {
  const contrat = await Contrat.create(req.body)
  res.status(201).json({
    success: true,
    data: contrat,
  })
})

// @desc      Update contrat
// @route     PUT /worshift/api/v1/contrats/:id
// @access    Private/Admin
exports.updateContrat = asyncHandler(async (req, res, next) => {
  const contrat = await Contrat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!contrat) {
    return next(
      new ErrorResponse(`Contrat not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: contrat,
  })
})

// @desc      Delete contrat
// @route     DELETE /worshift/api/v1/contrats/:id
// @access    Private/Admin
exports.deleteContrat = asyncHandler(async (req, res, next) => {
  await Contrat.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
