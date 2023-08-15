const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Horraire = require('../models/Horraire')

// @desc      Get all horaires
// @route     GET /worshift/api/v1/horraires
// @access    Private/Admin
exports.getHorraires = asyncHandler(async (req, res, next) => {
  const horraires = await Horraire.find().populate('employee')
  res.status(200).json({
    success: true,
    data: horraires,
  })
})

// @desc      Get single horaire
// @route     GET /worshift/api/v1/horraires/:id
// @access    Private/Admin
exports.getHorraire = asyncHandler(async (req, res, next) => {
  const horraire = await Horraire.findById(req.params.id).populate('employee')

  if (!horraire) {
    return next(
      new ErrorResponse(`Horraire not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: horraire,
  })
})

// @desc      Create horaire
// @route     POST /worshift/api/v1/horraires
// @access    Private/Admin
exports.createHorraire = asyncHandler(async (req, res, next) => {
  const horraire = await Horraire.create(req.body)
  res.status(201).json({
    success: true,
    data: horraire,
  })
})

// @desc      Update horaire
// @route     PUT /worshift/api/v1/horraires/:id
// @access    Private/Admin
exports.updateHorraire = asyncHandler(async (req, res, next) => {
  const horraire = await Horraire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!horraire) {
    return next(
      new ErrorResponse(`Horraire not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: horraire,
  })
})

// @desc      Delete horaire
// @route     DELETE /worshift/api/v1/horraires/:id
// @access    Private/Admin

exports.deleteHorraire = asyncHandler(async (req, res, next) => {
  await Horraire.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
