const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Etablissement = require('../models/Etablissement')

// @desc      Get all etablissements
// @route     GET /worshift/api/v1/etablissements
// @access    Private/Admin
exports.getEtablissements = asyncHandler(async (req, res, next) => {
  const etablissements = await Etablissement.find().populate('customer')
  res.status(200).json({
    success: true,
    data: etablissements,
  })
})

// @desc      Get single etablissement
// @route     GET /worshift/api/v1/etablissements/:id
// @access    Private/Admin
exports.getEtablissement = asyncHandler(async (req, res, next) => {
  const etablissement = await Etablissement.findById(req.params.id).populate(
    'customer',
  )

  if (!etablissement) {
    return next(
      new ErrorResponse(
        `Etablissement not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: etablissement,
  })
})

// @desc      Create etablissement
// @route     POST /worshift/api/v1/etablissements
// @access    Private/Admin
exports.createEtablissement = asyncHandler(async (req, res, next) => {
  const etablissement = await Etablissement.create(req.body)
  res.status(201).json({
    success: true,
    data: etablissement,
  })
})

// @desc      Update etablissement
// @route     PUT /worshift/api/v1/etablissements/:id
// @access    Private/Admin
exports.updateEtablissement = asyncHandler(async (req, res, next) => {
  const etablissement = await Etablissement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!etablissement) {
    return next(
      new ErrorResponse(
        `Etablissement not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: etablissement,
  })
})

// @desc      Delete etablissement
// @route     DELETE /worshift/api/v1/etablissements/:id
// @access    Private/Admin

exports.deleteEtablissement = asyncHandler(async (req, res, next) => {
  await Etablissement.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
