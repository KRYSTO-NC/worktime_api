const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Maladie = require('../models/Maladie')

// @desc      Get all maladies
// @route     GET /worshift/api/v1/maladies
// @route     GET /worshift/api/v1/users/:userId/maladies
// @access    Private/Admin
exports.getMaladies = asyncHandler(async (req, res, next) => {
  const maladies = await Maladie.find().populate([
    'employee',
    'startDate',
    'endDate',
    'document',
  ])
  res.status(200).json({
    success: true,
    data: maladies,
  })
})

// @desc      Get single maladie
// @route     GET /worshift/api/v1/maladies/:id
// @access    Private/Admin
exports.getMaladie = asyncHandler(async (req, res, next) => {
  const maladie = await Maladie.findById(req.params.id).populate([
    'employee',
    'startDate',
    'endDate',
    'document',
  ])

  if (!maladie) {
    return next(
      new ErrorResponse(`Maladie not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: maladie,
  })
})

// @desc      Create maladie
// @route     POST /worshift/api/v1/maladies
// @access    Private/Admin
exports.createMaladie = asyncHandler(async (req, res, next) => {
  const maladie = await Maladie.create(req.body)
  res.status(201).json({
    success: true,
    data: maladie,
  })
})

// @desc      Update maladie
// @route     PUT /worshift/api/v1/maladies/:id
// @access    Private/Admin
exports.updateMaladie = asyncHandler(async (req, res, next) => {
  const maladie = await Maladie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!maladie) {
    return next(
      new ErrorResponse(`Maladie not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: maladie,
  })
})

// @desc      Delete maladie
// @route     DELETE /worshift/api/v1/maladies/:id
// @access    Private/Admin

exports.deleteMaladie = asyncHandler(async (req, res, next) => {
  await Maladie.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
