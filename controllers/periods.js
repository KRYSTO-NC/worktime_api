const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Period = require('../models/Period')

// @desc      Get all periods
// @route     GET /worshift/api/v1/periods
// @access    Private
exports.getPeriods = asyncHandler(async (req, res, next) => {
  const periods = await Period.find()
  res.status(200).json({
    success: true,
    data: periods,
  })
})

// @desc      Get single period
// @route     GET /worshift/api/v1/periods/:id
// @access    Private
exports.getPeriod = asyncHandler(async (req, res, next) => {
  const period = await Period.findById(req.params.id)

  if (!period) {
    return next(
      new ErrorResponse(`Period not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: period,
  })
})

// @desc      Create period
// @route     POST /worshift/api/v1/periods
// @access    Private
exports.createPeriod = asyncHandler(async (req, res, next) => {
  const period = await Period.create(req.body)
  res.status(201).json({
    success: true,
    data: period,
  })
})

// @desc      Update period
// @route     PUT /worshift/api/v1/periods/:id
// @access    Private
exports.updatePeriod = asyncHandler(async (req, res, next) => {
  const period = await Period.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!period) {
    return next(
      new ErrorResponse(`Period not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: period,
  })
})

// @desc      Delete period
// @route     DELETE /worshift/api/v1/periods/:id
// @access    Private
exports.deletePeriod = asyncHandler(async (req, res, next) => {
  await Period.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
