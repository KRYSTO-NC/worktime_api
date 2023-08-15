const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Pointage = require('../models/Pointage')

// @desc      Get all pointages
// @route     GET /worshift/api/v1/pointages
// @route     GET /worshift/api/v1/users/:userId/pointages
// @access    Private

exports.getPointages = asyncHandler(async (req, res, next) => {
  const pointages = await Pointage.find().populate(['card', 'pointeuse'])
  res.status(200).json({
    success: true,
    data: pointages,
  })
})

// @desc      Get single pointage
// @route     GET /worshift/api/v1/pointages/:id
// @access    Private
exports.getPointage = asyncHandler(async (req, res, next) => {
  const pointage = await Pointage.findById(req.params.id).populate(
    'pointeuse employee',
  )

  if (!pointage) {
    return next(
      new ErrorResponse(`Pointage not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: pointage,
  })
})

// @desc      Create pointage
// @route     POST /worshift/api/v1/pointages
// @access    Private
exports.createPointage = asyncHandler(async (req, res, next) => {
  const pointage = await Pointage.create(req.body)
  res.status(201).json({
    success: true,
    data: pointage,
  })
})

// @desc      Update pointage
// @route     PUT /worshift/api/v1/pointages/:id
// @access    Private
exports.updatePointage = asyncHandler(async (req, res, next) => {
  const pointage = await Pointage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!pointage) {
    return next(
      new ErrorResponse(`Pointage not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: pointage,
  })
})

// @desc      Delete pointage
// @route     DELETE /worshift/api/v1/pointages/:id
// @access    Private
exports.deletePointage = asyncHandler(async (req, res, next) => {
  await Pointage.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
